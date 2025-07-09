'use client';

import React, { useState } from 'react';
import ApplicationsList from '../../components/applications/ApplicationsList';
import ApplicationDetailsModal from '../../components/applications/ApplicationDetailsModal';
import { applications } from '../../utils/mockData';
import { RentalApplication } from '../../types';

const Applications = () => {
  const [applicationsData, setApplicationsData] = useState(applications);
  const [selectedApplication, setSelectedApplication] = useState<RentalApplication | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleViewApplication = (application: RentalApplication) => {
    setSelectedApplication(application);
    setIsDetailsModalOpen(true);
  };

  const handleApplicationDecision = (applicationId: string, decision: 'approved' | 'rejected', notes: string, conditions?: string[]) => {
    setApplicationsData(prev => prev.map(app => {
      // If approving this application, reject all others for the same unit
      if (decision === 'approved' && app.id === applicationId) {
        return {
          ...app,
          status: decision,
          review: {
            reviewedBy: 'Property Manager',
            reviewedAt: new Date().toISOString(),
            decision,
            notes,
            conditions
          }
        };
      }

      // Auto-reject other applications for the same unit when one is approved
      const approvedApp = prev.find(a => a.id === applicationId);
      if (decision === 'approved' &&
        approvedApp &&
        app.propertyId === approvedApp.propertyId &&
        app.unitNumber === approvedApp.unitNumber &&
        app.id !== applicationId &&
        app.status !== 'rejected') {
        return {
          ...app,
          status: 'rejected',
          review: {
            reviewedBy: 'System Auto-Rejection',
            reviewedAt: new Date().toISOString(),
            decision: 'rejected',
            notes: `Automatically rejected - Unit ${approvedApp.unitNumber} was awarded to another applicant.`,
          }
        };
      }

      // Handle direct rejection or other status updates
      if (app.id === applicationId && decision === 'rejected') {
        return {
          ...app,
          status: decision,
          review: {
            reviewedBy: 'Property Manager',
            reviewedAt: new Date().toISOString(),
            decision,
            notes,
            conditions
          }
        };
      }

      return app;
    }
    ));

    // Show notification for auto-rejections
    if (decision === 'approved') {
      const approvedApp = applicationsData.find(app => app.id === applicationId);
      const autoRejectedCount = applicationsData.filter(app =>
        app.propertyId === approvedApp?.propertyId &&
        app.unitNumber === approvedApp?.unitNumber &&
        app.id !== applicationId &&
        app.status !== 'rejected'
      ).length;

      if (autoRejectedCount > 0) {
        // In a real app, you'd show a toast notification here
        console.log(`${autoRejectedCount} other application(s) automatically rejected for this unit.`);
      }
    }
  };

  const handleStatusUpdate = (applicationId: string, status: RentalApplication['status']) => {
    setApplicationsData(prev => prev.map(app =>
      app.id === applicationId ? { ...app, status } : app
    ));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Rental Applications</h1>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            {applicationsData.filter(app => app.status === 'pending').length} pending applications
          </div>
        </div>
      </div>

      <ApplicationsList
        applications={applicationsData}
        onViewApplication={handleViewApplication}
        onStatusUpdate={handleStatusUpdate}
      />

      <ApplicationDetailsModal
        application={selectedApplication}
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedApplication(null);
        }}
        onDecision={handleApplicationDecision}
      />
    </div>
  );
};

export default Applications;