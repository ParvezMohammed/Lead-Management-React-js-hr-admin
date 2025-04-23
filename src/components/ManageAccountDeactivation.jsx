import { useState } from "react";
import { FaSearch, FaPlay, FaCaretDown } from "react-icons/fa";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";

const ManageAccountDeactivation = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editForm, setEditForm] = useState({
    fullName: "",
    employeeId: "",
    department: "",
    role: "",
    email: "",
    status: ""
  });

  // Dummy employees data
  const [employees, setEmployees] = useState([
    {
      _id: "1",
      employeeId: "EMP001",
      fullName: "John Smith",
      department: "Development",
      role: "Senior Developer",
      email: "john.smith@example.com",
      joinDate: "2024-03-15",
      status: "Pending",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      _id: "2",
      employeeId: "EMP002",
      fullName: "Sarah Johnson",
      department: "Design",
      role: "UI Designer",
      email: "sarah.j@example.com",
      joinDate: "2024-03-14",
      status: "Active",
      profilePic: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      _id: "3",
      employeeId: "EMP003",
      fullName: "Michael Brown",
      department: "Marketing",
      role: "Marketing Manager",
      email: "michael.b@example.com",
      joinDate: "2024-03-13",
      status: "Pending",
      profilePic: "https://randomuser.me/api/portraits/men/3.jpg"
    }
  ]);

  // Dummy checklist data
  const [checklist, setChecklist] = useState({
    emailAccount: false,
    systemCredentials: false,
    buildingAccess: false,
    vpnAccess: false,
    softwareLicenses: false,
    companyAssets: false,
    others: false
  });

  // Dummy notes data
  const [notes, setNotes] = useState([
    {
      employeeName: "John Smith",
      time: "2 hours ago",
      reason: "Initial deactivation request received"
    },
    {
      employeeName: "Sarah Johnson",
      time: "1 hour ago",
      reason: "System access revoked"
    }
  ]);

  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (newNote.trim() === "") return;
    setNotes([
      {
        employeeName: "Current User",
        time: "Just now",
        reason: newNote.trim()
      },
      ...notes
    ]);
    setNewNote("");
  };

  const handleDeactivateProcess = () => {
    if (selectedEmployees.length === 0) {
      alert("Please select employees to deactivate");
      return;
    }

    // Get the selected employee details
    const selectedEmployeeDetails = employees.filter(emp => 
      selectedEmployees.includes(emp.employeeId)
    );

    // Navigate to process-deactivation with selected employees data
    navigate("/process-deactivation", { 
      state: { 
        selectedEmployees: selectedEmployeeDetails,
        fromQueue: true 
      } 
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedEmployees(filteredEmployees.map(emp => emp.employeeId));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleSelectEmployee = (empId) => {
    if (selectedEmployees.includes(empId)) {
      setSelectedEmployees(selectedEmployees.filter(id => id !== empId));
    } else {
      setSelectedEmployees([...selectedEmployees, empId]);
    }
  };

  const handleBulkAction = (action) => {
    if (selectedEmployees.length === 0) {
      alert("Please select employees first");
      return;
    }

    switch (action) {
      case 'delete':
        if (window.confirm('Are you sure you want to delete the selected employees?')) {
          const updatedEmployees = employees.filter(
            emp => !selectedEmployees.includes(emp.employeeId)
          );
          setEmployees(updatedEmployees);
          setSelectedEmployees([]);
          alert('Selected employees have been deactivated successfully');
        }
        break;

      case 'export':
        navigate("/process-deactivation");
        break;

      case 'markCompleted':
        const updatedEmployees = employees.map(emp => {
          if (selectedEmployees.includes(emp.employeeId)) {
            return { ...emp, status: 'completed' };
          }
          return emp;
        });
        setEmployees(updatedEmployees);
        setSelectedEmployees([]);
        alert('Selected employees have been marked as completed');
        break;

      default:
        console.log(`Bulk action: ${action}`);
    }
    setShowBulkActions(false);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setEditForm({
      fullName: employee.fullName,
      employeeId: employee.employeeId,
      department: employee.department,
      role: employee.role,
      email: employee.email,
      status: employee.status
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedEmployees = employees.map(emp => 
      emp._id === editingEmployee._id ? { ...emp, ...editForm } : emp
    );
    setEmployees(updatedEmployees);
    setShowEditModal(false);
    alert('Employee details updated successfully');
  };

  const handleChecklistChange = (field) => {
    setChecklist(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (emp.email && emp.email.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDepartment = selectedDepartment === "all" || emp.department === selectedDepartment;
    const matchesStatus = selectedStatus === "all" || emp.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesDate = !selectedDate || new Date(emp.joinDate).toISOString().split('T')[0] === selectedDate;
    return matchesSearch && matchesDepartment && matchesStatus && matchesDate;
  });

  return (
    <div className="mb-8 min-h-screen">
      <Navbar heading="Employee Deactivation Management" />

      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <FaSearch className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, ID or email"
              className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="border rounded-lg p-2 w-full text-gray-400"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="all">All Departments</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Engineering">Engineering</option>
            <option value="Java">Java</option>
          </select>
          <select
            className="border rounded-lg p-2 w-full text-gray-400"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <input
            type="date"
            className="border rounded-lg p-2 w-full text-gray-400"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Deactivation Process Queue</h3>
          <div className="flex gap-3">
            <div className="relative">
              <button
                onClick={() => setShowBulkActions(!showBulkActions)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 flex items-center gap-2 hover:bg-gray-50"
              >
                Bulk Action
                <FaCaretDown />
              </button>
              {showBulkActions && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => handleBulkAction('delete')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50"
                  >
                    Delete Selected
                  </button>
                  <button
                    onClick={() => handleBulkAction('export')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50"
                  >
                    Export Selected
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={handleDeactivateProcess}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              disabled={selectedEmployees.length === 0}
            >
              <FaPlay className="text-sm" />
              Process Deactivation
            </button>

            <button
              onClick={() => handleBulkAction('markCompleted')}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              disabled={selectedEmployees.length === 0}
            >
              Mark as Completed
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedEmployees.length === filteredEmployees.length}
                    onChange={handleSelectAll}
                    className="rounded"
                  />
                </th>
                <th className="p-3 text-left">Employee</th>
                <th className="p-3 text-center">Department</th>
                <th className="p-3 text-center">Join Date</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Role</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr key={emp._id} className="border-t">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedEmployees.includes(emp.employeeId)}
                      onChange={() => handleSelectEmployee(emp.employeeId)}
                      className="rounded"
                    />
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {emp.profilePic ? (
                          <img src={emp.profilePic} alt={emp.fullName} className="w-full h-full object-cover" />
                        ) : (
                          emp.fullName.charAt(0)
                        )}
                      </div>
                      <div>
                        <div className="font-semibold">{emp.fullName}</div>
                        <div className="text-sm text-gray-500">ID: {emp.employeeId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-center">{emp.department}</td>
                  <td className="p-3 text-center">{new Date(emp.joinDate).toLocaleDateString()}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-1 rounded-lg text-sm ${
                        emp.status.toLowerCase() === "active"
                          ? "bg-green-100 text-green-800"
                          : emp.status.toLowerCase() === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-1 rounded-lg text-sm bg-blue-100 text-blue-800">
                      {emp.role}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button 
                      className="text-blue-500 hover:text-blue-700 mr-2"
                      onClick={() => handleEdit(emp)}
                    >
                      <HiOutlinePencil size={18} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to remove this employee?')) {
                          setEmployees(employees.filter(e => e._id !== emp._id));
                          alert('Employee deleted successfully');
                        }
                      }}
                    >
                      <HiOutlineTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Deactivation Checklist</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={checklist.emailAccount}
                onChange={() => handleChecklistChange('emailAccount')}
                className="rounded"
              />
              <label className="text-gray-700">Email Account Deactivated</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={checklist.systemCredentials}
                onChange={() => handleChecklistChange('systemCredentials')}
                className="rounded"
              />
              <label className="text-gray-700">System Credentials Revoked</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={checklist.buildingAccess}
                onChange={() => handleChecklistChange('buildingAccess')}
                className="rounded"
              />
              <label className="text-gray-700">Building Access Removed</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={checklist.vpnAccess}
                onChange={() => handleChecklistChange('vpnAccess')}
                className="rounded"
              />
              <label className="text-gray-700">VPN Access Disabled</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={checklist.softwareLicenses}
                onChange={() => handleChecklistChange('softwareLicenses')}
                className="rounded"
              />
              <label className="text-gray-700">Software Licenses Revoked</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={checklist.companyAssets}
                onChange={() => handleChecklistChange('companyAssets')}
                className="rounded"
              />
              <label className="text-gray-700">Company Assets Returned</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={checklist.others}
                onChange={() => handleChecklistChange('others')}
                className="rounded"
              />
              <label className="text-gray-700">Other Tasks Completed</label>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Notes & Comments</h3>
          <div className="mb-4">
            <textarea
              className="w-full border rounded-lg p-2 mb-2"
              rows={3}
              placeholder="Add a note here"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <button
              onClick={handleAddNote}
              disabled={!newNote.trim()}
              className={`bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors ${
                !newNote.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
            >
              Add Note
            </button>
          </div>

          <div className="space-y-4 max-h-[300px] overflow-y-auto">
            {notes.length > 0 ? (
              notes.map((note, index) => (
                <div key={index} className="border-t pt-4 pb-2">
                  <div className="flex flex-col items-start space-y-1">
                    <p className="text-base font-semibold text-gray-900">{note.employeeName}</p>
                    <p className="text-sm text-gray-500">{note.time}</p>
                    <p className="text-sm text-gray-600">{note.reason}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No notes available</div>
            )}
          </div>
        </div>
      </div>

      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Employee Details</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    value={editForm.fullName}
                    onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                  <input
                    type="text"
                    value={editForm.employeeId}
                    onChange={(e) => setEditForm({ ...editForm, employeeId: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <select
                    value={editForm.department}
                    onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Java">Java</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <input
                    type="text"
                    value={editForm.role}
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAccountDeactivation;