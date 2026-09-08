import React from 'react';
import { TopDiagnosticLine } from './components/TopDiagnosticLine';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InfrastructureOverview } from './components/InfrastructureOverview';
import { EngineeringJourney } from './components/EngineeringJourney';
import { EngineeringStack } from './components/EngineeringStack';
import { FeaturedProjects } from './components/FeaturedProjects';
import { ArchitectureLab } from './components/ArchitectureLab';
import { DevOpsPipeline } from './components/DevOpsPipeline';
import { EngineeringPrinciples } from './components/EngineeringPrinciples';
import { CurrentlyBuilding } from './components/CurrentlyBuilding';
import { EngineeringLogs } from './components/EngineeringLogs';
import { GitHubPublic } from './components/GitHubPublic';
import { Certifications } from './components/Certifications';
import { ContactCTA } from './components/ContactCTA';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col selection:bg-primary-container selection:text-on-primary">
      {/* 1. Top Diagnostic Line */}
      <TopDiagnosticLine />

      {/* 2. Sticky Navigation Header */}
      <Navbar />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 w-full flex flex-col">
        {/* 3 & 4. Hero Section with Interactive Terminal */}
        <Hero />

        {/* 5. Infrastructure Overview (4 Telemetry Cards) */}
        <InfrastructureOverview />

        {/* 6. Engineering Journey (DAG Graph) */}
        <EngineeringJourney />

        {/* 7. Engineering Stack (6 Taxonomy Domains with Filter) */}
        <EngineeringStack />

        {/* 8. Featured Infrastructure Projects (4 Deep Case Studies & Modal) */}
        <FeaturedProjects />

        {/* 9. Architecture Lab (Visual Centerpiece SVG Topologies & Node Inspector) */}
        <ArchitectureLab />

        {/* 10. DevOps Delivery Pipeline (7-Stage Progression) */}
        <DevOpsPipeline />

        {/* 11. Engineering Principles (4 System Tenets) */}
        <EngineeringPrinciples />

        {/* 12. Currently Building (Active Curriculum File-Tree Tracker) */}
        <CurrentlyBuilding />

        {/* 13. Engineering Logs (5 Editorial Write-Ups & Reader Modal) */}
        <EngineeringLogs />

        {/* 14. GitHub / Building in Public (Heatmap & Repositories) */}
        <GitHubPublic />

        {/* 15. Certifications & Continuous Learning */}
        <Certifications />

        {/* 16. Contact CTA & Terminal Echo */}
        <ContactCTA />
      </main>

      {/* 17. Footer */}
      <Footer />
    </div>
  );
};

export default App;
