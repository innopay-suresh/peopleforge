import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import LdapSetup from './pages/LdapSetup';
import RoleManager from './pages/RoleManager';
import OrgSetup from './pages/OrgSetup';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ldapsetup" element={<LdapSetup />} />
        <Route path="/rolemanager" element={<RoleManager />} />
        <Route path="/orgsetup" element={<OrgSetup />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
