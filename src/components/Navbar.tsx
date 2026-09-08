import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Terminal } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  const navLinks = [
    { label: 'About', href: '#overview', id: 'overview' },
    { label: 'Stack', href: '#stack', id: 'stack' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Architecture', href: '#architecture', id: 'architecture' },
    { label: 'Journey', href: '#journey', id: 'journey' },
    { label: 'Logs', href: '#engineering-logs', id: 'engineering-logs' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.id);
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="w-full bg-[#0D1117]/95 backdrop-blur-md border-b border-cardBorder transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Monogram */}
        <div className="flex items-center gap-3">
          <a
            href="#overview"
            className="flex items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-primary focus:outline-none rounded"
            aria-label="Nafees Ur Rehman Portfolio Home"
          >
            <div className="w-9 h-9 rounded bg-[#111827] border border-cardBorder flex items-center justify-center font-mono font-bold text-white group-hover:border-primary-container transition-colors shadow-sm">
              <span className="text-primary-container font-black">N</span>
              <span className="text-on-surface">R</span>
              <span className="text-primary-container text-xs">.</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-white group-hover:text-primary transition-colors">
                Nafees Ur Rehman
              </span>
              <span className="text-[11px] text-on-surface-variant font-mono">
                AWS DevOps &amp; Cloud Infra
              </span>
            </div>
          </a>

          {/* Availability Beacon - Desktop */}
          <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface-container-low border border-cardBorder ml-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
            </span>
            <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">
              Available for Cloud / DevOps Opportunities
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-surface-container-lowest p-1 rounded border border-cardBorder/60"
        >
          {navLinks.map(link => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                  isActive
                    ? 'bg-surface-container-high text-white font-medium shadow-sm'
                    : 'text-on-surface-variant hover:text-white hover:bg-surface-container'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://github.com/expertnafees-hub"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className="p-2 rounded bg-surface-container-low text-on-surface-variant hover:text-white hover:bg-surface-container transition-colors border border-cardBorder flex items-center justify-center focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Terminal className="w-4 h-4 text-primary" />
          </a>

          <a
            href="#contact"
            className="px-3.5 py-2 rounded text-xs font-mono font-semibold bg-primary-container text-on-primary hover:bg-[#ffb86f] transition-all shadow-sm flex items-center gap-1.5 active:scale-95 focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span>CONTACT ME</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 rounded bg-surface-container text-on-surface hover:text-white border border-cardBorder focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-cardBorder bg-[#0D1117] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-surface-container-low text-tertiary text-xs font-mono mb-3 border border-cardBorder">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            <span>AVAILABLE FOR OPPORTUNITIES</span>
          </div>
          {navLinks.map(link => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded text-sm font-mono text-on-surface-variant hover:text-white hover:bg-surface-container transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-cardBorder flex items-center justify-between">
            <a
              href="https://github.com/expertnafees-hub"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs font-mono text-secondary py-2"
            >
              <Terminal className="w-4 h-4" />
              <span>github.com/expertnafees-hub</span>
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-1.5 rounded bg-primary-container text-on-primary text-xs font-mono font-bold"
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
