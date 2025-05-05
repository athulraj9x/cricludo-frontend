import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import ErrorBoundary from './utils/ErrorBoundary';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsAndConditions from './Pages/TermsAndConditions';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <Router>
      <ErrorBoundary>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Navigate to="/privacy-policy" replace />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="*" element={<NotFound />} />  {/* Catch-all route */}
      </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;

