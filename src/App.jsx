import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import ActionButtons from './components/ActionButtons';
import CategoryTable from './components/CategoryTable';
import DepartmentTable from './components/DepartmentTable';
import ServiceTable from './components/ServiceTable';
import IssueTable from './components/IssueTable';

import CategoryForm from './components/CategoryForm';
import DepartmentForm from './components/DepartmentForm';
import ServiceForm from './components/ServiceForm';
import IssueForm from './components/IssueForm';

import {
  initialCategories,
  initialDepartments,
  initialServices,
  initialIssues
} from './data/initialData';

export default function App() {
  // State for Entities
  const [categories, setCategories] = useState(initialCategories);
  const [departments, setDepartments] = useState(initialDepartments);
  const [services, setServices] = useState(initialServices);
  const [issues, setIssues] = useState(initialIssues);

  // Custom Logo state (supports user providing their logo image)
  const [customLogo, setCustomLogo] = useState(null);

  // Modal Visibility State
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [departmentModalOpen, setDepartmentModalOpen] = useState(false);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [issueModalOpen, setIssueModalOpen] = useState(false);

  // Editing Item State
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [editingIssue, setEditingIssue] = useState(null);

  // Logo upload handler
  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCustomLogo(imageUrl);
    }
  };

  // --- CATEGORY CRUD HANDLERS ---
  const handleOpenAddCategory = () => {
    setEditingCategory(null);
    setCategoryModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryModalOpen(true);
  };

  const handleSaveCategory = (categoryData) => {
    if (editingCategory) {
      setCategories((prev) =>
        prev.map((c) => (c.id === categoryData.id ? categoryData : c))
      );
    } else {
      setCategories((prev) => [...prev, categoryData]);
    }
  };

  const handleDeleteCategory = (categoryId) => {
    // Check if any departments depend on this category
    const dependentDepts = departments.filter((d) => d.categoryId === categoryId);
    if (dependentDepts.length > 0) {
      alert(
        `Cannot delete this Category: ${dependentDepts.length} department(s) depend on it. Please reassign or delete those departments first.`
      );
      return;
    }

    if (window.confirm('Are you sure you want to delete this Category?')) {
      setCategories((prev) => prev.filter((c) => c.id !== categoryId));
    }
  };

  // --- DEPARTMENT CRUD HANDLERS ---
  const handleOpenAddDepartment = () => {
    if (categories.length === 0) {
      alert('Please create at least one Category before adding a Department.');
      setCategoryModalOpen(true);
      return;
    }
    setEditingDepartment(null);
    setDepartmentModalOpen(true);
  };

  const handleEditDepartment = (dept) => {
    setEditingDepartment(dept);
    setDepartmentModalOpen(true);
  };

  const handleSaveDepartment = (deptData) => {
    if (editingDepartment) {
      setDepartments((prev) =>
        prev.map((d) => (d.id === deptData.id ? deptData : d))
      );
    } else {
      setDepartments((prev) => [...prev, deptData]);
    }
  };

  const handleDeleteDepartment = (deptId) => {
    // Check if any services depend on this department
    const dependentServices = services.filter((s) => s.departmentId === deptId);
    if (dependentServices.length > 0) {
      alert(
        `Cannot delete this Department: ${dependentServices.length} service(s) depend on it. Please remove or reassign those services first.`
      );
      return;
    }

    if (window.confirm('Are you sure you want to delete this Department?')) {
      setDepartments((prev) => prev.filter((d) => d.id !== deptId));
    }
  };

  // --- SERVICE CRUD HANDLERS ---
  const handleOpenAddService = () => {
    if (categories.length === 0) {
      alert('Please create a Category first.');
      setCategoryModalOpen(true);
      return;
    }
    if (departments.length === 0) {
      alert('Please create a Department first before configuring Services.');
      setDepartmentModalOpen(true);
      return;
    }
    setEditingService(null);
    setServiceModalOpen(true);
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setServiceModalOpen(true);
  };

  const handleSaveService = (serviceData) => {
    if (editingService) {
      setServices((prev) =>
        prev.map((s) => (s.id === serviceData.id ? serviceData : s))
      );
    } else {
      setServices((prev) => [...prev, serviceData]);
    }
  };

  const handleDeleteService = (serviceId) => {
    const dependentIssues = issues.filter((i) => i.serviceId === serviceId);
    if (dependentIssues.length > 0) {
      const confirmDelete = window.confirm(
        `Warning: ${dependentIssues.length} logged issue(s) are linked to this service. Are you sure you want to delete it?`
      );
      if (!confirmDelete) return;
    } else {
      if (!window.confirm('Are you sure you want to delete this Service?')) return;
    }

    setServices((prev) => prev.filter((s) => s.id !== serviceId));
  };

  // --- ISSUE CRUD HANDLERS ---
  const handleOpenAddIssue = () => {
    if (services.length === 0) {
      alert('Please configure at least one Category, Department, and Service first.');
      return;
    }
    setEditingIssue(null);
    setIssueModalOpen(true);
  };

  const handleEditIssue = (issue) => {
    setEditingIssue(issue);
    setIssueModalOpen(true);
  };

  const handleSaveIssue = (issueData) => {
    if (editingIssue) {
      setIssues((prev) =>
        prev.map((i) => (i.id === issueData.id ? issueData : i))
      );
    } else {
      setIssues((prev) => [issueData, ...prev]);
    }
  };

  const handleDeleteIssue = (issueId) => {
    if (window.confirm('Are you sure you want to delete this issue record?')) {
      setIssues((prev) => prev.filter((i) => i.id !== issueId));
    }
  };

  const handleIssueStatusChange = (issueId, newStatus) => {
    setIssues((prev) =>
      prev.map((i) => (i.id === issueId ? { ...i, status: newStatus } : i))
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans">
      {/* 1. Sticky Navbar */}
      <Navbar
        customLogo={customLogo}
        onLogoChange={handleLogoUpload}
      />

      <main className="flex-1">
        {/* 2. Banner / Hero Section */}
        <Banner
          totalCategories={categories.length}
          totalDepartments={departments.length}
          totalServices={services.length}
          totalIssues={issues.length}
        />

        {/* 3. Three Large Action Buttons Below Banner */}
        <ActionButtons
          onOpenCategoryModal={handleOpenAddCategory}
          onOpenDepartmentModal={handleOpenAddDepartment}
          onOpenServiceModal={handleOpenAddService}
        />

        {/* Hierarchy Information Pill */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-3">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-slate-900 uppercase tracking-wider">
                System Hierarchy:
              </span>
              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-semibold border border-blue-200">
                1. Category
              </span>
              <span>→</span>
              <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 font-semibold border border-indigo-200">
                2. Department
              </span>
              <span>→</span>
              <span className="px-2 py-0.5 rounded bg-cyan-50 text-cyan-800 font-semibold border border-cyan-200">
                3. Service
              </span>
              <span>→</span>
              <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-semibold border border-amber-200">
                4. Public Issue
              </span>
            </div>
            <div className="text-slate-400 font-medium text-center sm:text-right">
              Centralized Public Grievance Redress and Monitoring System (CPGRAMS)
            </div>
          </div>
        </div>

        {/* 4. Category Table */}
        <CategoryTable
          categories={categories}
          departments={departments}
          onAddCategory={handleOpenAddCategory}
          onEditCategory={handleEditCategory}
          onDeleteCategory={handleDeleteCategory}
        />

        {/* 5. Department Table */}
        <DepartmentTable
          departments={departments}
          categories={categories}
          services={services}
          onAddDepartment={handleOpenAddDepartment}
          onEditDepartment={handleEditDepartment}
          onDeleteDepartment={handleDeleteDepartment}
        />

        {/* 6. Service Table */}
        <ServiceTable
          services={services}
          departments={departments}
          categories={categories}
          issues={issues}
          onAddService={handleOpenAddService}
          onEditService={handleEditService}
          onDeleteService={handleDeleteService}
        />

        {/* 7. Issues Table */}
        <IssueTable
          issues={issues}
          categories={categories}
          departments={departments}
          services={services}
          onAddIssue={handleOpenAddIssue}
          onEditIssue={handleEditIssue}
          onDeleteIssue={handleDeleteIssue}
          onStatusChange={handleIssueStatusChange}
        />
      </main>

      {/* Forms & Modals */}
      <CategoryForm
        isOpen={categoryModalOpen}
        onClose={() => {
          setCategoryModalOpen(false);
          setEditingCategory(null);
        }}
        onSubmit={handleSaveCategory}
        initialCategory={editingCategory}
      />

      <DepartmentForm
        isOpen={departmentModalOpen}
        onClose={() => {
          setDepartmentModalOpen(false);
          setEditingDepartment(null);
        }}
        onSubmit={handleSaveDepartment}
        initialDepartment={editingDepartment}
        categories={categories}
      />

      <ServiceForm
        isOpen={serviceModalOpen}
        onClose={() => {
          setServiceModalOpen(false);
          setEditingService(null);
        }}
        onSubmit={handleSaveService}
        initialService={editingService}
        categories={categories}
        departments={departments}
      />

      <IssueForm
        isOpen={issueModalOpen}
        onClose={() => {
          setIssueModalOpen(false);
          setEditingIssue(null);
        }}
        onSubmit={handleSaveIssue}
        initialIssue={editingIssue}
        categories={categories}
        departments={departments}
        services={services}
      />

      {/* Official Government Footer */}
      <footer className="bg-slate-900 text-slate-400 text-sm mt-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-white font-bold">
                <img
                  src={customLogo || `${import.meta.env.BASE_URL}government-logo.svg`}
                  alt="Government Logo"
                  className="w-8 h-8 rounded-full bg-slate-800 p-0.5"
                  onError={(e) => { e.currentTarget.src = `${import.meta.env.BASE_URL}government-logo.svg`; }}
                />
                <span>Government Portal</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                National Public Grievance and Issues Management Portal. Committed to accountable, transparent, and citizen-first governance.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
                Government Sectors
              </h4>
              <ul className="space-y-1.5 text-xs">
                <li><a href="#categories" className="hover:text-white transition-colors">Water & Sanitation</a></li>
                <li><a href="#departments" className="hover:text-white transition-colors">Roads & Urban Infrastructure</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Power & Energy Distribution</a></li>
                <li><a href="#issues" className="hover:text-white transition-colors">Public Grievances Desk</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
                Quick Navigation
              </h4>
              <ul className="space-y-1.5 text-xs">
                <li><a href="#home" className="hover:text-white transition-colors">Citizen Home</a></li>
                <li><a href="#departments" className="hover:text-white transition-colors">Department Directory</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Public Services List</a></li>
                <li><a href="#issues" className="hover:text-white transition-colors">Track Grievance Status</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
                Emergency & Support
              </h4>
              <p className="text-xs text-slate-400 mb-2">
                Toll Free National Helpline:
              </p>
              <p className="text-lg font-bold text-white font-mono">1800-11-2026</p>
              <p className="text-[11px] text-slate-500 mt-2">
                Available 24x7 in multiple regional languages.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} Government Issues & Public Sector Redressal Portal. All rights reserved.</p>
            <div className="flex space-x-6 text-slate-400">
              <span className="hover:underline cursor-pointer">Privacy Policy</span>
              <span className="hover:underline cursor-pointer">Terms of Service</span>
              <span className="hover:underline cursor-pointer">Accessibility Statement</span>
              <span className="hover:underline cursor-pointer">RTI Portal</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
