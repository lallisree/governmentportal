import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Folder, CheckCircle2, XCircle } from 'lucide-react';

export default function CategoryTable({
  categories,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  departments
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredCategories = categories.filter((cat) => {
    const matchesSearch =
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cat.description && cat.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'ALL' || cat.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Header Section */}
        <div className="p-6 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 bg-blue-100 text-blue-800 rounded-lg">
                <Folder className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Category Management
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Primary public sector groupings ({categories.length} Total)
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onAddCategory}
              className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Category</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 bg-white border-b border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search category name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <span className="text-xs font-medium text-slate-500">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-sm bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="ALL">All Status</option>
              <option value="Active">Active Only</option>
              <option value="Inactive">Inactive Only</option>
            </select>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/80 text-slate-700 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="py-3.5 px-4 w-16 text-center">ID</th>
                <th className="py-3.5 px-4">Category Name</th>
                <th className="py-3.5 px-4">Description</th>
                <th className="py-3.5 px-4 text-center">Linked Depts</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400 text-sm">
                    No categories found matching your query.
                  </td>
                </tr>
              ) : (
                filteredCategories.map((cat) => {
                  const linkedDepts = departments ? departments.filter((d) => d.categoryId === cat.id).length : 0;
                  const isActive = cat.status === 'Active';

                  return (
                    <tr key={cat.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-4 font-mono text-xs font-semibold text-slate-500 text-center">
                        #{cat.id}
                      </td>
                      <td className="py-4 px-4 font-semibold text-slate-900">
                        {cat.name}
                      </td>
                      <td className="py-4 px-4 text-slate-600 max-w-xs sm:max-w-md truncate">
                        {cat.description || '—'}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          {linkedDepts} {linkedDepts === 1 ? 'Dept' : 'Depts'}
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
                            onClick={() => onEditCategory(cat)}
                            title="Edit Category"
                            className="p-1.5 text-blue-700 hover:bg-blue-50 rounded-md border border-transparent hover:border-blue-200 transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDeleteCategory(cat.id)}
                            title="Delete Category"
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
