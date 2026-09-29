import React from 'react';
import { ShieldCheck, Users, FileCheck2, Clock, Landmark, AlertCircle, ArrowDown } from 'lucide-react';

export default function Banner({ totalCategories, totalDepartments, totalServices, totalIssues, onQuickAction }) {
  return (
    <section id="home" className="relative bg-gradient-to-b from-blue-900 via-slate-900 to-slate-900 text-white overflow-hidden py-14 lg:py-20">
      {/* Decorative civic pattern background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="civic-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#civic-grid)" />
        </svg>
      </div>

      {/* Floating subtle glowing ambient lights */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading and Description */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-blue-800/80 border border-blue-400/30 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase text-blue-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Official Public Grievance Portal</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Government Issues Management
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
              Report, manage and track public issues through a centralized government platform.
              Ensuring transparency, accountability, and rapid service delivery across all public municipal sectors.
            </p>

            {/* Quick action buttons & badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById('issues');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>Track Public Issues</span>
                <ArrowDown className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => {
                  const el = document.getElementById('action-buttons');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-semibold px-6 py-3 rounded-lg border border-slate-700 transition-colors flex items-center space-x-2 cursor-pointer"
              >
                <Landmark className="w-4 h-4 text-amber-400" />
                <span>Sector Directory</span>
              </button>
            </div>

            {/* Key Assurance Indicators */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left border-t border-slate-800">
              <div className="flex items-center space-x-2 text-slate-300 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>24x7 SLA Resolution</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300 text-xs">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span>Direct Citizen Redressal</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300 text-xs col-span-2 sm:col-span-1">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Inter-Department Sync</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Metrics & Illustration Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white tracking-wide uppercase">Civic Operations Hub</h2>
                    <p className="text-xs text-slate-400">Real-time Public Sector Overview</p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  System Online
                </span>
              </div>

              {/* 4 Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 hover:border-blue-500/40 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-400">Categories</span>
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">{totalCategories}</div>
                  <p className="text-[11px] text-slate-400 mt-1">Core Sectors</p>
                </div>

                <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 hover:border-blue-500/40 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-400">Departments</span>
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">{totalDepartments}</div>
                  <p className="text-[11px] text-slate-400 mt-1">Active Agencies</p>
                </div>

                <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 hover:border-blue-500/40 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-400">Services</span>
                    <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">{totalServices}</div>
                  <p className="text-[11px] text-slate-400 mt-1">Public Services</p>
                </div>

                <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 hover:border-blue-500/40 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-400">Logged Issues</span>
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">{totalIssues}</div>
                  <p className="text-[11px] text-slate-400 mt-1">Public Reports</p>
                </div>
              </div>

              {/* Citizen assistance banner */}
              <div className="mt-6 bg-blue-950/70 border border-blue-800/60 rounded-xl p-3.5 flex items-center space-x-3 text-xs text-blue-200">
                <AlertCircle className="w-5 h-5 text-blue-400 shrink-0" />
                <span>
                  All submitted public grievances are automatically assigned to the designated department based on hierarchical classification.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
