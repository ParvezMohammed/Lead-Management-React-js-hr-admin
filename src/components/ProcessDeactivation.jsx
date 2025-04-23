import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";
import { FaPlay } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";

const ProcessDeactivation = () => {
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
      priority: "High",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      _id: "2",
      employeeId: "EMP002",
      fullName: "Sarah Johnson",
      department: "Design",
      joinDate: "2024-03-14",
      status: "In Progress",
      priority: "Medium",
      profilePic: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      _id: "3",
      employeeId: "EMP003",
      fullName: "Michael Brown",
      department: "Marketing",
      joinDate: "2024-03-13",
      status: "Pending",
      priority: "High",
      profilePic: "https://randomuser.me/api/portraits/men/3.jpg"
    }
  ]);

  // Dummy notes data
  const [notes, setNotes] = useState([
    {
      author: "Rashmika (HR)",
      time: "2 hours ago",
      comment: "Employee has returned all company assets. Pending final clearance from IT department."
    },
    {
      author: "John Anderson",
      time: "5 hours ago",
      comment: "Email account deactivation completed for Sarah Johnson."
    }
  ]);

  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (newNote.trim() === "") return;
    setNotes([{ author: "You", time: "Just now", comment: newNote }, ...notes]);
    setNewNote("");
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
          <select className="border rounded-lg p-2 w-full">
            <option>All Department</option>
          </select>
          <select className="border rounded-lg p-2 w-full">
            <option>All Status</option>
          </select>
          <input type="date" className="border rounded-lg p-2 w-full" />
        </div>
      </div>

      {/* Deactivation Queue Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        {/* Header Row with Title & Actions in One Line */}
        <div className="flex justify-between items-center border-b pb-2 mb-3">
          <h3 className="text-lg font-semibold">Deactivation Process Queue</h3>
          <div className="flex gap-3">
            <select className="border rounded-lg p-2">
              <option>Bulk Action</option>
            </select>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <FaPlay className="text-sm" />
              Start Process
            </button>
            <button 
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
              onClick={() => navigate("/mark-as-completed", { 
                state: { 
                  selectedEmployees: employees,
                  fromProcess: true 
                } 
              })}
            >
              Mark as Completed
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
              <th className="p-2">Priority</th>
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
                  <span
                    className={`px-2 py-1 rounded-lg text-white text-sm ${
                      emp.priority === "High" ? "bg-red-500" : "bg-orange-500"
                    }`}
                  >
                    {emp.priority}
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

      {/* Checklist & Notes Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Deactivation Checklist */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Deactivation Checklist</h3>
          {[
            "Email Account",
            "System Credentials",
            "Building Access",
            "VPN Access",
            "Software Licenses",
            "Company Assets"
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <label>{item}</label>
            </div>
          ))}
        </div>

        {/* Notes & Comments */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Notes & Comments</h3>
          <textarea
            className="w-full border rounded-lg p-2"
            rows={3}
            placeholder="Add a note here"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
          <button
            onClick={handleAddNote}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-2"
          >
            Add Note
          </button>

          {notes.map((note, index) => (
            <div key={index} className="mt-4 border-t pt-2">
              <p className="text-sm font-semibold">{note.author}</p>
              <p className="text-xs text-gray-500">{note.time}</p>
              <p className="text-sm">{note.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessDeactivation;
