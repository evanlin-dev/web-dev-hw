import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import MusicHeatmap from './pages/MusicHeatmap';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Welcome to My App</h1>} />
        <Route path="/heatmap" element={<MusicHeatmap />} />
      </Routes>
    </Router>
  );
};

export default App;
