import React from 'react';
import { TopDiagnosticLine } from '../components/TopDiagnosticLine';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col selection:bg-primary-container selection:text-on-primary">
      {/* Unified Sticky Header Container */}
      <div className="sticky top-0 z-50 w-full">
        {/* 1. Top Diagnostic Line */}
        <TopDiagnosticLine />
        {/* 2. Sticky Navigation Bar */}
        <Navbar />
      </div>

      {/* Main Page Content */}
      <main id="main-content" className="flex-1 w-full flex flex-col">
        {children}
      </main>

      {/* 17. Footer */}
      <Footer />
    </div>
  );
};
