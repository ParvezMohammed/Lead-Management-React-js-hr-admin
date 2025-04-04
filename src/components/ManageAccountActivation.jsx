import { useState } from "react";
import { FaUserCheck, FaUserTimes } from "react-icons/fa";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { MdGroupAdd } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { Navbar } from "./Navbar";

const ManageAccountActivation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([
    {
      id: "EMP003",
      name: "Darlene Robertson",
      department: "Development",
      joinDate: "2024-02-15",
      status: "Pending",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      id: "EMP006",
      name: "Marvin McKinney",
      department: "Design",
      joinDate: "2024-02-19",
      status: "Active",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    },
  ]);

  const [recentActivities, setRecentActivities] = useState([
    {
      action: "Account activation failed",
      employee: "Sarah Johnson",
      icon: <BsXCircleFill className="text-red-500 text-lg" />,
    },
    {
      action: "Account activated",
      employee: "John Smith",
      icon: <BsCheckCircleFill className="text-green-500 text-lg" />,
    },
    {
      action: "Batch email sent to 5 pending employees",
      employee: "",
      icon: <IoMdMail className="text-blue-500 text-lg" />,
    },
  ]);

  return (
    <div className="mb-8 min-h-screen">
      <Navbar heading="Account Management" />

      {/* Dashboard Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          {
            title: "Pending Activation",
            count: employees.filter((emp) => emp.status === "Pending").length,
            icon: <MdGroupAdd className="text-2xl text-blue-500" />,
          },
          {
            title: "Activated Today",
            count: employees.filter((emp) => emp.status === "Active").length,
            icon: <FaUserCheck className="text-2xl text-green-500" />,
          },
          {
            title: "Failed Activation",
            count: 3,
            icon: <FaUserTimes className="text-2xl text-red-500" />,
          },
          {
            title: "Total Active Employee",
            count: employees.filter((emp) => emp.status === "Active").length,
            icon: <HiUserGroup className="text-2xl text-purple-500" />,
          },
        ].map((item, idx) => (
          <div key={idx} className="p-4 border rounded-md flex items-center gap-4 bg-white shadow-md">
            <div>{item.icon}</div>
            <div>
              <p className="text-gray-600">{item.title}</p>
              <p className="text-lg font-bold">{item.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Employee Account Activation Table */}
      <div className="bg-white p-6 rounded-md mb-6 shadow-md border border-gray-300">
        <h3 className="font-semibold mb-4">Employee Account Activation</h3>
        <p className="text-sm text-gray-500 mb-4">
          Manage pending account activations for new employees
        </p>

        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by name, ID or email"
            className="p-2 border rounded-md flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table className="w-full border-collapse border border-gray-300 bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Employee Name</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Join Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border-t">
                <td className="p-3 flex items-center gap-2">
                  <img src={emp.avatar} alt={emp.name} className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="font-medium">{emp.name}</p>
                    <p className="text-sm text-gray-500">{emp.id}</p>
                  </div>
                </td>
                <td className="p-3">{emp.department}</td>
                <td className="p-3">{emp.joinDate}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      emp.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
                <td className="p-3">
                  {emp.status === "Pending" ? (
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-white bg-blue-500 rounded">Active</button>
                      <button className="px-3 py-1 text-white bg-red-500 rounded">Reject</button>
                    </div>
                  ) : (
                    <span className="text-green-600 font-semibold">Activated</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Activity Log */}
      <div className="bg-white p-6 rounded-md shadow-md border">
        <h3 className="font-semibold mb-4">Recent Activity Log</h3>
        <ul className="space-y-3">
          {recentActivities.map((activity, idx) => (
            <li key={idx} className="flex items-center gap-3 text-gray-700">
              {activity.icon}
              <span>
                {activity.action}{" "}
                {activity.employee && <strong>{activity.employee}</strong>}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageAccountActivation;
