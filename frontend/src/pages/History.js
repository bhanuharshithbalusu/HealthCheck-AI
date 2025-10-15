import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await api.getHistory();
      // Backend returns { success: true, data: { queries: [...], total: ..., limit: ..., offset: ... } }
      setHistory(response.data.data.queries || []);
    } catch (err) {
      setError('Failed to load history');
      console.error('Error fetching history:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = async () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      try {
        // You would need to implement a clear history API endpoint
        setHistory([]);
      } catch (err) {
        console.error('Error clearing history:', err);
      }
    }
  };

  const containerStyle = {
    padding: '2rem 0',
    minHeight: 'calc(100vh - 200px)',
    animation: 'fadeIn 0.6s ease-out'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '3rem',
    color: '#2d3748'
  };

  const historyItemStyle = (index) => ({
    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
    borderRadius: '16px',
    padding: '2rem',
    marginBottom: '1.5rem',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.06)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    transform: selectedItem === index ? 'translateY(-2px)' : 'translateY(0)',
    animation: `slideIn 0.5s ease-out ${index * 0.1}s both`
  });

  const timestampStyle = {
    color: '#64748b',
    fontSize: '0.9rem',
    marginBottom: '0.8rem',
    fontWeight: '500'
  };

  const symptomsStyle = {
    color: '#00C896',
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '1rem',
    padding: '0.8rem',
    background: 'rgba(0, 200, 150, 0.1)',
    borderRadius: '8px',
    border: '1px solid rgba(0, 200, 150, 0.2)'
  };

  const metaInfoStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '1rem',
    marginBottom: '1rem',
    fontSize: '0.9rem'
  };

  const metaItemStyle = {
    background: 'rgba(248, 250, 252, 0.8)',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    textAlign: 'center',
    border: '1px solid rgba(226, 232, 240, 0.5)'
  };

  const analysisPreviewStyle = {
    color: '#4a5568',
    fontSize: '0.95rem',
    lineHeight: '1.6',
    maxHeight: selectedItem ? 'none' : '80px',
    overflow: 'hidden',
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.6)',
    padding: '1rem',
    borderRadius: '8px',
    border: '1px solid rgba(226, 232, 240, 0.3)'
  };

  const sourceTagStyle = {
    background: 'linear-gradient(135deg, #4CAF50, #45a049)',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '0.8rem',
    fontWeight: '500',
    display: 'inline-block',
    marginTop: '0.5rem'
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div className="container">
          <div style={headerStyle}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
              Analysis History
            </h1>
          </div>
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <div style={{
              width: '60px',
              height: '60px',
              border: '4px solid rgba(0, 200, 150, 0.3)',
              borderTop: '4px solid #00C896',
              borderRadius: '50%',
              margin: '0 auto 1rem',
              animation: 'spin 1s linear infinite'
            }} />
            <p style={{ color: '#4a5568', fontSize: '1.1rem' }}>Loading your analysis history...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <div className="container">
          <div style={headerStyle}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
              Analysis History
            </h1>
          </div>
          <div style={{
            textAlign: 'center',
            padding: '4rem',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
            <h3 style={{ color: '#2d3748', marginBottom: '1rem' }}>Unable to Load History</h3>
            <p style={{ color: '#4a5568', marginBottom: '2rem' }}>{error}</p>
            <button
              onClick={fetchHistory}
              style={{
                background: 'linear-gradient(135deg, #00C896 0%, #1DB584 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="container">
        <div style={headerStyle}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #00C896 0%, #1DB584 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Analysis History
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: '0.9', maxWidth: '600px', margin: '0 auto' }}>
            Review your previous symptom analyses and track your health journey
          </p>
        </div>

        {history.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📋</div>
            <h3 style={{ color: '#2d3748', marginBottom: '1rem', fontSize: '1.5rem' }}>No History Yet</h3>
            <p style={{ color: '#4a5568', marginBottom: '2rem', fontSize: '1.1rem' }}>
              Start by analyzing some symptoms to build your health history
            </p>
            <button
              onClick={() => window.location.href = '/'}
              style={{
                background: 'linear-gradient(135deg, #00C896 0%, #1DB584 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '16px 32px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 16px rgba(0, 200, 150, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 24px rgba(0, 200, 150, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 16px rgba(0, 200, 150, 0.3)';
              }}
            >
              Start Analysis
            </button>
          </div>
        ) : (
          <>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
              padding: '1rem 0'
            }}>
              <p style={{ color: '#4a5568', fontSize: '1rem', opacity: '0.9' }}>
                {history.length} analysis{history.length !== 1 ? 'es' : ''} found
              </p>
              <button
                onClick={clearHistory}
                style={{
                  background: 'transparent',
                  color: '#64748b',
                  border: '1px solid #cbd5e0',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#00C896';
                  e.target.style.color = '#00C896';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = '#cbd5e0';
                  e.target.style.color = '#64748b';
                }}
              >
                Clear History
              </button>
            </div>

            {history.map((item, index) => (
              <div
                key={item.id || index}
                style={historyItemStyle(index)}
                onClick={() => setSelectedItem(selectedItem === index ? null : index)}
                onMouseEnter={() => {
                  if (selectedItem !== index) {
                    document.querySelector(`[data-index="${index}"]`).style.transform = 'translateY(-2px)';
                    document.querySelector(`[data-index="${index}"]`).style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.15)';
                  }
                }}
                onMouseLeave={() => {
                  if (selectedItem !== index) {
                    document.querySelector(`[data-index="${index}"]`).style.transform = 'translateY(0)';
                    document.querySelector(`[data-index="${index}"]`).style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)';
                  }
                }}
                data-index={index}
              >
                <div style={timestampStyle}>
                  📅 {new Date(item.timestamp).toLocaleDateString()} at {new Date(item.timestamp).toLocaleTimeString()}
                </div>
                
                <div style={symptomsStyle}>
                  💬 {item.symptoms}
                </div>

                {(item.age || item.gender || item.duration || item.severity) && (
                  <div style={metaInfoStyle}>
                    {item.age && (
                      <div style={metaItemStyle}>
                        <strong>Age:</strong> {item.age}
                      </div>
                    )}
                    {item.gender && (
                      <div style={metaItemStyle}>
                        <strong>Gender:</strong> {item.gender}
                      </div>
                    )}
                    {item.duration && (
                      <div style={metaItemStyle}>
                        <strong>Duration:</strong> {item.duration}
                      </div>
                    )}
                    {item.severity && (
                      <div style={metaItemStyle}>
                        <strong>Severity:</strong> {item.severity}
                      </div>
                    )}
                  </div>
                )}

                <div style={analysisPreviewStyle}>
                  {selectedItem === index ? item.analysis : `${item.analysis?.substring(0, 200)}...`}
                  {!selectedItem && (
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '30px',
                      background: 'linear-gradient(transparent, rgba(255, 255, 255, 0.9))',
                      display: 'flex',
                      alignItems: 'end',
                      justifyContent: 'center',
                      paddingBottom: '5px'
                    }}>
                      <small style={{ color: '#00C896', fontWeight: '500' }}>Click to expand</small>
                    </div>
                  )}
                </div>

                {item.source && (
                  <div style={sourceTagStyle}>
                    {item.source === 'gemini' ? '🤖 AI Powered' : '📝 Demo Mode'}
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default History;