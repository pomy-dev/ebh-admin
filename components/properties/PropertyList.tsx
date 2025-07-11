import React from 'react';
import Image from 'next/image';
import { Eye, Edit, ArchiveX, Loader2 } from 'lucide-react';
import { Property } from '@/types';
import { ImSpinner2 } from "react-icons/im";

interface PropertyListProps {
  properties: Property[];
  onViewUnits: (property: Property) => void;
  onEditProperty: (property: Property) => void;
  onDeleteProperty: (property: Property) => void;
  isLoading: (property: Property) => boolean;
}

const PropertyList: React.FC<PropertyListProps> = ({ properties, onViewUnits, onEditProperty, onDeleteProperty, isLoading }) => {
  const isLoadingProperties = properties.length === 0;

  return (
    <>
      {
        isLoadingProperties ? (
          <div className="flex justify-center py-20 text-blue-600" >
            <Loader2 className="animate-spin w-6 h-6 mr-2" />
            <span>Loading Properties...</span>
          </div >
        )
          : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div key={property.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  {/* Property Header with Edit Button */}
                  <div className="relative flex items-center justify-between">
                    <button
                      onClick={() => onDeleteProperty(property)}
                      className="absolute top-3 right-12 p-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-lg shadow-sm transition-all z-10"
                      title="Delete property"
                    >
                      <ArchiveX className="w-4 h-4 text-red-600 hover:text-red-400" />
                    </button>
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
                        <span className="text-gray-600">Maintenance</span>
                        <span className="font-medium py-1 px-3 rounded-full bg-red-200 text-red-400">{property.maintenance}</span>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => onViewUnits(property)}
                          className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          {isLoading(property) ?
                            <ImSpinner2 className="w-4 h-4 animate-spin" /> :
                            <Eye className="w-4 h-4" />
                          }
                          <span>Units</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
      }
    </>
  );
};

export default PropertyList;