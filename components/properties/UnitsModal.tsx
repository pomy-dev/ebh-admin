'use client';

import React, { useState } from 'react';
import { X, Home, Bed, Bath, Maximize, DollarSign, Plus, Edit, Eye, User, Calendar } from 'lucide-react';
import { Unit, Property } from '@/types';
import UnitForm from './UnitForm';

interface UnitsModalProps {
  property: Property | null;
  units: Unit[];
  isOpen: boolean;
  onClose: () => void;
  onAddUnit: (propertyId: string, unitData: any) => void;
  onEditUnit: (unitId: string, unitData: any) => void;
}

const UnitsModal: React.FC<UnitsModalProps> = ({
  property,
  units,
  isOpen,
  onClose,
  onAddUnit,
  onEditUnit
}) => {
  const [isUnitFormOpen, setIsUnitFormOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'occupied':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <Home className="w-4 h-4" />;
      case 'occupied':
        return <User className="w-4 h-4" />;
      case 'maintenance':
        return <Calendar className="w-4 h-4" />;
      default:
        return <Home className="w-4 h-4" />;
    }
  };

  const handleAddUnit = () => {
    setEditingUnit(null);
    setIsUnitFormOpen(true);
  };

  const handleEditUnit = (unit: Unit) => {
    setEditingUnit(unit);
    setIsUnitFormOpen(true);
  };

  const handleUnitFormSubmit = (unitData: any) => {
    if (property) {
      if (editingUnit) {
        onEditUnit(editingUnit.id, unitData);
      } else {
        onAddUnit(property.id, unitData);
      }
    }
    setIsUnitFormOpen(false);
    setEditingUnit(null);
  };

  const handleUnitFormClose = () => {
    setIsUnitFormOpen(false);
    setEditingUnit(null);
  };

  if (!isOpen || !property) return null;

  const propertyUnits = units.filter(unit => unit.propertyId === property.id);
  const availableUnits = propertyUnits.filter(unit => unit.status === 'available').length;
  const occupiedUnits = propertyUnits.filter(unit => unit.status === 'occupied').length;
  const maintenanceUnits = propertyUnits.filter(unit => unit.status === 'maintenance').length;

  return (
    <>
      <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Home className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Units Management</h2>
                <p className="text-gray-600">{property.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleAddUnit}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Unit</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Units</p>
                    <p className="text-2xl font-semibold text-gray-800">{propertyUnits.length}</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Home className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Available</p>
                    <p className="text-2xl font-semibold text-green-600">{availableUnits}</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Home className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Occupied</p>
                    <p className="text-2xl font-semibold text-blue-600">{occupiedUnits}</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Maintenance</p>
                    <p className="text-2xl font-semibold text-yellow-600">{maintenanceUnits}</p>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* View Toggle */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                Units ({propertyUnits.length})
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
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
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                  <div className="w-4 h-4 flex flex-col space-y-1">
                    <div className="bg-current h-0.5 rounded"></div>
                    <div className="bg-current h-0.5 rounded"></div>
                    <div className="bg-current h-0.5 rounded"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Units Content */}
          <div className="p-6 overflow-y-auto max-h-[40vh]">
            {propertyUnits.length === 0 ? (
              <div className="text-center py-12">
                <div className="p-4 bg-gray-100 rounded-lg inline-block mb-4">
                  <Home className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 mb-4">No units added to this property yet.</p>
                <button
                  onClick={handleAddUnit}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add First Unit
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {propertyUnits.map((unit) => (
                  <div key={unit.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    {/* Unit Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">Unit {unit.unitNumber}</h4>
                        <div className="flex items-center space-x-1 mt-1">
                          {getStatusIcon(unit.status)}
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(unit.status)}`}>
                            {unit.status}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleEditUnit(unit)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Unit Details */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1 text-gray-600">
                          <Bed className="w-4 h-4" />
                          <span>{unit.bedrooms} bed</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-600">
                          <Bath className="w-4 h-4" />
                          <span>{unit.bathrooms} bath</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-600">
                          <Maximize className="w-4 h-4" />
                          <span>{unit.squareFeet} sq ft</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Monthly Rent</span>
                        <span className="font-semibold text-gray-800">${unit.monthlyRent.toLocaleString()}</span>
                      </div>

                      {unit.tenantName && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Tenant</span>
                          <span className="text-sm text-gray-800">{unit.tenantName}</span>
                        </div>
                      )}

                      {unit.leaseEnd && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Lease Ends</span>
                          <span className="text-sm text-gray-800">
                            {new Date(unit.leaseEnd).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Unit Images */}
                    {unit.images.length > 0 && (
                      <div className="mt-4">
                        <img
                          src={unit.images[0]}
                          alt={`Unit ${unit.unitNumber}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        {unit.images.length > 1 && (
                          <p className="text-xs text-gray-500 mt-1">
                            +{unit.images.length - 1} more image{unit.images.length > 2 ? 's' : ''}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Amenities Preview */}
                    {unit.amenities.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs text-gray-500 mb-2">Amenities:</p>
                        <div className="flex flex-wrap gap-1">
                          {unit.amenities.slice(0, 3).map((amenity, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
                              {amenity}
                            </span>
                          ))}
                          {unit.amenities.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
                              +{unit.amenities.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {propertyUnits.map((unit) => (
                  <div key={unit.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h4 className="font-semibold text-gray-800">Unit {unit.unitNumber}</h4>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                            <span className="flex items-center space-x-1">
                              <Bed className="w-4 h-4" />
                              <span>{unit.bedrooms} bed</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Bath className="w-4 h-4" />
                              <span>{unit.bathrooms} bath</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Maximize className="w-4 h-4" />
                              <span>{unit.squareFeet} sq ft</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold text-gray-800">${unit.monthlyRent.toLocaleString()}/mo</p>
                          {unit.tenantName && (
                            <p className="text-sm text-gray-600">{unit.tenantName}</p>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(unit.status)}`}>
                            {unit.status}
                          </span>
                          <button
                            onClick={() => handleEditUnit(unit)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <UnitForm
        isOpen={isUnitFormOpen}
        onClose={handleUnitFormClose}
        onSubmit={handleUnitFormSubmit}
        propertyName={property.name}
        unit={editingUnit}
      />
    </>
  );
};

export default UnitsModal;