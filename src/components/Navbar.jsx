import React, { useState } from 'react';
import { Menu, X, Shield, PhoneCall, ExternalLink } from 'lucide-react';

export default function Navbar({ customLogo, onLogoChange }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'categories', label: 'Categories' },
    { id: 'departments', label: 'Department' },
    { id: 'services', label: 'Services' },
    { id: 'issues', label: 'Issues' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top Official Gov Banner Strip */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium tracking-wide text-slate-200">
              Government Public Grievance & Service Delivery Platform
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-slate-400">
            <span>Toll-Free Helpline: <strong className="text-white font-mono">1800-11-2026</strong></span>
            <span>Citizen Portal v2.4</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Side: Government Logo */}
          <div className="flex items-center space-x-3.5 sm:space-x-4">
            <div className="relative group cursor-pointer" onClick={() => scrollToSection('home')}>
              {/* Logo image with automatic fallback */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-slate-50 border-2 border-blue-900/30 flex items-center justify-center p-1 shadow-sm transition-transform hover:scale-105">
                <img
                  src={customLogo || `${import.meta.env.BASE_URL}government-logo.svg`}
                  alt="Government Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = `${import.meta.env.BASE_URL}government-logo.svg`;
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col cursor-pointer" onClick={() => scrollToSection('home')}>
              <div className="flex items-center space-x-1.5">
                <span className="text-xs uppercase tracking-widest font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60">
                  Government Portal
                </span>
                <span className="hidden sm:inline text-[11px] text-slate-400 font-medium">| Official</span>
              </div>
              <h1 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 tracking-tight leading-tight">
                Public Issues & Sector Management
              </h1>
              <p className="text-xs text-slate-500 font-normal hidden sm:block">
                Department of Administrative Public Grievances
              </p>
            </div>
          </div>

          {/* Right Side: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? 'text-blue-700 bg-blue-50 shadow-sm border border-blue-200'
                      : 'text-slate-600 hover:text-blue-900 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            {/* Logo replacement helper input */}
            <label className="ml-3 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-3 py-1.5 rounded-md border border-slate-300 cursor-pointer flex items-center space-x-1.5 transition-colors">
              <span>Change Logo</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onLogoChange}
              />
            </label>
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center space-x-2">
            <label className="text-[11px] bg-slate-100 text-slate-700 px-2 py-1 rounded border border-slate-300 cursor-pointer">
              Logo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onLogoChange}
              />
            </label>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-1 shadow-lg animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <div className="pt-3 border-t border-slate-100 mt-2 text-xs text-slate-500">
            Helpline: <strong>1800-11-2026</strong> (Toll Free)
          </div>
        </div>
      )}
    </header>
  );
}
