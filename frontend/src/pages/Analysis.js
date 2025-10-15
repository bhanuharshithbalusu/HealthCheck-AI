import React, { useState } from 'react';
import SymptomForm from '../components/SymptomForm';
import AnalysisResult from '../components/AnalysisResult';

const Home = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalysisComplete = (result) => {
    setAnalysis(result);
    setLoading(false);
  };

  const handleNewAnalysis = () => {
    setAnalysis(null);
  };

  const containerStyle = {
    padding: '2rem 0',
    minHeight: 'calc(100vh - 200px)'
  };

  const heroStyle = {
    textAlign: 'center',
    marginBottom: '3rem',
    color: '#2d3748'
  };

  return (
    <div style={containerStyle}>
      <div className="container">
        {!analysis && (
          <div style={heroStyle}>
            <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem' }}>
              Healthcare Symptom Checker
            </h1>
            <p style={{ fontSize: '1.2rem', opacity: '0.9', maxWidth: '600px', margin: '0 auto' }}>
              Get educational information about your symptoms and recommended next steps.
            </p>
          </div>
        )}

        {!analysis ? (
          <SymptomForm 
            onAnalysisComplete={handleAnalysisComplete}
            loading={loading}
            setLoading={setLoading}
          />
        ) : (
          <AnalysisResult 
            analysis={analysis}
            onNewAnalysis={handleNewAnalysis}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
