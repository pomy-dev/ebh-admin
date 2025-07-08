import React from 'react';
import Image from 'next/image';
import { Eye, Edit } from 'lucide-react';
import { Property } from '@/types';

interface PropertyListProps {
  properties: Property[];
  onViewUnits: (property: Property) => void;
  onEditProperty: (property: Property) => void;
}

const PropertyList: React.FC<PropertyListProps> = ({ properties, onViewUnits, onEditProperty }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div key={property.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Property Header with Edit Button */}
          <div className="relative">
            <button
              onClick={() => onEditProperty(property)}
              className="absolute top-3 right-3 p-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-lg shadow-sm transition-all z-10"
              title="Edit property"
            >
              <Edit className="w-4 h-4 text-gray-600 hover:text-blue-600" />
            </button>
          </div>
          <Image
            src={property.imageUrl}
            alt={property.name}
            width={400}
            height={200}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800">{property.name}</h3>
            <p className="text-gray-600 mt-2">{property.address}</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Units</span>
                <span className="font-medium text-gray-400">{property.units}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Occupied</span>
                <span className="font-medium text-green-600">{property.occupied}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Available</span>
                <span className="font-medium text-blue-600">{property.available}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Rent</span>
                <span className="font-medium py-1 px-3 rounded-full bg-red-200 text-red-400">${property.monthlyRent}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex space-x-3">
                <button
                  onClick={() => onViewUnits(property)}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>Units</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;