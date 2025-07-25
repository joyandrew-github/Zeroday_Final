// src/components/ComplaintsSection.jsx
import React from 'react';
import { Plus, MessageSquare, MapPin, Clock, User, Eye, Save, X, CheckCircle, XCircle } from 'lucide-react';

const ComplaintsSection = ({
  complaints,
  showComplaintForm,
  setShowComplaintForm,
  complaintForm,
  setComplaintForm,
  handleComplaintSubmit,
  complaintCategories,
  getStatusColor,
  getPriorityColor
}) => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Hostel Complaints</h2>
          <p className="text-gray-600 mt-1">Submit and track your hostel complaints</p>
        </div>
        <button
          onClick={() => setShowComplaintForm(true)}
          className="mt-4 sm:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>New Complaint</span>
        </button>
      </div>

      {/* Complaints List */}
      <div className="space-y-4">
        {complaints.map(complaint => (
          <div key={complaint.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{complaint.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(complaint.status)}`}>
                    {complaint.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(complaint.priority)}`}>
                    {complaint.priority} Priority
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{complaint.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <MessageSquare size={16} />
                    <span>Category: {complaint.category}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} />
                    <span>Room: {complaint.room}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={16} />
                    <span>Date: {new Date(complaint.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User size={16} />
                    <span>Assigned: {complaint.assignedTo}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mt-4 lg:mt-0">
                {complaint.status === 'Resolved' ? (
                  <CheckCircle className="text-green-500" size={24} />
                ) : complaint.status === 'In Progress' ? (
                  <Clock className="text-blue-500" size={24} />
                ) : (
                  <XCircle className="text-red-500" size={24} />
                )}
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Complaint ID: #{complaint.id.toString().padStart(4, '0')}
                </span>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1">
                  <Eye size={16} />
                  <span>View Details</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Complaint Modal */}
      {showComplaintForm && (
        <div style={{
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
          }}>
          <div className="bg-white rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Submit New Complaint</h3>
            <form onSubmit={handleComplaintSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={complaintForm.title}
                  onChange={(e) => setComplaintForm({...complaintForm, title: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description of the issue"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={complaintForm.category}
                  onChange={(e) => setComplaintForm({...complaintForm, category: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  {complaintCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={complaintForm.description}
                  onChange={(e) => setComplaintForm({...complaintForm, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                  placeholder="Detailed description of the problem"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={complaintForm.priority}
                  onChange={(e) => setComplaintForm({...complaintForm, priority: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room/Location</label>
                <input
                  type="text"
                  value={complaintForm.room}
                  onChange={(e) => setComplaintForm({...complaintForm, room: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., H-201, Block A, Common Room"
                  required
                />
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
                  onClick={() => setShowComplaintForm(false)}
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <X size={16} />
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintsSection;