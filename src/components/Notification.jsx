import { FaBell } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { Navbar } from "./Navbar";

const Notification = () => {
  const priorityAlerts = [
    {
      title: "New Account Request",
      employee: "John Smith",
      id: "EMP001",
      role: "Software Engineer - Development Team",
      time: "Requested 2 hours ago",
      background: "bg-yellow-100",
      buttons: [
        { text: "Approve", style: "bg-green-500 text-white" },
        { text: "Reject", style: "border border-gray-400 text-gray-700" },
      ],
    },
    {
      title: "Account Deactivation Request",
      employee: "Sarah Johnson",
      id: "EMP045",
      role: "Marketing Specialist - Marketing Team",
      time: "Requested 30 minutes ago",
      background: "bg-red-100",
      buttons: [
        { text: "Process", style: "bg-yellow-600 text-white" },
        { text: "View Details", style: "border border-gray-400 text-gray-700" },
      ],
    },
  ];

  const history = [
    {
      employee: "Michael Brown",
      id: "EMP089",
      action: "Account Creation",
      processedBy: "Admin User",
      status: "Completed",
      time: "2 hours ago",
    },
    {
      employee: "Emily Wilson",
      id: "EMP076",
      action: "Password Reset",
      processedBy: "System",
      status: "Completed",
      time: "5 hours ago",
    },
  ];

  return (
    <div className="mb-8 min-h-screen">
      <Navbar heading="Notification" />
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search Notification"
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        <div className="space-x-2">
          <button className="px-4 py-2 border rounded-md">All</button>
          <button className="px-4 py-2 border rounded-md relative">
            Unread
            <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="px-4 py-2 border rounded-md">Mark as read</button>
          <button className="px-4 py-2 border rounded-md">Delete</button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Priority Alerts</h3>
        {priorityAlerts.map((alert, index) => (
          <div key={index} className={`p-4 mb-3 rounded-lg ${alert.background} flex justify-between items-center`}>
            <div>
              <p className="font-semibold">{alert.title}</p>
              <p className="text-sm">
                {alert.employee} (ID: {alert.id})
              </p>
              <p className="text-sm text-gray-500">{alert.role}</p>
              <p className="text-xs text-gray-500">{alert.time}</p>
            </div>
            <div className="flex space-x-2">
              {alert.buttons.map((btn, i) => (
                <button key={i} className={`px-4 py-2 rounded-md ${btn.style}`}>
                  {btn.text}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Notification History</h3>
        {history.map((item, index) => (
          <div key={index} className="flex justify-between items-center border-b py-3 last:border-b-0">
            <div>
              <p className="font-medium">
                {item.employee} (ID: {item.id}) - {item.action}
              </p>
              <p className="text-xs text-gray-500">Processed By - {item.processedBy}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-md">
                {item.status}
              </span>
              <p className="text-xs text-gray-500">{item.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          <p className="text-sm">System Status - Online</p>
        </div>
        <p className="text-sm text-gray-500">Last Sync: 5 minutes ago</p>
        <p className="text-sm text-gray-500">3 Pending Requests</p>
      </div>
    </div>
  );
};

export default Notification;