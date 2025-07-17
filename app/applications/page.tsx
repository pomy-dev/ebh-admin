'use client';

import React, { useState, useEffect } from 'react';
import ApplicationsList from '../../components/applications/ApplicationsList';
import ApplicationDetailsModal from '../../components/applications/ApplicationDetailsModal';
import { applications } from '../../utils/mockData';
import { RentalApplication } from '../../types';
import { fetchApplicationsWithProperties, makeDecition } from '../../services/supabaseApartmentService';

const Applications = () => {
  const [applicationsData, setApplicationsData] = useState(applications);
  const [selectedApplication, setSelectedApplication] = useState<RentalApplication | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const apps = await fetchApplicationsWithProperties();
        setApplicationsData(apps);
      } catch (err) {
        console.error('Failed to fetch applications:', err);
      }
    };

    fetchApartments();
  }, []);



  const handleViewApplication = (application: RentalApplication) => {
    setSelectedApplication(application);
    setIsDetailsModalOpen(true);
  };



  const handleApplicationDecision = async (
    applicationId: string,
    decision: "approved" | "rejected" | "pending" | "under-review",
    notes: string,
    conditions?: string[]
  ) => {
    // 1. Make decision in Supabase
    const { data, error } = await makeDecition(applicationId, decision, conditions);
    if (error) {
      console.error("Failed to update decision:", error.message);
      return;
    }

    // 2. Update frontend state
    setApplicationsData(prev => {
      const updatedApp = prev.find(app => app.id === applicationId);
      const propertyId = updatedApp?.propertyId;
      const unitNumber = updatedApp?.unitNumber;

      return prev.map(app => {
        // Approve the selected application
        if (app.id === applicationId) {
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

        // Auto-reject other applications for the same unit
        if (
          decision === 'approved' &&
          app.id !== applicationId &&
          app.propertyId === propertyId &&
          app.unitNumber === unitNumber &&
          app.status !== 'rejected'
        ) {
          return {
            ...app,
            status: 'rejected',
            review: {
              reviewedBy: 'System Auto-Rejection',
              reviewedAt: new Date().toISOString(),
              decision: 'rejected',
              notes: `Automatically rejected - Unit ${unitNumber} was awarded to another applicant.`
            }
          };
        }

        // For rejection, only update the one rejected
        return app;
      });
    });

  };


  const handleStatusUpdate = (applicationId: string, status: RentalApplication['status']) => {
    setApplicationsData(prev => prev.map(app =>
      app.id === applicationId ? { ...app, status } : app
    ));
    handleApplicationDecision(
      applicationId,
      status,
      '',
      []
    );

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