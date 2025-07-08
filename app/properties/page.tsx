'use client';

import React, { useState } from 'react';
import PropertyList from '@/components/properties/PropertyList';
import PropertyForm from '@/components/properties/PropertyForm';
import UnitsModal from '@/components/properties/UnitsModal';
import { properties as initialProperties } from '@/utils/mockData';
import { Property, Unit } from '@/types';

const Properties = () => {
  const [properties, setProperties] = useState(initialProperties);
  const [units, setUnits] = useState<Unit[]>([
    // Sample units for demonstration
    {
      id: '1',
      propertyId: '1',
      unitNumber: '12B',
      bedrooms: 2,
      bathrooms: 2,
      squareFeet: 1200,
      monthlyRent: 2500,
      status: 'occupied',
      tenantId: '1',
      tenantName: 'John Doe',
      leaseStart: '2023-06-01',
      leaseEnd: '2024-05-31',
      amenities: ['Balcony/Patio', 'Hardwood Floors', 'Dishwasher'],
      description: 'Beautiful 2-bedroom unit with hardwood floors and private balcony.',
      images: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg']
    },
    {
      id: '2',
      propertyId: '1',
      unitNumber: '8A',
      bedrooms: 1,
      bathrooms: 1,
      squareFeet: 800,
      monthlyRent: 2200,
      status: 'available',
      amenities: ['Walk-in Closet', 'Central Air', 'Updated Kitchen'],
      description: 'Cozy 1-bedroom unit with modern amenities and great natural light.',
      images: ['https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg']
    },
    {
      id: '3',
      propertyId: '2',
      unitNumber: '45A',
      bedrooms: 3,
      bathrooms: 2.5,
      squareFeet: 1500,
      monthlyRent: 3200,
      status: 'occupied',
      tenantId: '2',
      tenantName: 'Jane Smith',
      leaseStart: '2023-08-15',
      leaseEnd: '2024-08-14',
      amenities: ['Bay Windows', 'Fireplace', 'Granite Countertops'],
      description: 'Spacious 3-bedroom unit with ocean views and premium finishes.',
      images: ['https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg']
    }
  ]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isUnitsModalOpen, setIsUnitsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const handleAddProperty = (formData: any) => {
    const newProperty: Property = {
      id: (properties.length + 1).toString(),
      name: formData.name,
      address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
      units: formData.units,
      occupied: 0, // New property starts with 0 occupied units
      available: formData.units, // All units are available initially
      monthlyRent: formData.monthlyRent,
      imageUrl: formData.imageUrl || 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg'
    };

    setProperties(prev => [...prev, newProperty]);
  };

  const handleEditProperty = (formData: any) => {
    if (editingProperty) {
      const updatedProperty: Property = {
        ...editingProperty,
        name: formData.name,
        address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
        units: formData.units,
        monthlyRent: formData.monthlyRent,
        imageUrl: formData.imageUrl || editingProperty.imageUrl
      };

      setProperties(prev => prev.map(property =>
        property.id === editingProperty.id ? updatedProperty : property
      ));
    }
  };

  const handleFormSubmit = (formData: any) => {
    if (editingProperty) {
      handleEditProperty(formData);
    } else {
      handleAddProperty(formData);
    }
    setIsFormOpen(false);
    setEditingProperty(null);
  };

  const handleEditPropertyClick = (property: Property) => {
    setEditingProperty(property);
    setIsFormOpen(true);
  };

  const handleViewUnits = (property: Property) => {
    setSelectedProperty(property);
    setIsUnitsModalOpen(true);
  };

  const handleAddUnit = (propertyId: string, unitData: any) => {
    const newUnit: Unit = {
      id: (units.length + 1).toString(),
      propertyId,
      unitNumber: unitData.unitNumber,
      bedrooms: unitData.bedrooms,
      bathrooms: unitData.bathrooms,
      squareFeet: unitData.squareFeet,
      monthlyRent: unitData.monthlyRent,
      status: unitData.status,
      amenities: unitData.amenities,
      description: unitData.description,
      images: unitData.images
    };

    setUnits(prev => [...prev, newUnit]);
  };

  const handleEditUnit = (unitId: string, unitData: any) => {
    setUnits(prev => prev.map(unit =>
      unit.id === unitId
        ? {
          ...unit,
          unitNumber: unitData.unitNumber,
          bedrooms: unitData.bedrooms,
          bathrooms: unitData.bathrooms,
          squareFeet: unitData.squareFeet,
          monthlyRent: unitData.monthlyRent,
          status: unitData.status,
          amenities: unitData.amenities,
          description: unitData.description,
          images: unitData.images
        }
        : unit
    ));
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProperty(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Properties</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Property
        </button>
      </div>

      <PropertyList
        properties={properties}
        onViewUnits={handleViewUnits}
        onEditProperty={handleEditPropertyClick}
      />

      <PropertyForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        property={editingProperty}
      />

      <UnitsModal
        property={selectedProperty}
        units={units}
        isOpen={isUnitsModalOpen}
        onClose={() => {
          setIsUnitsModalOpen(false);
          setSelectedProperty(null);
        }}
        onAddUnit={handleAddUnit}
        onEditUnit={handleEditUnit}
      />
    </div>
  );
};

export default Properties;