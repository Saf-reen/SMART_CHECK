import React, { useState } from 'react';
import Sidebar from '../Common/Sidebar';
import Navbar from '../Common/Navbar';
import { Building, Plus, Calendar, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Organization = ({ user, onLogout, organizations = [] }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAddOrganization = () => {
    navigate('/organization/add');
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
          }
        }}
      />

      <div className="w-full min-h-screen lg:ml-0">
        <Navbar user={user} onSidebarToggle={toggleSidebar} onLogout={onLogout} />
        <main className="p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Organization Management</h1>
                <p className="text-gray-600">Manage your organizations and company structure</p>
              </div>
              <button
                onClick={handleAddOrganization}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-900 hover:bg-blue-500 text-white font-medium rounded-md transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Organization</span>
              </button>
            </div>

            {/* Organizations List */}
            {organizations.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <Building className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">No Organizations Yet</h3>
                {/* <p className="text-gray-600 mb-6">Get started by adding your first organization</p>
                <button
                  onClick={handleAddOrganization}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
                >
                  Add Organization
                </button> */}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {organizations.map((org) => (
                  <div key={org.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-900 to-blue-400 rounded-lg">
                        <Building className="w-6 h-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-800">{org.name}</h3>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        <span className="text-sm">{org.email}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">Established: {new Date(org.date).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Organization;