import { useState } from "react";
import { FaUserCheck, FaUserTimes, FaEdit, FaTrashAlt } from "react-icons/fa";
import { BsCheckCircleFill, BsXCircleFill, BsExclamationCircleFill } from "react-icons/bs";
import { MdPerson, MdHourglassEmpty, MdPersonAdd } from "react-icons/md";
import { Navbar } from "./Navbar";
import { useNavigate } from "react-router-dom";

const ManageAccount = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showStatusForm, setShowStatusForm] = useState(false);

  const [employees, setEmployees] = useState([
    {
      id: "EMP003",
      name: "Darlene Robertson",
      department: "Development",
      lastActive: "2024-02-20 9:30 AM",
      status: "Active",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      id: "EMP006",
      name: "Marvin McKinney",
      department: "Design",
      lastActive: "2024-02-19 3:45 PM",
      status: "Inactive",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    {
      id: "EMP007",
      name: "Leslie Alexander",
      department: "Marketing",
      lastActive: "2024-02-21 11:15 AM",
      status: "Active",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
  ]);

  const [recentActivities, setRecentActivities] = useState([
    {
      action: "Account Deactivated",
      employee: "Marvin McKinney",
      id: "EMP006",
      date: "2024-02-19 15:45 PM",
      reason: "Termination",
      icon: <BsXCircleFill className="text-red-500 text-lg" />,
    },
    {
      action: "Account Activated",
      employee: "John Smith",
      id: "EMP025",
      date: "2024-01-12 11:20 AM",
      reason: "New Employee Onboarding",
      icon: <BsCheckCircleFill className="text-green-500 text-lg" />,
    },
    {
      action: "Account Suspended",
      employee: "Michael Chen",
      id: "EMP013",
      date: "2024-11-02 12:42 PM",
      reason: "Security Policy Violation",
      icon: <BsExclamationCircleFill className="text-yellow-500 text-lg" />,
    },
  ]);

  const handleBatchActivateProcess = () => {
    navigate("/batch-activation");
  };

  const handleBatchDeactivateProcess = () => {
    navigate("/batch-deactivation");
  };

  const handleStatusUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const reason = form.reason.value;
    const effectiveDate = form.effectiveDate.value;
    const comments = form.comments.value;
    const confirmed = form.confirmAction.checked;

    if (!reason || !effectiveDate || !comments || !confirmed) {
      alert("Please fill in all fields and confirm the action");
      return;
    }

    // Update employee status
    const updatedEmployees = employees.map(emp => {
      if (emp.id === selectedEmployee.id) {
        return {
          ...emp,
          status: reason === "activation" ? "Active" : "Inactive"
        };
      }
      return emp;
    });

    // Add to recent activities
    const newActivity = {
      action: reason === "activation" ? "Account Activated" : "Account Deactivated",
      employee: selectedEmployee.name,
      id: selectedEmployee.id,
      date: new Date().toLocaleString(),
      reason: comments,
      icon: reason === "activation" 
        ? <BsCheckCircleFill className="text-green-500 text-lg" />
        : <BsXCircleFill className="text-red-500 text-lg" />
    };

    setEmployees(updatedEmployees);
    setRecentActivities([newActivity, ...recentActivities]);
    setShowStatusForm(false);
    setSelectedEmployee(null);
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || emp.department === selectedDepartment;
    const matchesStatus = selectedStatus === "all" || emp.status === selectedStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  return (
    <div className="mb-8 min-h-screen">
      <Navbar heading="Account Management" />

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
          <MdPerson className="text-blue-500 text-3xl" />
          <div>
            <p className="text-gray-600">Active Accounts</p>
            <p className="text-xl font-semibold">
              {employees.filter(emp => emp.status === "Active").length}
            </p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
          <FaUserTimes className="text-red-500 text-3xl" />
          <div>
            <p className="text-gray-600">Inactive Accounts</p>
            <p className="text-xl font-semibold">
              {employees.filter(emp => emp.status === "Inactive").length}
            </p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
          <MdHourglassEmpty className="text-yellow-500 text-3xl" />
          <div>
            <p className="text-gray-600">Pending Action</p>
            <p className="text-xl font-semibold">
              {employees.filter(emp => emp.status === "Pending").length}
            </p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
          <MdPersonAdd className="text-green-500 text-3xl" />
          <div>
            <p className="text-gray-600">New Accounts (30d)</p>
            <p className="text-xl font-semibold">
              {employees.length}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-md mb-6 shadow-md">
        <h3 className="font-semibold mb-4">Employee Status Control</h3>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search by name, ID or email"
            className="p-2 border rounded-md flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="all">All Departments</option>
            <option value="Development">Development</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <div className="mt-4 flex gap-3">
          <button
            onClick={handleBatchActivateProcess}
            className="w-50 bg-blue-500 text-white p-2 rounded-md flex items-center justify-center hover:bg-blue-600 transition"
          >
            <FaUserCheck className="mr-2" /> Batch Activate
          </button>
          <button
            onClick={handleBatchDeactivateProcess}
            className="w-50 bg-red-500 text-white p-2 rounded-md flex items-center justify-center hover:bg-red-600 transition"
          >
            <FaUserTimes className="mr-2" /> Batch Deactivate
          </button>
        </div>

        <div className="mt-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Employee Name</th>
                <th className="p-2 text-left">Department</th>
                <th className="p-2 text-left">Last Active</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="border-t">
                  <td className="p-2 flex items-center gap-2">
                    <img
                      src={emp.avatar}
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p>{emp.name}</p>
                      <p className="text-xs text-gray-500">{emp.id}</p>
                    </div>
                  </td>
                  <td className="p-2">{emp.department}</td>
                  <td className="p-2">{emp.lastActive}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-md ${
                        emp.status === "Active"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedEmployee(emp);
                        setShowStatusForm(true);
                      }}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this employee?')) {
                          setEmployees(employees.filter(e => e.id !== emp.id));
                        }
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {showStatusForm ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Status Update Form</h3>
            <form onSubmit={handleStatusUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Action Type
                </label>
                <select
                  name="reason"
                  className="w-full border rounded-lg p-2"
                  required
                >
                  <option value="">Select action</option>
                  <option value="activation">Activation</option>
                  <option value="deactivation">Deactivation</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Effective Date
                </label>
                <input
                  type="date"
                  name="effectiveDate"
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Comments
                </label>
                <textarea
                  name="comments"
                  className="w-full border rounded-lg p-2"
                  rows="3"
                  placeholder="Add comments..."
                  required
                />
              </div>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  name="confirmAction"
                  id="confirmAction"
                  className="mr-2"
                  required
                />
                <label htmlFor="confirmAction" className="text-sm text-gray-600">
                  I understand this action will affect user access to company resources.
                </label>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
                >
                  Submit Update
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowStatusForm(false);
                    setSelectedEmployee(null);
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 p-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Status Update Form</h3>
            <p className="text-gray-600">
              Select an employee from the table to update their status.
            </p>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Recent Activity Log</h3>
          <div className="space-y-4 max-h-[300px] overflow-y-auto">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 border-b pb-3">
                {activity.icon}
                <div>
                  <p className="text-sm font-medium">
                    {activity.action}: {activity.employee} ({activity.id})
                  </p>
                  <p className="text-xs text-gray-500">
                    {activity.date} - {activity.reason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAccount;
