'use client';

import React, { useEffect, useState } from 'react';
import PropertyList from '@/components/properties/PropertyList';
import PropertyForm from '@/components/properties/PropertyForm';
import UnitsModal from '@/components/properties/UnitsModal';
import { Property, Unit } from '@/types';
import { insertUnit } from '@/services/supabaseService';
import { getAllProperties, insertProperty, deleteProperty, getUnitsByPropertyId, updateUnit, updateProperty } from '@/services/supabaseService';

const Properties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isUnitsModalOpen, setIsUnitsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, [])

  const handleAddProperty = async (formData: any) => {
    const newProperty = await insertProperty({
      property_name: formData.name,
      property_type: formData.propertyType,
      street_address: formData.address,
      city: formData.city,
      states: formData.state,
      zip_code: formData.zipCode,
      amenities: formData.amenities || [],
      rules: formData.rules || [],
      property_image: formData.imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJUV3wqQOzLU4NwuFxKS12YFxsJcP5W61KOQ&s'
    });

    const formarttedProperty = {
      id: newProperty.id,
      name: `${newProperty.property_name}, ${newProperty.property_type}`,
      address: `${newProperty.street_address}, ${newProperty.city}, ${newProperty.states}, ${newProperty.zip_code}`,
      units: 0,
      occupied: 0,
      available: 0,
      maintenance: 0,
      amenities: newProperty.amenities || [],
      imageUrl: newProperty.property_image || 'https://www.pngkey.com/png/detail/266-2665301_jpg-freeuse-library-apartment-for-rent-clipart-house.png'
    }

    console.log(formarttedProperty)
    setProperties(prev => [...prev, formarttedProperty]);
  };

  const handleEditProperty = async (formData: any) => {
    if (editingProperty) {
 
      const newProperty = await updateProperty(editingProperty.id, {
        updated_at: new Date().toISOString(),
        property_name: formData.name,
        property_type: formData.propertyType,
        street_address: formData.address,
        city: formData.city,
        states: formData.state,
        zip_code: formData.zipCode,
        amenities: formData.amenities || [],
        rules: formData.rules || [],
        property_image: formData.imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJUV3wqQOzLU4NwuFxKS12YFxsJcP5W61KOQ&s'
      });


      const updatedProperty: Property = {
        ...editingProperty,
        name:` ${formData.name}, ${formData.propertyType}`,
        amenities: formData.amenities || [],
        address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
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

  const handleDeletePropertyClick = async (property: Property) => {
    alert('Are you sure you want to delete this property? This action cannot be undone.');
    let error = await deleteProperty(property.id);
    if (error) {
      alert(`Error deleting property: ${error}`);
    }
    setProperties(prev => prev.filter(p => p.id !== property.id));
  };

  const handleViewUnits = async (property: Property) => {
    setSelectedProperty(property);
    setIsLoading(true);

    if (property) {
      const fetchedUnits = await getUnitsByPropertyId(property.id);
      if (Array.isArray(fetchedUnits)) {

        const formattedUnits = fetchedUnits.map((unit: any) => ({
          id: unit.id,
          propertyId: unit.property_id,
          unitNumber: unit.unit,
          bedrooms: unit.numberOfbedRooms,
          bathrooms: unit.numberOfBath,
          squareFeet: unit.squareFeet,
          monthlyRent: unit.monthly_rent,
          status: unit.status,
          tenantId: unit.tenant_id || null,
          tenantName: unit.name || null,
          leaseStart: unit.lease_start_date || null,
          leaseEnd: unit.lease_end_date || null,
          amenities: unit.properties.amenities || [],
          images: unit.unitImages || []
        }));

        setUnits(formattedUnits);
      } else {
        setUnits([]);
      }
    }
    setIsLoading(false);
    setIsUnitsModalOpen(true);
  };

  const handleAddUnit = async (propertyId: string, unitData: any) => {
    if (!propertyId) {
      alert('Issue Occurred: Property-ID could not be determined.');
      return;
    }

    const newUnit = await insertUnit({ propertyId, ...unitData })
    console.log('New Apartment Data:', newUnit);

    // get data from properties table
    if (!newUnit) return;

    const property = properties.find(p => p.id === newUnit.property_id);
    if (!property) {
      alert('Issue Occurred: Property not found.');
      return;
    }

    const formattedUnit = {
      id: newUnit.id,
      propertyId: newUnit.property_id,
      unitNumber: newUnit.unit,
      bedrooms: newUnit.numberOfbedRooms,
      bathrooms: newUnit.numberOfBath,
      squareFeet: newUnit.squareFeet,
      monthlyRent: newUnit.monthly_rent,
      status: newUnit.status,
      tenantId: newUnit.tenant_id || null,
      tenantName: newUnit.name || null,
      leaseStart: newUnit.lease_start_date || null,
      leaseEnd: newUnit.lease_end_date || null,
      amenities: property.amenities || [],
      images: newUnit.unitImages || []
    };

    setUnits(prev => [...prev, formattedUnit]);
  };

  const handleEditUnit = (unitId: string, unitData: any) => {
    
    
    
    setUnits(prev => prev.map(unit =>
      unit.id === unitId
        ? {
          ...unit,
          unitNumber: (updatedUnit as any).unit,
          bedrooms: (updatedUnit as any).numberOfbedRooms,
          bathrooms: (updatedUnit as any).numberOfBath,
          squareFeet: (updatedUnit as any).squareFeet,
          monthlyRent: (updatedUnit as any).monthly_rent,
          status: (updatedUnit as any).status,
          images: (updatedUnit as any).unitImages
        }
        : unit
    ));
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProperty(null);
  };

  const fetchProperties = async () => {
    const properties = await getAllProperties();

    if (!properties) {
      console.error('Failed to fetch properties');
      return;
    }

    if (Array.isArray(properties)) {

      // get apartment units using property id
      for (const property of properties) {
        // Fetch units for each property
        const unitsData = await getUnitsByPropertyId(property.id);

        if (!unitsData) {
          console.error(`Failed to fetch units for property ID ${property.id}`);
          continue; // Skip this property if units cannot be fetched
        }

        let totalUnits = 0;
        let occupiedUnits = 0;
        let availableUnits = 0;
        let onMaintenanceUnits = 0;

        if (Array.isArray(unitsData)) {
          totalUnits = unitsData.length; // Assuming unitsData is an array of units
          occupiedUnits = unitsData.filter((unit: any) => unit.status === 'occupied').length;
          availableUnits = unitsData.filter((unit: any) => unit.status === 'available').length;
          onMaintenanceUnits = unitsData.filter((unit: any) => unit.status === 'maintenance').length;
        }

        const formattedProperty = {
          id: property.id,
          name: `${property.property_name}, ${property.property_type}`,
          address: `${property.street_address}, ${property.city}, ${property.states}, ${property.zip_code}`,
          units: totalUnits,
          occupied: occupiedUnits,
          available: availableUnits,
          maintenance: onMaintenanceUnits, // Assuming maintenance is a field in the property
          amenities: property.amenities || [],
          rules: property.rules || [],
          imageUrl: property.property_image || 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg'
        };

        setProperties(prev => {
          if (prev.some(p => p.id === formattedProperty.id)) return prev;
          return [...prev, formattedProperty];
        });

        // setProperties(prev => [...prev, formattedProperty]);
      }

    } else {
      // Handle the error case here (properties is a PostgrestError)
      console.error('Failed to fetch properties:', properties);
    }
  }

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
        onDeleteProperty={handleDeletePropertyClick}
        isLoading={(property: Property) => isLoading && selectedProperty?.id === property.id}
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