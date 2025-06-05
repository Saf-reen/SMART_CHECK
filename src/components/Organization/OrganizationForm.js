import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Common/Sidebar';
import Navbar from '../Common/Navbar';
import { ArrowLeft, Building } from 'lucide-react';

const OrganizationForm = ({ user, onLogout, onAddOrganization }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: ''
  });
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    
    // Add the organization
    onAddOrganization(formData);
    
    // Navigate back to organization page
    navigate('/organization');
  };

  const handleBack = () => {
    navigate('/organization');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        activeTab="organization"
        onTabChange={(tab) => {
          if (tab === 'dashboard') {
            navigate('/');
          } else if (tab === 'organization') {
            navigate('/organization');
          }
        }}
      />

      <div className="w-full min-h-screen lg:ml-0">
        <Navbar user={user} onSidebarToggle={toggleSidebar} onLogout={onLogout} />
        <main className="p-6">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <button
                onClick={handleBack}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Organizations</span>
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Add New Organization</h1>
              <p className="text-gray-600">Fill in the details to add a new organization</p>
            </div>

            {/* Form */}
            <div className="bg-white p-8 shadow-lg rounded-xl">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-900 to-blue-400 rounded-lg">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <h2 className="ml-4 text-xl font-semibold text-gray-800">Organization Details</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter organization name"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email address"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Established Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Add Organization
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrganizationForm;
