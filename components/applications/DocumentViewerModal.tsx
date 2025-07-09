'use client';

import React, { useState } from 'react';
import { X, FileText, Image as ImageIcon, File, ZoomIn, ZoomOut, RotateCw, Download } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'id' | 'income' | 'reference' | 'credit' | 'other';
  url: string;
  uploadedAt: string;
}

interface DocumentViewerModalProps {
  document: Document | null;
  isOpen: boolean;
  onClose: () => void;
}

const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({ document, isOpen, onClose }) => {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  const getFileIcon = (type: string, fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension || '')) {
      return <ImageIcon className="w-6 h-6 text-blue-600" />;
    } else if (['pdf'].includes(extension || '')) {
      return <FileText className="w-6 h-6 text-red-600" />;
    } else {
      return <File className="w-6 h-6 text-gray-600" />;
    }
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'id':
        return 'bg-blue-100 text-blue-800';
      case 'income':
        return 'bg-green-100 text-green-800';
      case 'reference':
        return 'bg-purple-100 text-purple-800';
      case 'credit':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isImage = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension || '');
  };

  const isPDF = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return extension === 'pdf';
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const resetView = () => {
    setZoom(100);
    setRotation(0);
  };

  React.useEffect(() => {
    if (isOpen) {
      resetView();
    }
  }, [isOpen, document]);

  if (!isOpen || !document) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            {getFileIcon(document.type, document.name)}
            <div>
              <h2 className="text-xl font-bold text-gray-800">{document.name}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getFileTypeColor(document.type)}`}>
                  {document.type} document
                </span>
                <span className="text-sm text-gray-500">
                  Uploaded {new Date(document.uploadedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Zoom and Rotation Controls for Images */}
            {isImage(document.name) && (
              <>
                <button
                  onClick={handleZoomOut}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                <span className="text-sm text-gray-600 min-w-[3rem] text-center">{zoom}%</span>
                <button
                  onClick={handleZoomIn}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
                <button
                  onClick={handleRotate}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Rotate"
                >
                  <RotateCw className="w-5 h-5" />
                </button>
                <div className="w-px h-6 bg-gray-300 mx-2"></div>
              </>
            )}

            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-gray-100 p-6">
          <div className="flex items-center justify-center min-h-full">
            {isImage(document.name) ? (
              <div className="max-w-full max-h-full">
                <img
                  src={`https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg`} // Mock image for demo
                  alt={document.name}
                  className="max-w-full max-h-full object-contain shadow-lg rounded-lg"
                  style={{
                    transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                    transition: 'transform 0.3s ease'
                  }}
                />
              </div>
            ) : isPDF(document.name) ? (
              <div className="w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
                {/* PDF Viewer */}
                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                  <div className="text-center p-8">
                    <p className="text-gray-600 mb-4">{document.name}</p>

                    {/* Mock PDF Preview */}
                    <div className="bg-white border border-gray-300 rounded-lg p-8 max-w-2xl mx-auto shadow-sm">
                      <div className="space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-8 bg-gray-100 rounded w-full my-6"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 mt-4">
                      PDF preview - This file is undownloadable!
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center p-8">
                <div className="p-4 bg-gray-100 rounded-lg inline-block mb-4">
                  <File className="w-12 h-12 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Document Preview</h3>
                <p className="text-gray-600 mb-4">{document.name}</p>
                <p className="text-sm text-gray-500">
                  This file type cannot be previewed. It is not PDF.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer with Document Info */}
        <div className="border-t border-gray-200 bg-gray-50 p-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span><strong>File:</strong> {document.name}</span>
              <span><strong>Type:</strong> {document.type}</span>
              <span><strong>Uploaded:</strong> {new Date(document.uploadedAt).toLocaleString()}</span>
            </div>
            {isImage(document.name) && (
              <button
                onClick={resetView}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Reset View
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewerModal;