import React, { useState } from 'react';
import { api } from '../utils/api';

const SymptomForm = ({ onAnalysisComplete, loading, setLoading }) => {
  const [formData, setFormData] = useState({
    symptoms: '',
    age: '',
    gender: '',
    duration: '',
    severity: ''
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await api.analyzeSymptoms(formData);
      onAnalysisComplete(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to analyze symptoms. Please try again.');
      setLoading(false);
    }
  };

  const formStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '16px',
    padding: '2rem',
    maxWidth: '600px',
    margin: '0 auto',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  };

  const inputGroupStyle = {
    marginBottom: '1.5rem'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '600',
    color: '#333'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'border-color 0.2s ease',
    fontFamily: 'inherit'
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '120px',
    resize: 'vertical'
  };

  const selectStyle = {
    ...inputStyle,
    cursor: 'pointer'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '1rem'
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#00C896' }}>
        Describe Your Symptoms
      </h2>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      <div style={inputGroupStyle}>
        <label htmlFor="symptoms" style={labelStyle}>
          Symptoms Description *
        </label>
        <textarea
          id="symptoms"
          name="symptoms"
          value={formData.symptoms}
          onChange={handleInputChange}
          placeholder="Please describe your symptoms in detail. Include when they started, how they feel, and any other relevant information..."
          style={textareaStyle}
          required
          maxLength={1000}
        />
        <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#666', marginTop: '0.25rem' }}>
          {formData.symptoms.length}/1000 characters
        </div>
      </div>

      <div style={gridStyle}>
        <div style={inputGroupStyle}>
          <label htmlFor="age" style={labelStyle}>Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="e.g., 25"
            min="1"
            max="120"
            style={inputStyle}
          />
        </div>

        <div style={inputGroupStyle}>
          <label htmlFor="gender" style={labelStyle}>Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            style={selectStyle}
          >
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>
      </div>

      <div style={gridStyle}>
        <div style={inputGroupStyle}>
          <label htmlFor="duration" style={labelStyle}>Duration</label>
          <select
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            style={selectStyle}
          >
            <option value="">Select...</option>
            <option value="less-than-day">Less than a day</option>
            <option value="1-3-days">1-3 days</option>
            <option value="4-7-days">4-7 days</option>
            <option value="1-2-weeks">1-2 weeks</option>
            <option value="more-than-2-weeks">More than 2 weeks</option>
            <option value="chronic">Chronic (months/years)</option>
          </select>
        </div>

        <div style={inputGroupStyle}>
          <label htmlFor="severity" style={labelStyle}>Severity</label>
          <select
            id="severity"
            name="severity"
            value={formData.severity}
            onChange={handleInputChange}
            style={selectStyle}
          >
            <option value="">Select...</option>
            <option value="mild">Mild</option>
            <option value="moderate">Moderate</option>
            <option value="severe">Severe</option>
            <option value="very-severe">Very Severe</option>
          </select>
        </div>
      </div>

      <div className="alert alert-warning">
        <strong>Disclaimer:</strong> This analysis is for educational purposes only. 
        If you're experiencing severe symptoms or a medical emergency, please seek 
        immediate medical attention.
      </div>

      <button
        type="submit"
        disabled={loading || !formData.symptoms.trim()}
        className="btn btn-primary"
        style={{ 
          width: '100%', 
          fontSize: '18px', 
          padding: '16px',
          marginTop: '1rem'
        }}
      >
        {loading ? (
          <>
            <span className="loading"></span>
            <span style={{ marginLeft: '0.5rem' }}>Analyzing...</span>
          </>
        ) : (
          'Analyze Symptoms'
        )}
      </button>
    </form>
  );
};

export default SymptomForm;
