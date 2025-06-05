import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import Dashboard from './components/Dashboard/Dashboard';
import OrganizationForm from './components/Organization/OrganizationForm';
import Organization from './components/Organization/Organization';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [organizations, setOrganizations] = useState([]);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const handleAddOrganization = (orgData) => {
    setOrganizations(prev => [...prev, { ...orgData, id: Date.now() }]);
  };

  return (
    
      <div className="min-h-screen">
        {!isAuthenticated ? (
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        ) : (
          <Routes>
            <Route path="/" element={
              <Dashboard 
                user={user} 
                onLogout={handleLogout} 
                organizations={organizations} 
              />
            } />
            <Route path="/organization" element={
              <Organization 
                user={user} 
                onLogout={handleLogout} 
                organizations={organizations} 
              />
            } />
            <Route path="/organization/add" element={
              <OrganizationForm 
                user={user} 
                onLogout={handleLogout} 
                onAddOrganization={handleAddOrganization} 
              />
            } />
            {/* Redirect any unknown route to dashboard */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </div>
    
  );
};

export default App;
