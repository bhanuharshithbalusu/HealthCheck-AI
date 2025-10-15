import React from 'react';

const Footer = () => {
  const footerStyle = {
    background: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    textAlign: 'center',
    padding: '2rem 0',
    marginTop: 'auto'
  };

  const disclaimerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 20px',
    fontSize: '0.9rem',
    lineHeight: '1.6',
    opacity: '0.9'
  };

  return (
    <footer style={footerStyle}>
      <div style={disclaimerStyle}>
        <p style={{ fontWeight: '600', marginBottom: '1rem', color: '#ff6b6b' }}>
          ⚠️ Medical Disclaimer
        </p>
        <p>
          This tool is for educational purposes only and should not be used as a substitute 
          for professional medical advice, diagnosis, or treatment. Always seek the advice 
          of your physician or other qualified health provider with any questions you may 
          have regarding a medical condition.
        </p>
        <p style={{ marginTop: '1rem', fontSize: '0.8rem', opacity: '0.7' }}>
          © 2025 Healthcare Symptom Checker. Built for educational purposes.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
