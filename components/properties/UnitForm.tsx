'use client';

import React, { useState } from 'react';
import { X, Home, Bed, Bath, Maximize, Image as ImageIcon, DollarSign } from 'lucide-react';
import { Unit } from '@/types';
import { ImSpinner2 } from "react-icons/im";

interface UnitFormData {
  unitNumber: string;
  bedrooms: number;
  bathrooms: number;
  monthlyRent: number;
  squareFeet: number;
  status: 'available' | 'occupied' | 'maintenance';
  images: any[];
}

interface UnitFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UnitFormData) => void;
  isSubmitting?: boolean;
  propertyName: string;
  unit?: Unit | null;
}

const UnitForm: React.FC<UnitFormProps> = ({ isOpen, onClose, onSubmit, isSubmitting, propertyName, unit }) => {
  const [formData, setFormData] = useState<UnitFormData>({
    unitNumber: unit?.unitNumber || '',
    bedrooms: unit?.bedrooms || 1,
    bathrooms: unit?.bathrooms || 1,
    squareFeet: unit?.squareFeet || 0,
    monthlyRent: unit?.monthlyRent || 0,
    status: unit?.status || 'available',
    images: unit?.images || []
  });
  const [errors, setErrors] = useState<Partial<Record<keyof UnitFormData, string>>>({});
  const [newImageUrl, setNewImageUrl] = useState('');

  React.useEffect(() => {
    if (unit && isOpen) {
      setFormData({
        unitNumber: unit.unitNumber,
        bedrooms: unit.bedrooms,
        bathrooms: unit.bathrooms,
        squareFeet: unit.squareFeet,
        monthlyRent: unit.monthlyRent,
        status: unit.status,
        images: unit.images
      });
    } else if (!unit && isOpen) {
      setFormData({
        unitNumber: '',
        bedrooms: 1,
        bathrooms: 1,
        squareFeet: 0,
        monthlyRent: 0,
        status: 'available',
        images: []
      });
    }
    setErrors({});
    setNewImageUrl('');
  }, [unit, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['bedrooms', 'bathrooms', 'squareFeet', 'monthlyRent'].includes(name)
        ? value === '' ? 0 : Number(value)
        : value
    }));

    if (errors[name as keyof UnitFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleRemoveImage = (imageUrl: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img !== imageUrl)
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Partial<Record<keyof UnitFormData, string>>> = {};

    if (!formData.unitNumber.trim()) newErrors.unitNumber = 'Unit number is required';
    if (formData.bedrooms < 0) newErrors.bedrooms = 'Bedrooms must be 0 or greater';
    if (formData.bathrooms < 1) newErrors.bathrooms = 'Must have at least 1 bathroom';
    if (formData.monthlyRent <= 0) newErrors.monthlyRent = 'Rent price cannot be E00.00';
    if (formData.squareFeet <= 0) newErrors.squareFeet = 'Square feet must be greater than 0';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
    setNewImageUrl('');
    setFormData({
      unitNumber: '',
      bedrooms: 1,
      bathrooms: 1,
      squareFeet: 0,
      monthlyRent: 0,
      status: 'available',
      images: []
    })
    setTimeout(() => { onClose() }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Home className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {unit ? 'Edit Unit' : 'Add New Unit'}
              </h2>
              <p className="text-gray-600">{propertyName}</p>
            </div>
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
              Unit Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit Number *
                </label>
                <input
                  type="text"
                  name="unitNumber"
                  value={formData.unitNumber}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-gray-400 placeholder-opacity-50 text-gray-800 focus:border-transparent transition-all ${errors.unitNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="e.g., 12B, A-101"
                />
                {errors.unitNumber && <p className="text-red-500 text-sm mt-1">{errors.unitNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 placeholder-gray-400 placeholder-opacity-50 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="maintenance">Under Maintenance</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Rent *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    name="monthlyRent"
                    value={formData.monthlyRent}
                    onChange={handleInputChange}
                    min="0"
                    className={`w-full pl-12 pr-4 py-3 placeholder-gray-400 placeholder-opacity-50 text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.bedrooms ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                </div>
                {errors.monthlyRent && <p className="text-red-500 text-sm mt-1">{errors.monthlyRent}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bedrooms *
                </label>
                <div className="relative">
                  <Bed className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    min="0"
                    className={`w-full pl-12 pr-4 py-3 placeholder-gray-400 placeholder-opacity-50 text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.bedrooms ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                </div>
                {errors.bedrooms && <p className="text-red-500 text-sm mt-1">{errors.bedrooms}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bathrooms *
                </label>
                <div className="relative">
                  <Bath className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    min="1"
                    className={`w-full pl-12 pr-4 py-3 placeholder-gray-400 placeholder-opacity-50 text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.bathrooms ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                </div>
                {errors.bathrooms && <p className="text-red-500 text-sm mt-1">{errors.bathrooms}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Square Feet *
                </label>
                <div className="relative">
                  <Maximize className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    name="squareFeet"
                    value={formData.squareFeet}
                    onChange={handleInputChange}
                    min="1"
                    className={`w-full pl-12 pr-4 py-3 placeholder-gray-400 placeholder-opacity-50 text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.squareFeet ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="800"
                  />
                </div>
                {errors.squareFeet && <p className="text-red-500 text-sm mt-1">{errors.squareFeet}</p>}
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <ImageIcon className="w-5 h-5 mr-2 text-blue-600" />
              Unit Images
            </h3>

            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="file"
                  value={newImageUrl}
                  accept="image/*"
                  id="unit-image-upload"
                  onChange={async (e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      setFormData(prev => ({
                        ...prev,
                        images: [...prev.images, file]
                      }));
                      setNewImageUrl(e.target.value)
                    }
                    setTimeout(() => { setNewImageUrl('') }, 1000);
                  }}
                  className="flex-1 px-4 py-3 border placeholder-gray-400 placeholder-opacity-50 text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparentfile:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
                  placeholder="Enter image URL..."
                />
              </div>

              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.images.map((file, index) => {
                    // Use URL.createObjectURL for local file previews
                    let localUrl = '';

                    if (file.startsWith('https://')) {
                      localUrl = file;
                    } else {
                      localUrl = URL.createObjectURL(file);
                    }

                    return (
                      <div key={index} className="relative group">
                        <img
                          src={localUrl}
                          alt={`Unit image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(file)}
                          className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
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
              {isSubmitting ? <ImSpinner2 className='w-4 h-4 animate-spin' /> : unit ? 'Update Unit' : 'Add Unit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UnitForm;