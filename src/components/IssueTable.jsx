import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, AlertTriangle, CheckCircle, Clock, ShieldAlert, ArrowRight } from 'lucide-react';

export default function IssueTable({
  issues,
  categories,
  departments,
  services,
  onAddIssue,
  onEditIssue,
  onDeleteIssue,
  onStatusChange
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const getCategoryName = (categoryId) => {
    const cat = categories.find((c) => c.id === Number(categoryId));
    return cat ? cat.name : 'Unknown Category';
  };

  const getDepartmentName = (deptId) => {
    const dept = departments.find((d) => d.id === Number(deptId));
    return dept ? dept.name : 'Unknown Dept';
  };

  const getServiceName = (serviceId) => {
    const srv = services.find((s) => s.id === Number(serviceId));
    return srv ? srv.name : 'Unknown Service';
  };

  const filteredIssues = issues.filter((issue) => {
    const catName = getCategoryName(issue.categoryId);
    const deptName = getDepartmentName(issue.departmentId);
    const srvName = getServiceName(issue.serviceId);

    const matchesSearch =
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (issue.description && issue.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      catName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deptName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      srvName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (issue.citizenName && issue.citizenName.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || issue.status === statusFilter;
    const matchesCategory = categoryFilter === 'ALL' || issue.categoryId === Number(categoryFilter);

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'High':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Medium':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Resolved':
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-300">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Resolved</span>
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-300">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>In Progress</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Open</span>
          </span>
        );
    }
  };

  return (
    <section id="issues" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-12">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Header Section */}
        <div className="p-6 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 bg-amber-100 text-amber-900 rounded-lg">
                <ShieldAlert className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Public Issues Management
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Citizen grievances connected across Category → Department → Service ({issues.length} Logged)
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onAddIssue}
              className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Report Public Issue</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 bg-white border-b border-slate-200 flex flex-col lg:flex-row gap-3 items-center justify-between">
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search issues, reporter, keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Filter by Category */}
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-medium text-slate-500">Category:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="text-sm bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="ALL">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
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
                className="text-sm bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="ALL">All Status</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/80 text-slate-700 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="py-3.5 px-4 w-16 text-center">Ticket</th>
                <th className="py-3.5 px-4">Issue Details</th>
                <th className="py-3.5 px-4">Government Classification</th>
                <th className="py-3.5 px-4 text-center">Priority</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {filteredIssues.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400 text-sm">
                    No public grievances logged matching current filters.
                  </td>
                </tr>
              ) : (
                filteredIssues.map((issue) => {
                  const catName = getCategoryName(issue.categoryId);
                  const deptName = getDepartmentName(issue.departmentId);
                  const srvName = getServiceName(issue.serviceId);

                  return (
                    <tr key={issue.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-4 font-mono text-xs font-semibold text-slate-500 text-center">
                        #{issue.id}
                      </td>
                      <td className="py-4 px-4">
                        <div className="max-w-md">
                          <p className="font-semibold text-slate-900 leading-tight">
                            {issue.title}
                          </p>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                            {issue.description}
                          </p>
                          <div className="mt-1.5 flex items-center space-x-2 text-[11px] text-slate-400">
                            <span>Reported by: <strong className="text-slate-600">{issue.citizenName || 'Anonymous'}</strong></span>
                            <span>•</span>
                            <span>{issue.createdAt || 'Recent'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center space-x-1.5">
                            <span className="font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                              {catName}
                            </span>
                            <span className="text-slate-400">/</span>
                            <span className="font-medium text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                              {deptName}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-600 font-medium flex items-center space-x-1">
                            <span className="text-cyan-600">↳ Service:</span>
                            <span>{srvName}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getPriorityBadge(issue.priority)}`}>
                          {issue.priority || 'Normal'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        {getStatusBadge(issue.status)}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="inline-flex items-center space-x-2">
                          <select
                            value={issue.status}
                            onChange={(e) => onStatusChange(issue.id, e.target.value)}
                            className="text-xs bg-slate-50 border border-slate-300 rounded px-2 py-1 font-medium text-slate-700 cursor-pointer focus:ring-1 focus:ring-amber-500"
                            title="Update Status"
                          >
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                          </select>
                          <button
                            onClick={() => onEditIssue(issue)}
                            title="Edit Issue"
                            className="p-1.5 text-amber-700 hover:bg-amber-50 rounded-md border border-transparent hover:border-amber-200 transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDeleteIssue(issue.id)}
                            title="Delete Issue"
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
