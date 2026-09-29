import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Wrench, Layers } from 'lucide-react';

export default function ServiceTable({
  services,
  departments,
  categories,
  onAddService,
  onEditService,
  onDeleteService,
  issues
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const getCategoryName = (categoryId) => {
    const cat = categories.find((c) => c.id === Number(categoryId));
    return cat ? cat.name : 'Unknown Category';
  };

  const getDepartmentName = (deptId) => {
    const dept = departments.find((d) => d.id === Number(deptId));
    return dept ? dept.name : 'Unknown Dept';
  };

  // Filter available departments in dropdown based on selected categoryFilter
  const availableFilterDepartments = categoryFilter === 'ALL'
    ? departments
    : departments.filter((d) => d.categoryId === Number(categoryFilter));

  const filteredServices = services.filter((srv) => {
    const catName = getCategoryName(srv.categoryId);
    const deptName = getDepartmentName(srv.departmentId);

    const matchesSearch =
      srv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      catName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deptName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === 'ALL' || srv.categoryId === Number(categoryFilter);

    const matchesDepartment =
      departmentFilter === 'ALL' || srv.departmentId === Number(departmentFilter);

    const matchesStatus =
      statusFilter === 'ALL' || srv.status === statusFilter;

    return matchesSearch && matchesCategory && matchesDepartment && matchesStatus;
  });

  return (
    <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Header Section */}
        <div className="p-6 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 bg-cyan-100 text-cyan-800 rounded-lg">
                <Wrench className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Service Management
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Citizen grievance redressal services mapped to Category & Department ({services.length} Total)
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onAddService}
              className="bg-cyan-700 hover:bg-cyan-800 text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Service</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 bg-white border-b border-slate-200 flex flex-col lg:flex-row gap-3 items-center justify-between">
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search service, dept or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:bg-white transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Filter by Category */}
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-medium text-slate-500">Category:</span>
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setDepartmentFilter('ALL'); // Reset dependent dept filter
                }}
                className="text-sm bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-cyan-600"
              >
                <option value="ALL">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Department (Dynamic) */}
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-medium text-slate-500">Department:</span>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="text-sm bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-cyan-600"
              >
                <option value="ALL">All Departments</option>
                {availableFilterDepartments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Status */}
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-medium text-slate-500">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-sm bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-cyan-600"
              >
                <option value="ALL">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/80 text-slate-700 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="py-3.5 px-4 w-16 text-center">ID</th>
                <th className="py-3.5 px-4">Service Name</th>
                <th className="py-3.5 px-4">Category & Department Hierarchy</th>
                <th className="py-3.5 px-4 text-center">Active Issues</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {filteredServices.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400 text-sm">
                    No services found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredServices.map((srv) => {
                  const catName = getCategoryName(srv.categoryId);
                  const deptName = getDepartmentName(srv.departmentId);
                  const linkedIssues = issues ? issues.filter((i) => i.serviceId === srv.id).length : 0;
                  const isActive = srv.status === 'Active';

                  return (
                    <tr key={srv.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-4 font-mono text-xs font-semibold text-slate-500 text-center">
                        #{srv.id}
                      </td>
                      <td className="py-4 px-4 font-semibold text-slate-900">
                        {srv.name}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center space-x-1.5 text-xs text-slate-500">
                            <span className="font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                              {catName}
                            </span>
                            <span>→</span>
                            <span className="font-medium text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                              {deptName}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                          {linkedIssues} {linkedIssues === 1 ? 'Issue' : 'Issues'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        {isActive ? (
                          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <span>Active</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                            <span>Inactive</span>
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="inline-flex items-center space-x-2">
                          <button
                            onClick={() => onEditService(srv)}
                            title="Edit Service"
                            className="p-1.5 text-cyan-700 hover:bg-cyan-50 rounded-md border border-transparent hover:border-cyan-200 transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDeleteService(srv.id)}
                            title="Delete Service"
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
