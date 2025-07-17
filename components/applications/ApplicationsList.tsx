'use client';

import React, { useState, useMemo } from 'react';
import { RentalApplication } from '@/types';
import { 
  Filter, 
  Download, 
  FileText, 
 
  User, 
  Phone, 
  Mail, 
  MapPin, 

  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface ApplicationsListProps {
  applications: RentalApplication[];
  onViewApplication: (application: RentalApplication) => void;
  onStatusUpdate: (applicationId: string, status: RentalApplication['status']) => void;
}

const ApplicationsList: React.FC<ApplicationsListProps> = ({ 
  applications, 
  onViewApplication,
  onStatusUpdate 
}) => {
  const [filters, setFilters] = useState({
    property: '',
    status: '',
    priority: '',
    search: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'under-review':
        return <AlertCircle className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  // Get unique properties for filter dropdown
  const uniqueProperties = useMemo(() => {
    return [...new Set(applications.map(app => app.propertyName))];
  }, [applications]);

  // Filter applications based on current filters
  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      const matchesProperty = !filters.property || app.propertyName === filters.property;
      const matchesStatus = !filters.status || app.status === filters.status;
      const matchesPriority = !filters.priority || app.priority === filters.priority;
      const matchesSearch = !filters.search || 
        app.applicant.firstName.toLowerCase().includes(filters.search.toLowerCase()) ||
        app.applicant.lastName.toLowerCase().includes(filters.search.toLowerCase()) ||
        app.applicant.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        app.propertyName.toLowerCase().includes(filters.search.toLowerCase());

      return matchesProperty && matchesStatus && matchesPriority && matchesSearch;
    });
  }, [applications, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      property: '',
      status: '',
      priority: '',
      search: ''
    });
  };

  const handleQuickStatusUpdate = (e: React.MouseEvent, applicationId: string, status: RentalApplication['status']) => {
    e.stopPropagation();
    onStatusUpdate(applicationId, status);
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Property', 'Unit', 'Status', 'Priority', 'Income', 'Submitted Date'];
    const csvContent = [
      headers.join(','),
      ...filteredApplications.map(app => 
        [
          `${app.applicant.firstName} ${app.applicant.lastName}`,
          app.applicant.email,
          app.applicant.phone,
          app.propertyName,
          app.unitNumber || 'Any',
          app.status,
          app.priority,
          app.employment.monthlyIncome,
          new Date(app.submittedDate).toLocaleDateString()
        ].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rental-applications.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  return (
    <div className="space-y-6">
      {/* Filter and Export Controls */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <div className="w-4 h-4 flex flex-col space-y-1">
                  <div className="bg-current h-0.5 rounded"></div>
                  <div className="bg-current h-0.5 rounded"></div>
                  <div className="bg-current h-0.5 rounded"></div>
                </div>
              </button>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              
              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                  <button
                    onClick={exportToCSV}
                    className="w-full flex items-center space-x-2 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-green-600" />
                    <span>Export as CSV</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Search by name, email..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property</label>
              <select
                value={filters.property}
                onChange={(e) => handleFilterChange('property', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Properties</option>
                {uniqueProperties.map(property => (
                  <option key={property} value={property}>{property}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="under-review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={filters.priority}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div className="md:col-span-4 flex justify-end">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>Showing {filteredApplications.length} of {applications.length} applications</span>
        <div className="flex flex-wrap gap-4">
          <span className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span>{applications.filter(app => app.status === 'pending').length} Pending</span>
          </span>
          <span className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>{applications.filter(app => app.status === 'under-review').length} Under Review</span>
          </span>
          <span className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>{applications.filter(app => app.status === 'approved').length} Approved</span>
          </span>
          <span className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <span>{applications.filter(app => app.status === 'rejected').length} Rejected</span>
          </span>
          <span className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span>{applications.filter(app => app.review?.reviewedBy === 'System Auto-Rejection').length} Auto-Rejected</span>
          </span>
        </div>
      </div>

      {/* Applications Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredApplications.map((application) => (
            <div 
              key={application.id} 
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onViewApplication(application)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {application.applicant.firstName} {application.applicant.lastName}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                        {application.status.replace('-', ' ')}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(application.priority)}`}>
                        {application.priority} priority
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-1">
                  {application.status === 'pending' && (
                    <>
                      <button
                        onClick={(e) => handleQuickStatusUpdate(e, application.id, 'under-review')}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Mark as under review"
                      >
                        <AlertCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleQuickStatusUpdate(e, application.id, 'approved')}
                        className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                        title="Quick approve"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleQuickStatusUpdate(e, application.id, 'rejected')}
                        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Quick reject"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{application.applicant.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{application.applicant.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{application.propertyName} {application.unitNumber ? `- Unit ${application.unitNumber}` : ''}</span>
                </div>
              </div>

              {/* Application Details */}
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Monthly Income</span>
                  <span className="font-semibold text-gray-800">${application.employment.monthlyIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Move-in Date</span>
                  <span className="text-sm text-gray-800">
                    {new Date(application.additional.moveInDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Submitted</span>
                  <span className="text-sm text-gray-800">
                    {new Date(application.submittedDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Documents</span>
                  <span className="text-sm text-gray-800">{application.documents.length} files</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Eye className="w-4 h-4" />
                  <span>Review Application</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Income
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.map((application) => (
                <tr 
                  key={application.id} 
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => onViewApplication(application)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg mr-3">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {application.applicant.firstName} {application.applicant.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{application.applicant.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{application.propertyName}</div>
                    <div className="text-sm text-gray-500">
                      {application.unitNumber ? `Unit ${application.unitNumber}` : 'Any unit'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${application.employment.monthlyIncome.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(application.status)}
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(application.status)}`}>
                        {application.status.replace('-', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(application.submittedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewApplication(application);
                      }}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {filteredApplications.length === 0 && (
        <div className="text-center py-12">
          <div className="p-4 bg-gray-100 rounded-lg inline-block mb-4">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">No applications found matching your filters.</p>
        </div>
      )}
    </div>
  );
};

export default ApplicationsList;