import React from 'react';
import { FolderPlus, Building2, Wrench, Plus, ArrowUpRight } from 'lucide-react';

export default function ActionButtons({ onOpenCategoryModal, onOpenDepartmentModal, onOpenServiceModal }) {
  return (
    <section id="action-buttons" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
        
        {/* Card 1: Add Category */}
        <button
          onClick={onOpenCategoryModal}
          className="action-card group text-left bg-white p-6 rounded-xl border-2 border-slate-200/90 hover:border-blue-600 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                <FolderPlus className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                Tier 1
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors flex items-center justify-between">
              <span>Category</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </h3>
            <p className="text-sm text-slate-500 mt-1 line-clamp-2">
              Define top-level public utility sectors like Water, Roads, Sanitation, and Electricity.
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-semibold text-blue-700">
            <span className="flex items-center space-x-1.5">
              <Plus className="w-4 h-4" />
              <span>Add Category</span>
            </span>
            <span className="text-xs bg-slate-100 group-hover:bg-blue-50 text-slate-600 group-hover:text-blue-700 px-2 py-0.5 rounded font-mono">
              + New
            </span>
          </div>
        </button>

        {/* Card 2: Add Department */}
        <button
          onClick={onOpenDepartmentModal}
          className="action-card group text-left bg-white p-6 rounded-xl border-2 border-slate-200/90 hover:border-indigo-600 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                Tier 2
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors flex items-center justify-between">
              <span>Department</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </h3>
            <p className="text-sm text-slate-500 mt-1 line-clamp-2">
              Register government authorities and executive boards mapped directly to their parent category.
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-semibold text-indigo-700">
            <span className="flex items-center space-x-1.5">
              <Plus className="w-4 h-4" />
              <span>Add Department</span>
            </span>
            <span className="text-xs bg-slate-100 group-hover:bg-indigo-50 text-slate-600 group-hover:text-indigo-700 px-2 py-0.5 rounded font-mono">
              + New
            </span>
          </div>
        </button>

        {/* Card 3: Add Service */}
        <button
          onClick={onOpenServiceModal}
          className="action-card group text-left bg-white p-6 rounded-xl border-2 border-slate-200/90 hover:border-cyan-600 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-700 border border-cyan-200 flex items-center justify-center group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-200">
                <Wrench className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-200">
                Tier 3
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-700 transition-colors flex items-center justify-between">
              <span>Service</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </h3>
            <p className="text-sm text-slate-500 mt-1 line-clamp-2">
              Configure actionable grievance redressal services mapped to department and category.
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-semibold text-cyan-700">
            <span className="flex items-center space-x-1.5">
              <Plus className="w-4 h-4" />
              <span>Add Service</span>
            </span>
            <span className="text-xs bg-slate-100 group-hover:bg-cyan-50 text-slate-600 group-hover:text-cyan-700 px-2 py-0.5 rounded font-mono">
              + New
            </span>
          </div>
        </button>

      </div>
    </section>
  );
}
