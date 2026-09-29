import React, { useState, useEffect } from 'react';
import { X, ShieldAlert, Save, AlertCircle, ArrowRight } from 'lucide-react';

export default function IssueForm({
  isOpen,
  onClose,
  onSubmit,
  initialIssue,
  categories,
  departments,
  services
}) {
  const [categoryId, setCategoryId] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [citizenName, setCitizenName] = useState('');
  const [citizenContact, setCitizenContact] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('Open');
  const [errors, setErrors] = useState({});

  // Cascading filters
  const filteredDepartments = departments.filter(
    (dept) => dept.categoryId === Number(categoryId)
  );

  const filteredServices = services.filter(
    (srv) =>
      srv.categoryId === Number(categoryId) &&
      srv.departmentId === Number(departmentId)
  );

  useEffect(() => {
    if (initialIssue) {
      setCategoryId(String(initialIssue.categoryId || ''));
      setDepartmentId(String(initialIssue.departmentId || ''));
      setServiceId(String(initialIssue.serviceId || ''));
      setTitle(initialIssue.title || '');
      setDescription(initialIssue.description || '');
      setCitizenName(initialIssue.citizenName || '');
      setCitizenContact(initialIssue.citizenContact || '');
      setPriority(initialIssue.priority || 'Medium');
      setStatus(initialIssue.status || 'Open');
    } else {
      setTitle('');
      setDescription('');
      setCitizenName('');
      setCitizenContact('');
      setPriority('Medium');
      setStatus('Open');

      if (categories.length > 0) {
        const firstCatId = String(categories[0].id);
        setCategoryId(firstCatId);
        const deptsInCat = departments.filter((d) => d.categoryId === Number(firstCatId));
        if (deptsInCat.length > 0) {
          const firstDeptId = String(deptsInCat[0].id);
          setDepartmentId(firstDeptId);
          const srvsInDept = services.filter(
            (s) => s.categoryId === Number(firstCatId) && s.departmentId === Number(firstDeptId)
          );
          setServiceId(srvsInDept.length > 0 ? String(srvsInDept[0].id) : '');
        } else {
          setDepartmentId('');
          setServiceId('');
        }
      } else {
        setCategoryId('');
        setDepartmentId('');
        setServiceId('');
      }
    }
    setErrors({});
  }, [initialIssue, isOpen, categories, departments, services]);

  if (!isOpen) return null;

  const handleCategoryChange = (newCatId) => {
    setCategoryId(newCatId);
    if (errors.categoryId) setErrors({ ...errors, categoryId: null });

    const matchingDepts = departments.filter((d) => d.categoryId === Number(newCatId));
    if (matchingDepts.length > 0) {
      const firstDept = String(matchingDepts[0].id);
      setDepartmentId(firstDept);
      const matchingSrvs = services.filter(
        (s) => s.categoryId === Number(newCatId) && s.departmentId === Number(firstDept)
      );
      setServiceId(matchingSrvs.length > 0 ? String(matchingSrvs[0].id) : '');
    } else {
      setDepartmentId('');
      setServiceId('');
    }
  };

  const handleDepartmentChange = (newDeptId) => {
    setDepartmentId(newDeptId);
    if (errors.departmentId) setErrors({ ...errors, departmentId: null });

    const matchingSrvs = services.filter(
      (s) => s.categoryId === Number(categoryId) && s.departmentId === Number(newDeptId)
    );
    setServiceId(matchingSrvs.length > 0 ? String(matchingSrvs[0].id) : '');
  };

  const validate = () => {
    const errs = {};
    if (!categoryId) errs.categoryId = 'Please select a Category.';
    if (!departmentId) errs.departmentId = 'Please select a Department.';
    if (!serviceId) errs.serviceId = 'Please select a Service.';
    if (!title.trim()) errs.title = 'Issue summary/title is required.';
    if (!description.trim()) errs.description = 'Please provide details of the public grievance.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      id: initialIssue ? initialIssue.id : Date.now(),
      title: title.trim(),
      description: description.trim(),
      categoryId: Number(categoryId),
      departmentId: Number(departmentId),
      serviceId: Number(serviceId),
      citizenName: citizenName.trim() || 'Citizen',
      citizenContact: citizenContact.trim(),
      priority,
      status,
      createdAt: initialIssue ? initialIssue.createdAt : new Date().toISOString().split('T')[0]
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {initialIssue ? 'Edit Public Grievance' : 'Report New Public Issue'}
              </h3>
              <p className="text-xs text-slate-500">
                Centralized Issue Management across Category → Department → Service
              </p>
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          {/* Cascading 3-tier relationship indicators */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-3 text-xs text-amber-900">
            <span className="font-semibold">Classification Chain:</span>
            <div className="mt-1 flex items-center space-x-2 font-medium">
              <span className="bg-white px-2 py-0.5 rounded border border-amber-300">Category</span>
              <span>→</span>
              <span className="bg-white px-2 py-0.5 rounded border border-amber-300">Department</span>
              <span>→</span>
              <span className="bg-white px-2 py-0.5 rounded border border-amber-300">Service</span>
            </div>
          </div>

          {/* 1. Category */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              1. Select Category <span className="text-rose-500">*</span>
            </label>
            <select
              value={categoryId}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
            >
              <option value="">-- Select Category --</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
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

          {/* 2. Department */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              2. Select Department <span className="text-rose-500">*</span>
            </label>
            <select
              value={departmentId}
              disabled={!categoryId || filteredDepartments.length === 0}
              onChange={(e) => handleDepartmentChange(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white disabled:bg-slate-100 disabled:text-slate-400"
            >
              <option value="">
                {!categoryId
                  ? '-- Select Category First --'
                  : filteredDepartments.length === 0
                  ? '-- No Departments found in this Category --'
                  : '-- Choose Department --'}
              </option>
              {filteredDepartments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
            {errors.departmentId && (
              <p className="mt-1 text-xs text-rose-600 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.departmentId}</span>
              </p>
            )}
          </div>

          {/* 3. Service */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              3. Select Service <span className="text-rose-500">*</span>
            </label>
            <select
              value={serviceId}
              disabled={!departmentId || filteredServices.length === 0}
              onChange={(e) => {
                setServiceId(e.target.value);
                if (errors.serviceId) setErrors({ ...errors, serviceId: null });
              }}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white disabled:bg-slate-100 disabled:text-slate-400"
            >
              <option value="">
                {!departmentId
                  ? '-- Select Department First --'
                  : filteredServices.length === 0
                  ? '-- No Services under this Department --'
                  : '-- Choose Service Complaint Type --'}
              </option>
              {filteredServices.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            {errors.serviceId && (
              <p className="mt-1 text-xs text-rose-600 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.serviceId}</span>
              </p>
            )}
          </div>

          {/* Issue Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Issue Title / Headline <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Street light not working on Main Avenue"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors({ ...errors, title: null });
              }}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
            />
            {errors.title && (
              <p className="mt-1 text-xs text-rose-600 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.title}</span>
              </p>
            )}
          </div>

          {/* Issue Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Detailed Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              placeholder="Provide exact location, landmark, duration of the issue..."
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) setErrors({ ...errors, description: null });
              }}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
            />
            {errors.description && (
              <p className="mt-1 text-xs text-rose-600 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.description}</span>
              </p>
            )}
          </div>

          {/* Citizen Reporter Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Citizen Name
              </label>
              <input
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={citizenName}
                onChange={(e) => setCitizenName(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Contact Number
              </label>
              <input
                type="text"
                placeholder="e.g. 98765-43210"
                value={citizenContact}
                onChange={(e) => setCitizenContact(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Priority & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
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
              className="px-5 py-2 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm hover:shadow transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{initialIssue ? 'Update Ticket' : 'Submit Grievance'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
