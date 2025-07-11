'use client';

import React, { useState } from 'react';
import { X, Upload, MapPin, Building, DollarSign, Home } from 'lucide-react';
import { Property } from '@/types';

interface PropertyFormData {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType: string;
  amenities: string[];
  rules: string[];
  imageUrl: string;
}

interface PropertyFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PropertyFormData) => void;
  property?: Property | null;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ isOpen, onClose, onSubmit, property }) => {
  const [formData, setFormData] = useState<PropertyFormData>({
    name: property?.name || '',
    address: property?.address?.split(',')[0] || '',
    city: property?.address?.split(',')[1]?.trim() || '',
    state: property?.address?.split(',')[2]?.trim()?.split(' ')[0] || '',
    zipCode: property?.address?.split(',')[2]?.trim()?.split(' ')[1] || '',
    propertyType: 'apartment',
    rules: [],
    amenities: [],
    imageUrl: property?.imageUrl || ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof PropertyFormData, string>>>({});
  const propertyTypes = [
    { value: 'Apartment', label: 'Apartment Complex' },
    { value: 'Condo', label: 'Condominium' },
    { value: 'Townhouse', label: 'Townhouse' },
    { value: 'Single-family', label: 'Single Family Home' },
    { value: 'Duplex', label: 'Duplex' }
  ];
  const availableAmenities = [
    'Swimming Pool', 'Gym/Fitness Center', 'Parking Garage', 'Laundry Facility',
    'Pet Friendly', 'Balcony/Patio', 'Air Conditioning', 'Dishwasher',
    'In-Unit Washer/Dryer', 'Elevator', 'Security System', 'Concierge'
  ];
  const [newRule, setNewRule] = useState('');

  React.useEffect(() => {
    if (property && isOpen) {
      const addressParts = property.address.split(',');
      const stateZip = addressParts[2]?.trim().split(' ') || [];

      setFormData({
        name: property.name,
        address: addressParts[0] || '',
        city: addressParts[1]?.trim() || '',
        state: stateZip[0] || '',
        zipCode: stateZip[1] || '',
        propertyType: 'apartment',
        rules: property.rules || [],
        amenities: [],
        imageUrl: property.imageUrl
      });
    } else if (!property && isOpen) {
      setFormData({
        name: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        propertyType: 'apartment',
        rules: [],
        amenities: [],
        imageUrl: ''
      });
    }
    setErrors({});
  }, [property, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        name === 'units' || name === 'monthlyRent'
          ? value === '' ? '' : Number(value)
          : value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof PropertyFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Partial<Record<keyof PropertyFormData, string>>> = {};

    if (!formData.name.trim()) newErrors.name = 'Property name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  const handleAddRule = () => {
    if (newRule.trim() && !formData.rules.includes(newRule.trim())) {
      setFormData(prev => ({
        ...prev,
        rules: [...prev.rules, newRule]
      }));
      setNewRule('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {property ? 'Edit Property' : 'Add New Property'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Home className="w-5 h-5 mr-2 text-blue-600" />
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 placeholder-gray-400 placeholder-opacity-50 text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="e.g., Sunset Apartments"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type *
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 placeholder-gray-400 placeholder-opacity-50 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {propertyTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-600" />
              Location
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 placeholder-gray-400 placeholder-opacity-50 text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="123 Main Street"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 placeholder-gray-400 placeholder-opacity-50 text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Los Angeles"
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 placeholder-gray-400 placeholder-opacity-50 text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.state ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="CA"
                />
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 placeholder-gray-400 placeholder-opacity-50 text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.zipCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="90210"
                />
                {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {availableAmenities.map(amenity => (
                <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* add rules to state array */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">Property Rules</h3>
            <div className='flex space-x-2'>
              <input
                name="rules"
                value={newRule}
                onChange={(e) => setNewRule(e.target.value)}
                className="flex-1 px-4 py-3 placeholder-gray-400 placeholder-opacity-50 text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all border-gray-300"
                placeholder="Enter property rules"
              />
              {/* add button */}
              <button
                type="button"
                onClick={handleAddRule}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Set Rule
              </button>
            </div>
            {/* preview rules added */}
            {formData.rules.length > 0 ?
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {formData.rules.map((rule, index) => (
                  <li key={index} className="flex justify-between px-2 py-1 text-md bg-blue-200 rounded-lg text-gray-600">
                    {rule}
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        rules: prev.rules.filter((_, i) => i !== index)
                      }))}
                      className="text-red-600 bg-red-200 rounded-full px-2 items-center justify-center text-lg hover:text-red-800"
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul> :
              <p className="text-sm text-gray-500">
                Add rules for the property, such as "No smoking", "Pet restrictions", etc.
              </p>}
          </div>

          {/* Image Upload */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Upload className="w-5 h-5 mr-2 text-blue-600" />
              Property Image
            </h3>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFormData(prev => ({
                        ...prev,
                        imageUrl: reader.result as string, // base64 image preview
                      }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="w-full text-gray-400 placeholder-gray-300 px-4 py-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
              />
              {formData.imageUrl ? (
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-[200px] h-[200px] object-cover rounded mt-2"
                />
              ) : (<p className="text-sm text-gray-500 mt-1">
                Provide a URL to an image of the property. If left empty, a default image will be used.
              </p>)}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {property ? 'Update Property' : 'Add Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm;