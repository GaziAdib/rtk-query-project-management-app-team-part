import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TeamsPage from './pages/TeamsPage';
import RegistrationPage from './pages/RegistrationPage';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import useAuthCheck from './hooks/useAuthCheck';


function App() {
  const authChecked = useAuthCheck();

    return !authChecked ? <div>Checking Authentication</div> : (
        <Router>
            <Routes>
                <Route path="/" element={<PublicRoute><LoginPage /></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><RegistrationPage /></PublicRoute>} />
                <Route path="/teams" element={<PrivateRoute><TeamsPage /></PrivateRoute>} />
            </Routes>
        </Router>
    ) 
}

export default App;
