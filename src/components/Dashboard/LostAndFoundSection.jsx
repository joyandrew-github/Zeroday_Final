import React, { useState } from 'react';
import { Plus, Filter, MapPin, Image as ImageIcon, Eye, Save, X, Clock, Package, Upload } from 'lucide-react';

const LostAndFoundSection = ({
  lostFoundItems,
  lostFoundFilter,
  setLostFoundFilter,
  showLostFoundForm,
  setShowLostFoundForm,
  lostFoundForm,
  setLostFoundForm,
  handleLostFoundSubmit,
  categories
}) => {
  // State for image preview
  const [imagePreview, setImagePreview] = useState(null);

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLostFoundForm({ ...lostFoundForm, image: file });
      // Generate preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setLostFoundForm({ ...lostFoundForm, image: null });
      setImagePreview(null);
    }
  };

  // Clean up preview URL when modal closes
  const handleCloseModal = () => {
    setShowLostFoundForm(false);
    setImagePreview(null);
    URL.revokeObjectURL(imagePreview); // Prevent memory leaks
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Lost & Found</h2>
          <p className="text-gray-600 mt-1">Report or search for lost/found items</p>
        </div>
        <button
          onClick={() => setShowLostFoundForm(true)}
          className="mt-4 sm:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Item</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-4 mb-4">
          <Filter size={20} className="text-gray-500" />
          <span className="font-medium text-gray-700">Filters</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={lostFoundFilter.type}
            onChange={(e) => setLostFoundFilter({ ...lostFoundFilter, type: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Types</option>
            <option value="lost">Lost Items</option>
            <option value="found">Found Items</option>
          </select>
          <select
            value={lostFoundFilter.category}
            onChange={(e) => setLostFoundFilter({ ...lostFoundFilter, category: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            value={lostFoundFilter.status}
            onChange={(e) => setLostFoundFilter({ ...lostFoundFilter, status: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="claimed">Claimed</option>
          </select>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lostFoundItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  item.type === 'lost' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}
              >
                {item.type === 'lost' ? 'Lost' : 'Found'}
              </div>
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  item.status === 'active' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {item.status}
              </div>
            </div>

            <div className="mb-4">
              {item.image ? (
                <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded-lg" />
              ) : (
                <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                  <ImageIcon size={40} className="text-gray-400" />
                </div>
              )}
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-gray-600 mb-3">{item.description}</p>

            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>{item.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>{new Date(item.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Package size={16} />
                <span>{item.category}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <Eye size={16} />
                <span>View Details</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Item Modal */}
      {showLostFoundForm && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(134, 133, 133, 0.25), rgba(100, 100, 100, 0.05))',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            zIndex: 100, // Increased z-index to ensure modal is above sidebar
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
        >
          <div
            className="bg-white rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto"
            style={{
              scrollbarWidth: 'none', // Firefox: Hide scrollbar
              msOverflowStyle: 'none', // IE/Edge: Hide scrollbar
            }}
          >
            <style>
              {`
                .no-scrollbar::-webkit-scrollbar {
                  display: none; /* Chrome, Safari: Hide scrollbar */
                }
              `}
            </style>
            <div className="no-scrollbar">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Add Lost/Found Item</h3>
              <form onSubmit={handleLostFoundSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={lostFoundForm.type}
                    onChange={(e) => setLostFoundForm({ ...lostFoundForm, type: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="lost">Lost Item</option>
                    <option value="found">Found Item</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={lostFoundForm.title}
                    onChange={(e) => setLostFoundForm({ ...lostFoundForm, title: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={lostFoundForm.description}
                    onChange={(e) => setLostFoundForm({ ...lostFoundForm, description: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={lostFoundForm.category}
                    onChange={(e) => setLostFoundForm({ ...lostFoundForm, category: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={lostFoundForm.location}
                    onChange={(e) => setLostFoundForm({ ...lostFoundForm, location: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                  <input
                    type="email"
                    value={lostFoundForm.contact}
                    onChange={(e) => setLostFoundForm({ ...lostFoundForm, contact: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
                  <div className="flex items-center space-x-2">
                    <label className="flex-1 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-200 transition-colors flex items-center space-x-2">
                      <Upload size={16} className="text-gray-500" />
                      <span className="text-gray-600">Choose Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {imagePreview && (
                    <div className="mt-2">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Save size={16} />
                    <span>Submit</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <X size={16} />
                    <span>Cancel</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LostAndFoundSection;