import { useState, useEffect } from "react";
import { Card, CardContent } from "./Card";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { FaUsers, FaProjectDiagram } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { Navbar } from "./Navbar";

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("monthly");
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeAccounts: 0,
    inactiveAccounts: 0,
    totalProjects: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Dummy data for statistics
  const dummyStats = {
    totalEmployees: 150,
    activeAccounts: 120,
    inactiveAccounts: 30,
    totalProjects: 25
  };

  // Dummy data for performance chart
  const dummyPerformanceData = {
    daily: [
      { name: "9 AM", Sales: 4, Marketing: 3, Design: 2 },
      { name: "12 PM", Sales: 6, Marketing: 4, Design: 3 },
      { name: "3 PM", Sales: 8, Marketing: 5, Design: 4 },
      { name: "6 PM", Sales: 5, Marketing: 4, Design: 3 }
    ],
    weekly: [
      { name: "Mon", Sales: 20, Marketing: 15, Design: 10 },
      { name: "Tue", Sales: 25, Marketing: 18, Design: 12 },
      { name: "Wed", Sales: 22, Marketing: 16, Design: 11 },
      { name: "Thu", Sales: 28, Marketing: 20, Design: 14 },
      { name: "Fri", Sales: 24, Marketing: 17, Design: 13 }
    ],
    monthly: [
      { name: "Week 1", Sales: 100, Marketing: 80, Design: 60 },
      { name: "Week 2", Sales: 120, Marketing: 90, Design: 70 },
      { name: "Week 3", Sales: 110, Marketing: 85, Design: 65 },
      { name: "Week 4", Sales: 130, Marketing: 95, Design: 75 }
    ]
  };

  useEffect(() => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setStats(dummyStats);
      setData(dummyPerformanceData[timeRange]);
      setLoading(false);
    }, 1000);
  }, [timeRange]);

  return (
    <div className="space-y-8">
      <Navbar heading="Dashboard" />

      {error && (
        <div className="text-red-500 text-center font-medium">{error}</div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Employee"
          value={stats.totalEmployees}
          icon={<FaUsers className="text-blue-500 text-xl" />}
        />
        <StatCard
          label="Active Accounts"
          value={stats.activeAccounts}
          icon={<IoIosPeople className="text-green-500 text-xl" />}
        />
        <StatCard
          label="Inactive Accounts"
          value={stats.inactiveAccounts}
          icon={<IoIosPeople className="text-red-500 text-xl" />}
        />
        <StatCard
          label="Total Projects"
          value={stats.totalProjects}
          icon={<FaProjectDiagram className="text-purple-500 text-xl" />}
        />
      </div>

      {/* Chart Section */}
      <Card>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Employee Performance</h2>
            <select
              className="border rounded-lg px-3 py-1.5 text-sm"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="daily">Today</option>
              <option value="weekly">This Week</option>
              <option value="monthly">This Month</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center py-10 text-gray-500">
              Loading chart...
            </div>
          ) : (
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorMarketing"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorDesign"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="Sales"
                    stroke="#ef4444"
                    fillOpacity={1}
                    fill="url(#colorSales)"
                    name="Sales Team"
                  />
                  <Area
                    type="monotone"
                    dataKey="Marketing"
                    stroke="#22c55e"
                    fillOpacity={1}
                    fill="url(#colorMarketing)"
                    name="Marketing Team"
                  />
                  <Area
                    type="monotone"
                    dataKey="Design"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorDesign)"
                    name="Design Team"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Legend */}
          <div className="flex justify-center gap-6 mt-6">
            <Legend color="#ef4444" label="Sales Team" />
            <Legend color="#22c55e" label="Marketing Team" />
            <Legend color="#3b82f6" label="Design Team" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{label}</span>
            {icon}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-2xl font-semibold">{value}</span>
          </div>
          <span className="text-xs text-gray-400 mt-1">
            Last updated: {new Date().toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-sm text-gray-600">{label}</span>
    </div>
  );
}