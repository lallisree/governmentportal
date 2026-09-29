import React, { useState, useEffect } from 'react';
import { X, Building2, Save, AlertCircle } from 'lucide-react';

export default function DepartmentForm({
  isOpen,
  onClose,
  onSubmit,
  initialDepartment,
  categories
}) {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [status, setStatus] = useState('Active');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialDepartment) {
      setName(initialDepartment.name || '');
      setCategoryId(String(initialDepartment.categoryId || ''));
      setStatus(initialDepartment.status || 'Active');
    } else {
      setName('');
      // Default to first active category if available
      setCategoryId(categories.length > 0 ? String(categories[0].id) : '');
      setStatus('Active');
    }
    setErrors({});
  }, [initialDepartment, isOpen, categories]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!name.trim()) {
      errs.name = 'Department name is required.';
    } else if (name.trim().length < 3) {
      errs.name = 'Department name must be at least 3 characters.';
    }
    if (!categoryId) {
      errs.categoryId = 'Please select a parent category.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      id: initialDepartment ? initialDepartment.id : Date.now(),
      name: name.trim(),
      categoryId: Number(categoryId),
      status
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {initialDepartment ? 'Edit Department' : 'Add Department'}
              </h3>
              <p className="text-xs text-slate-500">Assign Department to a Master Sector Category</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Category Dropdown */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Select Category <span className="text-rose-500">*</span>
            </label>
            <select
              value={categoryId}
              onChange={(e) => {
                setCategoryId(e.target.value);
                if (errors.categoryId) setErrors({ ...errors, categoryId: null });
              }}
              className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                errors.categoryId ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-300 focus:ring-indigo-600'
              }`}
            >
              <option value="">-- Choose Category --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} ({cat.status})
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="mt-1 text-xs text-rose-600 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.categoryId}</span>
              </p>
            )}
            <p className="text-[11px] text-slate-400 mt-1">
              The department will be classified under this primary category.
            </p>
          </div>

          {/* Department Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Department Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Water Works Department, Highway Authority"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: null });
              }}
              className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                errors.name ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-300 focus:ring-indigo-600'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-rose-600 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Status <span className="text-rose-500">*</span>
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg shadow-sm hover:shadow transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{initialDepartment ? 'Update Department' : 'Add Department'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
