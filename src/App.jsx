import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import ErrorBoundary from './utils/ErrorBoundary';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsAndConditions from './Pages/TermsAndConditions';
import NotFound from './Pages/NotFound';
import BuggyComponent from './Pages/Error';
import Home from './Pages/Home';
import Navigation from './Components/Navigation';

function App() {
  return (
    <Router>
      <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="*" element={<NotFound />} />  {/* Catch-all route */}
        <Route path="/error-test" element={<BuggyComponent />} />
        
      </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;

