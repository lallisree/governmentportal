import React, { useState, useEffect } from 'react';
import { X, Wrench, Save, AlertCircle, ArrowRight } from 'lucide-react';

export default function ServiceForm({
  isOpen,
  onClose,
  onSubmit,
  initialService,
  categories,
  departments
}) {
  const [categoryId, setCategoryId] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Active');
  const [errors, setErrors] = useState({});

  // Filter departments belonging ONLY to selected category
  const filteredDepartments = departments.filter(
    (dept) => dept.categoryId === Number(categoryId)
  );

  useEffect(() => {
    if (initialService) {
      setCategoryId(String(initialService.categoryId || ''));
      setDepartmentId(String(initialService.departmentId || ''));
      setName(initialService.name || '');
      setStatus(initialService.status || 'Active');
    } else {
      setName('');
      setStatus('Active');
      if (categories.length > 0) {
        const defaultCatId = String(categories[0].id);
        setCategoryId(defaultCatId);
        const matchingDepts = departments.filter((d) => d.categoryId === Number(defaultCatId));
        setDepartmentId(matchingDepts.length > 0 ? String(matchingDepts[0].id) : '');
      } else {
        setCategoryId('');
        setDepartmentId('');
      }
    }
    setErrors({});
  }, [initialService, isOpen, categories, departments]);

  if (!isOpen) return null;

  // Handle category change: reset or update departmentId
  const handleCategoryChange = (newCatId) => {
    setCategoryId(newCatId);
    if (errors.categoryId) setErrors({ ...errors, categoryId: null });

    const matchingDepts = departments.filter((d) => d.categoryId === Number(newCatId));
    if (matchingDepts.length > 0) {
      setDepartmentId(String(matchingDepts[0].id));
    } else {
      setDepartmentId('');
    }
  };

  const validate = () => {
    const errs = {};
    if (!categoryId) {
      errs.categoryId = 'Please select a category.';
    }
    if (!departmentId) {
      errs.departmentId = 'Please select a department belonging to the category.';
    }
    if (!name.trim()) {
      errs.name = 'Service name is required.';
    } else if (name.trim().length < 3) {
      errs.name = 'Service name must be at least 3 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      id: initialService ? initialService.id : Date.now(),
      name: name.trim(),
      categoryId: Number(categoryId),
      departmentId: Number(departmentId),
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
            <div className="p-2 bg-cyan-100 text-cyan-700 rounded-lg">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {initialService ? 'Edit Service' : 'Add New Service'}
              </h3>
              <p className="text-xs text-slate-500">Tier-3 Public Service Configuration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Dependent Dropdown Explanation Banner */}
        <div className="bg-cyan-50/70 border-b border-cyan-100 px-6 py-2.5 text-xs text-cyan-900 flex items-center space-x-2">
          <span className="font-semibold">Workflow:</span>
          <span>Category</span>
          <ArrowRight className="w-3 h-3 text-cyan-600" />
          <span>Department</span>
          <ArrowRight className="w-3 h-3 text-cyan-600" />
          <span className="font-bold text-cyan-800">Service</span>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Step 1: Select Category */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              1. Select Category <span className="text-rose-500">*</span>
            </label>
            <select
              value={categoryId}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                errors.categoryId ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-300 focus:ring-cyan-600'
              }`}
            >
              <option value="">-- Choose Category --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="mt-1 text-xs text-rose-600 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.categoryId}</span>
              </p>
            )}
          </div>

          {/* Step 2: Select Department (Dependent on Category) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              2. Select Department <span className="text-rose-500">*</span>
            </label>
            <select
              value={departmentId}
              disabled={!categoryId || filteredDepartments.length === 0}
              onChange={(e) => {
                setDepartmentId(e.target.value);
                if (errors.departmentId) setErrors({ ...errors, departmentId: null });
              }}
              className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:bg-white transition-all disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed ${
                errors.departmentId ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-300 focus:ring-cyan-600'
              }`}
            >
              <option value="">
                {!categoryId
                  ? '-- Select a Category First --'
                  : filteredDepartments.length === 0
                  ? '-- No Departments in this Category --'
                  : '-- Choose Department --'}
              </option>
              {filteredDepartments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
            {errors.departmentId && (
              <p className="mt-1 text-xs text-rose-600 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.departmentId}</span>
              </p>
            )}
            <p className="text-[11px] text-slate-400 mt-1">
              Only departments belonging to the selected category are shown.
            </p>
          </div>

          {/* Step 3: Service Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              3. Service Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Water Pipeline Leakage, Pothole Repair"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: null });
              }}
              className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                errors.name ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-300 focus:ring-cyan-600'
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
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:bg-white transition-all"
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
              className="px-5 py-2 text-sm font-semibold text-white bg-cyan-700 hover:bg-cyan-800 rounded-lg shadow-sm hover:shadow transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{initialService ? 'Update Service' : 'Add Service'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
