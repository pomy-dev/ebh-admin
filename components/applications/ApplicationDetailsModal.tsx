'use client';

import React, { useState } from 'react';
import {
  X,
  User,
  Mail,
  Phone,
  Briefcase,
  DollarSign,
  FileText,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  Users,
  PawPrint,
} from 'lucide-react';
import { RentalApplication } from '@/types';
import DocumentViewerModal from './DocumentViewerModal';

interface ApplicationDetailsModalProps {
  application: RentalApplication | null;
  isOpen: boolean;
  onClose: () => void;
  onDecision: (applicationId: string, decision: 'approved' | 'rejected', notes: string, conditions?: string[]) => void;
}

const ApplicationDetailsModal: React.FC<ApplicationDetailsModalProps> = ({
  application,
  isOpen,
  onClose,
  onDecision
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showDecisionForm, setShowDecisionForm] = useState(false);
  const [decision, setDecision] = useState<'approved' | 'rejected'>('approved');
  const [notes, setNotes] = useState('');
  const [conditions, setConditions] = useState<string[]>([]);
  const [newCondition, setNewCondition] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [isDocumentViewerOpen, setIsDocumentViewerOpen] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'employment', label: 'Employment', icon: Briefcase },
    { id: 'references', label: 'References', icon: Users },
    { id: 'documents', label: 'Documents', icon: FileText }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'under-review':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddCondition = () => {
    if (newCondition.trim() && !conditions.includes(newCondition.trim())) {
      setConditions(prev => [...prev, newCondition.trim()]);
      setNewCondition('');
    }
  };

  const handleViewDocument = (document: any) => {
    setSelectedDocument(document);
    setIsDocumentViewerOpen(true);
  };

  const handleRemoveCondition = (condition: string) => {
    setConditions(prev => prev.filter(c => c !== condition));
  };

  const handleSubmitDecision = () => {
    if (application) {
      onDecision(application.id, decision, notes, conditions);
      setShowDecisionForm(false);
      setNotes('');
      setConditions([]);
      onClose();
    }
  };

  const calculateIncomeToRentRatio = () => {
    if (!application) return 0;
    // Assuming rent is based on property's monthly rent or unit-specific rent
    const estimatedRent = 2500; // This would come from property/unit data
    return (application.employment.monthlyIncome / estimatedRent).toFixed(1);
  };

  if (!isOpen || !application) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {application.applicant.firstName} {application.applicant.lastName}
              </h2>
              <div className="flex items-center space-x-3 mt-1">
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(application.status)}`}>
                  {application.status.replace('-', ' ')}
                </span>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getPriorityColor(application.priority)}`}>
                  {application.priority} priority
                </span>
                <span className="text-sm text-gray-500">
                  Submitted {new Date(application.submittedDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {(application.status === 'pending' || application.status === 'under-review') && (
              <button
                onClick={() => setShowDecisionForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Make Decision
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 items-center justify-evenly gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Income Ratio</p>
                      <p className="text-2xl font-semibold text-blue-800">{calculateIncomeToRentRatio()}x</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${Number(calculateIncomeToRentRatio()) >= 3
                      ? 'bg-green-100 text-green-800'
                      : Number(calculateIncomeToRentRatio()) >= 2.5
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                      }`}>
                      {Number(calculateIncomeToRentRatio()) >= 3 ? 'Excellent' :
                        Number(calculateIncomeToRentRatio()) >= 2.5 ? 'Good' : 'Below Standard'}
                    </span>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Documents</p>
                      <p className="text-2xl font-semibold text-purple-800">{application.documents.length}</p>
                    </div>
                    <FileText className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${application.documents.length >= 3
                      ? 'bg-green-100 text-green-800'
                      : application.documents.length >= 2
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                      }`}>
                      {application.documents.length >= 3 ? 'Complete' :
                        application.documents.length >= 2 ? 'Partial' : 'Incomplete'}
                    </span>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-600">Occupants</p>
                      <p className="text-2xl font-semibold text-orange-800">
                        {1 + application.additional.additionalOccupants.length}
                      </p>
                    </div>
                    <Users className="w-8 h-8 text-orange-600" />
                  </div>
                  <div className="mt-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                      {application.additional.additionalOccupants.length === 0 ? 'Single' :
                        `+${application.additional.additionalOccupants.length} Additional`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium text-gray-400">{application.applicant.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium text-gray-400">{application.applicant.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Date of Birth</p>
                        <p className="font-medium text-gray-400">
                          {new Date(application.applicant.dateOfBirth).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Emergency Contact</p>
                        <p className="font-medium text-gray-400">
                          {application.applicant.emergencyContact.name} ({application.applicant.emergencyContact.relationship})
                        </p>
                        <p className="text-sm text-gray-500">{application.applicant.emergencyContact.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Property & Move-in Details */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Property & Move-in Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Property</p>
                      <p className="font-medium text-gray-400">{application.propertyName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Unit Preference</p>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-gray-400">{application.unitNumber || 'Any available unit'}</p>
                        {application.unitNumber && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            Specific Unit
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Desired Move-in Date</p>
                      <p className="font-medium text-gray-400">
                        {new Date(application.additional.moveInDate).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {Math.ceil((new Date(application.additional.moveInDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days from now
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 text-gray-400">
                        {application.additional.pets.hasPets ? (
                          <PawPrint className="w-5 h-5 text-blue-600" />
                        ) : (
                          <div className="w-5 h-5" />
                        )}
                        <span className="text-sm">
                          {application.additional.pets.hasPets ? 'Has pets' : 'No pets'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Application Priority</p>
                      <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getPriorityColor(application.priority)}`}>
                        {application.priority} priority
                      </span>
                    </div>
                  </div>
                </div>

                {application.additional.pets.hasPets && application.additional.pets.petDetails && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">Pet Details:</p>
                    <p className="text-sm text-blue-800">{application.additional.pets.petDetails}</p>
                  </div>
                )}
              </div>

              {/* Additional Occupants */}
              {application.additional.additionalOccupants.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Occupants</h3>
                  <div className="space-y-3">
                    {application.additional.additionalOccupants.map((occupant, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div>
                          <p className="font-medium  text-gray-400">{occupant.name}</p>
                          <p className="text-sm text-gray-600">{occupant.relationship}</p>
                        </div>
                        <span className="text-sm text-gray-500">Age: {occupant.age}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'employment' && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Employment Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Employer</p>
                      <p className="font-medium text-gray-400">{application.employment.employer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Position</p>
                      <p className="font-medium text-gray-400">{application.employment.position}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Supervisor Contact</p>
                      <p className="font-medium text-gray-400">{application.employment.supervisorContact}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'references' && (
            <div className="space-y-4">
              {application.references.map((reference, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="font-medium text-lg text-gray-400">{reference.name}</p>
                      <p className="text-gray-600">{reference.relationship}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        {reference.contact.includes('@') ?
                          <Mail className="w-4 h-4 text-gray-400" /> :
                          <Phone className="w-4 h-4 text-gray-400" />
                        }
                        <span className="text-gray-400">{reference.contact}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-4">
              {application.documents.map((document) => (
                <div key={document.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-400">{document.name}</p>
                      <p className="text-sm text-gray-600 capitalize">{document.type} document</p>
                      <p className="text-xs text-gray-500">
                        Uploaded {new Date(document.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleViewDocument(document)}
                    className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Decision Form Modal */}
        {showDecisionForm && (
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">Make Application Decision</h3>
                  <div className="text-sm text-gray-600">
                    {application.unitNumber ? `Unit ${application.unitNumber}` : 'Any Unit'} • {application.propertyName}
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Warning for approval */}
                {decision === 'approved' && application.unitNumber && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800">Auto-Rejection Notice</h4>
                        <p className="text-sm text-yellow-700 mt-1">
                          Approving this application will automatically reject all other pending applications for Unit {application.unitNumber}.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Decision</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="decision"
                        value="approved"
                        checked={decision === 'approved'}
                        onChange={(e) => setDecision(e.target.value as 'approved' | 'rejected')}
                        className="text-green-600"
                      />
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-800 font-medium">Approve Application</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="decision"
                        value="rejected"
                        checked={decision === 'rejected'}
                        onChange={(e) => setDecision(e.target.value as 'approved' | 'rejected')}
                        className="text-red-600"
                      />
                      <XCircle className="w-5 h-5 text-red-600" />
                      <span className="text-red-800 font-medium">Reject Application</span>
                    </label>
                  </div>
                </div>

                {decision === 'approved' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Approval Conditions (Optional)
                    </label>
                    <div className="space-y-3">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newCondition}
                          onChange={(e) => setNewCondition(e.target.value)}
                          placeholder="Add a condition..."
                          className="flex-1 px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={handleAddCondition}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Add
                        </button>
                      </div>
                      {conditions.length > 0 && (
                        <div className="space-y-2">
                          {conditions.map((condition, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                              <span className="text-sm text-gray-400">{condition}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveCondition(condition)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4 p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowDecisionForm(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitDecision}
                  disabled={decision === 'rejected' && !notes.trim()}
                  className={`px-6 py-2 rounded-lg transition-colors ${decision === 'approved'
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-red-600 text-white hover:bg-red-700'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {decision === 'approved' ? 'Approve Application' : 'Reject Application'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <DocumentViewerModal
        document={selectedDocument}
        isOpen={isDocumentViewerOpen}
        onClose={() => {
          setIsDocumentViewerOpen(false);
          setSelectedDocument(null);
        }}
      />
    </div>
  );
};

export default ApplicationDetailsModal;