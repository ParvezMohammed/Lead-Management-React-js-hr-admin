import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";
import { Navbar } from "./Navbar";

const MarkAsCompleted = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Dummy employees data
  const [employees, setEmployees] = useState([
    {
      _id: "1",
      employeeId: "EMP001",
      fullName: "John Smith",
      department: "Development",
      joinDate: "2024-03-15",
      status: "Pending",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      _id: "2",
      employeeId: "EMP002",
      fullName: "Sarah Johnson",
      department: "Design",
      joinDate: "2024-03-14",
      status: "In Progress",
      profilePic: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      _id: "3",
      employeeId: "EMP003",
      fullName: "Michael Brown",
      department: "Marketing",
      joinDate: "2024-03-13",
      status: "Pending",
      profilePic: "https://randomuser.me/api/portraits/men/3.jpg"
    }
  ]);

  const [completionNote, setCompletionNote] = useState("");
  const [activityLog, setActivityLog] = useState([
    {
      type: "success",
      message: "Deactivation process started",
      by: "Admin User",
      time: "2 hours ago"
    },
    {
      type: "note",
      message: "Initial checklist completed",
      by: "Admin User",
      time: "1 hour ago"
    }
  ]);

  const handleConfirmCompletion = () => {
    // Update employee status locally
    const updatedEmployees = employees.map(emp => ({
      ...emp,
      status: "Completed",
      CompletionDate: new Date().toISOString().split('T')[0],
      completedBy: "Current User"
    }));
    setEmployees(updatedEmployees);
    
    // Add to activity log
    setActivityLog([
      {
        type: "success",
        message: "Deactivation process completed",
        by: "Current User",
        time: "Just now"
      },
      ...activityLog
    ]);

    // Clear completion note
    setCompletionNote("");
    
    alert("Deactivation process completed successfully!");
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="mb-8 min-h-screen">
      <Navbar heading="Employee Deactivation Management" />

      {/* Search & Filters Box */}
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <FaSearch className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, ID or email"
              className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="border rounded-lg p-2 w-full text-gray-400">
            <option>All Department</option>
          </select>
          <select className="border rounded-lg p-2 w-full text-gray-400">
            <option>All Status</option>
          </select>
          <input type="date" className="border rounded-lg p-2 w-full text-gray-400" />
        </div>
      </div>

      {/* Deactivation Queue Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <div className="flex justify-between items-center border-b pb-2 mb-3">
          <h3 className="text-lg font-semibold">
            Mark Deactivation as Completed
          </h3>
          <div className="flex gap-3">
            <button
              onClick={handleConfirmCompletion}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              Confirm Completion
            </button>
            <button 
              onClick={handleCancel}
              className="border border-gray-400 text-black px-4 py-2 rounded-lg bg-white hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Employee Table */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Employee Name</th>
              <th className="p-2">Department</th>
              <th className="p-2">Last Working Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id} className="border-t">
                <td className="p-2 flex items-center gap-2">
                  <img
                    src={emp.profilePic}
                    alt={emp.fullName}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{emp.fullName}</div>
                    <div className="text-sm text-gray-500">ID: {emp.employeeId}</div>
                  </div>
                </td>
                <td className="p-2 text-center">{emp.department}</td>
                <td className="p-2 text-center">{new Date(emp.joinDate).toLocaleDateString()}</td>
                <td className="p-2 text-center">
                  <span
                    className={`px-2 py-1 rounded-lg text-white text-sm ${
                      emp.status === "Pending"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
                <td className="p-2 text-center">
                  <button className="text-blue-500 mr-2">
                    <HiOutlinePencil size={20} />
                  </button>
                  <button className="text-red-500">
                    <HiOutlineTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Completion Notes */}
      <div className="border border-gray-300 rounded-lg p-4 shadow-md text-left bg-white">
        <h2 className="font-semibold mb-2">Completion Notes</h2>
        <textarea
          className="w-full h-20 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
          placeholder="Add a completion note here"
          value={completionNote}
          onChange={(e) => setCompletionNote(e.target.value)}
        ></textarea>
        <button 
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          onClick={() => {
            if (completionNote.trim()) {
              setActivityLog([
                {
                  type: "note",
                  message: completionNote,
                  by: "Current User",
                  time: "Just now"
                },
                ...activityLog
              ]);
              setCompletionNote("");
            }
          }}
        >
          Save Notes
        </button>
      </div>

      {/* Activity Log */}
      <div className="border border-gray-300 rounded-lg p-4 shadow-md mt-4 text-left bg-white">
        <h2 className="font-semibold mb-2">Activity Log</h2>
        {activityLog.map((log, index) => (
          <div key={index} className="flex items-start space-x-3 mb-3">
            <span className={`text-${log.type === 'success' ? 'green' : 'red'}-500 text-lg`}>
              {log.type === 'success' ? '✅' : '❌'}
            </span>
            <div>
              <p>{log.message}</p>
              <p className="text-gray-500 text-sm">By {log.by} - {log.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarkAsCompleted;
