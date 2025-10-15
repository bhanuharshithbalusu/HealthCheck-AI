import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Intro from './pages/Intro';
import Analysis from './pages/Analysis';
import History from './pages/History';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main style={{ minHeight: 'calc(100vh - 140px)' }}>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
