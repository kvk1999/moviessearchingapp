import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieDetailsPage from './pages/MovieDetailsPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="header">MoviezBonanza</header>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies/:id" element={<MovieDetailsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
