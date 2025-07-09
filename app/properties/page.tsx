'use client';

import React, { useEffect, useState } from 'react';
import PropertyList from '@/components/properties/PropertyList';
import PropertyForm from '@/components/properties/PropertyForm';
import UnitsModal from '@/components/properties/UnitsModal';
import { properties as initialProperties } from '@/utils/mockData';
import { Property, Unit } from '@/types';
import { getAllProperties, insertProperty, deleteProperty, getUnitsByPropertyId } from '@/services/supabaseService';

const Properties = () => {
  const [properties, setProperties] = useState(initialProperties);
  const [units, setUnits] = useState<Unit[]>([
    //   // Sample units for demonstration
    //   {
    //     id: '1',
    //     propertyId: '1',
    //     unitNumber: '12B',
    //     bedrooms: 2,
    //     bathrooms: 2,
    //     squareFeet: 1200,
    //     monthlyRent: 2500,
    //     status: 'occupied',
    //     tenantId: '1',
    //     tenantName: 'John Doe',
    //     leaseStart: '2023-06-01',
    //     leaseEnd: '2024-05-31',
    //     amenities: ['Balcony/Patio', 'Hardwood Floors', 'Dishwasher'],
    //     description: 'Beautiful 2-bedroom unit with hardwood floors and private balcony.',
    //     images: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg']
    //   },
    //   {
    //     id: '2',
    //     propertyId: '1',
    //     unitNumber: '8A',
    //     bedrooms: 1,
    //     bathrooms: 1,
    //     squareFeet: 800,
    //     monthlyRent: 2200,
    //     status: 'available',
    //     amenities: ['Walk-in Closet', 'Central Air', 'Updated Kitchen'],
    //     description: 'Cozy 1-bedroom unit with modern amenities and great natural light.',
    //     images: ['https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg']
    //   },
    //   {
    //     id: '3',
    //     propertyId: '2',
    //     unitNumber: '45A',
    //     bedrooms: 3,
    //     bathrooms: 2.5,
    //     squareFeet: 1500,
    //     monthlyRent: 3200,
    //     status: 'occupied',
    //     tenantId: '2',
    //     tenantName: 'Jane Smith',
    //     leaseStart: '2023-08-15',
    //     leaseEnd: '2024-08-14',
    //     amenities: ['Bay Windows', 'Fireplace', 'Granite Countertops'],
    //     description: 'Spacious 3-bedroom unit with ocean views and premium finishes.',
    //     images: ['https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg']
    //   }
  ]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isUnitsModalOpen, setIsUnitsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  useEffect(() => {
    fetchProperties();
  }, [])


  const handleAddProperty = async (formData: any) => {
    const newProperty = await insertProperty({
      property_name: formData.name,
      property_type: formData.propertyType,
      street_address: formData.address,
      description: formData.description,
      city: formData.city,
      states: formData.state,
      zip_code: formData.zipCode,
      amenities: formData.amenities || [],
      monthly_rent: formData.monthlyRent,
      property_image: formData.imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJUV3wqQOzLU4NwuFxKS12YFxsJcP5W61KOQ&s'
    });

    const formarttedProperty = {
      id: newProperty.id,
      name: `${newProperty.property_name}, ${newProperty.property_type}`,
      address: `${newProperty.street_address}, ${newProperty.city}, ${newProperty.states}, ${newProperty.zip_code}`,
      units: newProperty.number_of_units,
      occupied: 0,
      available: 0,
      monthlyRent: newProperty.monthly_rent,
      imageUrl: newProperty.property_image || 'https://www.pngkey.com/png/detail/266-2665301_jpg-freeuse-library-apartment-for-rent-clipart-house.png'
    }

    console.log(formarttedProperty)
    setProperties(prev => [...prev, formarttedProperty]);
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

      // setProperties(prev => prev.map(property =>
      //   property.id === editingProperty.id ? updatedProperty : property
      // ));
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

    console.log('======Getting Units=======');
    if (property) {
      const fetchedUnits = await getUnitsByPropertyId(property.id);
      if (Array.isArray(fetchedUnits)) {

        const formattedUnits = fetchedUnits.map((unit: any) => ({
          id: unit.id,
          propertyId: unit.property_id,
          unitNumber: unit.unit,
          bedrooms: unit.numberOfbedRooms,
          bathrooms: unit.numberBath,
          squareFeet: unit.squareFeet,
          monthlyRent: unit.monthlyRent,
          status: unit.status,
          tenantId: unit.tenant_id || null,
          tenantName: unit.name || null,
          leaseStart: unit.lease_start_date || null,
          leaseEnd: unit.lease_end_date || null,
          amenities: unit.amenities || [],
          description: unit.description || '',
          images: unit.unitImages || []
        }));

        setUnits(formattedUnits);
      } else {
        setUnits([]);
      }
      console.log('Fetched units:', fetchedUnits);
    }
    console.log('Selected Property:', property ? property.id : 'No property selected');
    setIsUnitsModalOpen(true);
  };

  const handleAddUnit = (propertyId: string, unitData: any) => {
    // const newUnit: Unit = {
    //   id: (units.length + 1).toString(),
    //   propertyId,
    //   unitNumber: unitData.unitNumber,
    //   bedrooms: unitData.bedrooms,
    //   bathrooms: unitData.bathrooms,
    //   squareFeet: unitData.squareFeet,
    //   monthlyRent: unitData.monthlyRent,
    //   status: unitData.status,
    //   amenities: unitData.amenities,
    //   description: unitData.description,
    //   images: unitData.images
    // };

    // setUnits(prev => [...prev, newUnit]);
  };

  const handleEditUnit = (unitId: string, unitData: any) => {
    // setUnits(prev => prev.map(unit =>
    //   unit.id === unitId
    //     ? {
    //       ...unit,
    //       unitNumber: unitData.unitNumber,
    //       bedrooms: unitData.bedrooms,
    //       bathrooms: unitData.bathrooms,
    //       squareFeet: unitData.squareFeet,
    //       monthlyRent: unitData.monthlyRent,
    //       status: unitData.status,
    //       amenities: unitData.amenities,
    //       description: unitData.description,
    //       images: unitData.images
    //     }
    //     : unit
    // ));
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProperty(null);
  };


  const fetchProperties = async () => {
    const properties = await getAllProperties();
    if (Array.isArray(properties)) {
      const formattedProperties = properties.map((property: any) => ({
        id: property.id,
        name: `${property.property_name}, ${property.property_type}`,
        address: `${property.street_address}, ${property.city}, ${property.states}, ${property.zip_code}`,
        units: property.number_of_units,
        occupied: 0,
        available: 0,
        monthlyRent: property.monthly_rent,
        imageUrl: property.property_image || 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg'
      }));
      // You can now use formattedProperties as needed
      //cast formattedProperties to Array

      setProperties([...formattedProperties]);
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