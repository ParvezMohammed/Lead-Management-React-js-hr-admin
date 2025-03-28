import { useState } from "react";
import { FaEye, FaEdit, FaTrash, FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Navbar } from "./Navbar"; // Import Navbar

const ManageWork = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const employees = [
    { name: "Anjali Mehta", designation: "UI/UX Designer Intern", project: "E-commerce site", lead: "Kadi Manela" },
    { name: "Ali Alhamdan", designation: "Graphic Designer", project: "Food App Design", lead: "Kadi Manela" },
    { name: "Mona Alghafoor", designation: "Graphic Designer", project: "IT Department", lead: "Kadi Manela" },
    { name: "Moustafa Adel", designation: "Graphic Designer", project: "HR Department", lead: "Kadi Manela" },
    { name: "Jhon Neleson", designation: "Graphic Designer", project: "HR Department", lead: "Kadi Manela" },
    { name: "Kadi Manela", designation: "Graphic Designer", project: "HR Department", lead: "Kadi Manela" },
  ];
  const totalPages = Math.max(10, Math.ceil(employees.length / itemsPerPage));

  return (
    <div className="flex flex-col h-screen">
      <Navbar heading="Intern Work Management" />

      {/* Main Content Box */}
      <div className="mb-8 border border-gray-200 rounded-lg bg-white shadow-md">
        <div className="p-6">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Employee Management & Assigned Work</h3>

            {/* Search Bar */}
            <div className="relative w-[300px]">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search Here"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 bg-white"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="border-b bg-gray-50 text-gray-700 text-sm">
                  <th className="p-4 text-left font-semibold">Full Name</th>
                  <th className="p-4 text-left font-semibold">Designation</th>
                  <th className="p-4 text-left font-semibold">Assigned Project Name</th>
                  <th className="p-4 text-left font-semibold">Team Lead</th>
                  <th className="p-4 text-left font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {employees
                  .filter((emp) => emp.name.toLowerCase().includes(search.toLowerCase()))
                  .map((emp, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50 text-gray-700 text-sm">
                      <td className="p-4">{emp.name}</td>
                      <td className="p-4">{emp.designation}</td>
                      <td className="p-4">{emp.project}</td>
                      <td className="p-4">{emp.lead}</td>
                      <td className="p-4 flex gap-4">
                        <FaEye className="text-gray-500 cursor-pointer hover:text-blue-600" />
                        <FaEdit className="text-gray-500 cursor-pointer hover:text-yellow-500" />
                        <FaTrash className="text-gray-500 cursor-pointer hover:text-red-500" />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6 text-gray-600 text-sm">
            <span>Page {currentPage} of {totalPages}</span>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-200"
              >
                <FaChevronLeft />
              </button>
              <button 
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded bg-blue-100 hover:bg-blue-200"
              >
                <FaChevronRight />
              </button>

              <span className="ml-2">
                Page:
                <input
                  type="number"
                  value={currentPage}
                  onChange={(e) => setCurrentPage(Number(e.target.value))}
                  className="ml-2 w-[50px] border rounded px-2 text-center"
                />
                of {totalPages}
              </span>

              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="border rounded p-1 ml-3"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ManageWork;
