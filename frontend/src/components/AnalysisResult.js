import React, { useState } from 'react';

const AnalysisResult = ({ analysis, onNewAnalysis }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Safety check for analysis data
  if (!analysis || !analysis.data) {
    return (
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div className="alert alert-error">
          Error: No analysis data received. Please try again.
        </div>
        <button onClick={onNewAnalysis} className="btn btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  const analysisData = analysis.data || analysis;
  const containerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    animation: 'slideIn 0.6s ease-out'
  };

  const resultCardStyle = {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
    borderRadius: '20px',
    padding: '2.5rem',
    marginBottom: '2rem',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.06)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem',
    paddingBottom: '1rem',
    borderBottom: '2px solid rgba(0, 200, 150, 0.1)'
  };

  const analysisContentStyle = {
    lineHeight: '1.8',
    color: '#2d3748',
    whiteSpace: 'pre-wrap',
    marginBottom: '2rem',
    fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    fontSize: '16px',
    letterSpacing: '0.3px',
    background: 'rgba(255, 255, 255, 0.6)',
    padding: '2rem',
    borderRadius: '16px',
    border: '1px solid rgba(0, 200, 150, 0.1)',
    backdropFilter: 'blur(5px)',
    maxHeight: isExpanded ? 'none' : '400px',
    overflow: isExpanded ? 'visible' : 'hidden',
    position: 'relative',
    transition: 'all 0.3s ease'
  };

  const disclaimerStyle = {
    background: 'linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%)',
    border: '1px solid rgba(255, 193, 7, 0.3)',
    borderRadius: '16px',
    padding: '1.5rem',
    marginTop: '2rem',
    lineHeight: '1.6',
    color: '#856404',
    boxShadow: '0 4px 12px rgba(255, 193, 7, 0.1)',
    backdropFilter: 'blur(5px)'
  };

  const buttonStyle = {
    background: 'linear-gradient(135deg, #00C896 0%, #1DB584 100%)',
    border: 'none',
    borderRadius: '12px',
    color: 'white',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 16px rgba(0, 200, 150, 0.3)',
    position: 'relative',
    overflow: 'hidden'
  };

  const expandButtonStyle = {
    background: 'transparent',
    border: '2px solid #00C896',
    borderRadius: '8px',
    color: '#00C896',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '1rem'
  };

  const analysisText = analysisData.analysis || 'Analysis not available';
  const isLongContent = analysisText.length > 1000;

  const formatAnalysis = (text) => {
    if (!text || typeof text !== 'string') {
      return 'Analysis not available';
    }
    
    let formattedText = text
      .replace(/\n\n+/g, '\n\n')
      .replace(/^\s+|\s+$/g, '')
      .trim();

    // Replace markdown bold (**text**) with HTML strong tags
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Replace markdown italic (*text*) with HTML bold for emphasis (no underlines)
    formattedText = formattedText.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
    
    // Format section headers with bold only (no underlines)
    formattedText = formattedText.replace(
      /^(CLINICAL ASSESSMENT|SYMPTOM ANALYSIS|POSSIBLE CONDITIONS|EMERGENCY INDICATORS|RECOMMENDED NEXT STEPS|ANALYSIS|ASSESSMENT|RECOMMENDATIONS|SYMPTOMS|CONDITIONS)/gm, 
      '🔹 <strong>$1</strong>'
    );
    
    // Format numbered lists with bold numbers
    formattedText = formattedText.replace(/^(\d+\.\s+)([A-Z][^:]*)/gm, '<strong>$1</strong>$2');
    
    // Format important medical terms with bold only (no underlines)
    formattedText = formattedText.replace(
      /\b(URGENT|EMERGENCY|IMMEDIATE|WARNING|CAUTION|IMPORTANT|NOTE|SEVERE|CRITICAL)\b/gi,
      '<strong>$1</strong>'
    );

    // Convert line breaks to HTML line breaks
    formattedText = formattedText.replace(/\n/g, '<br>');

    return formattedText;
  };

  return (
    <div style={containerStyle}>
      <style jsx>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={resultCardStyle}>
        <div style={headerStyle}>
          <div>
            <h2 style={{ 
              color: '#00C896', 
              margin: 0, 
              fontSize: '1.8rem',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #00C896 0%, #1DB584 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Analysis Results
            </h2>
            <div style={{ 
              marginTop: '0.5rem', 
              color: '#64748b', 
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <span>Completed: {new Date(analysisData.timestamp || Date.now()).toLocaleString()}</span>
              {analysisData.source && (
                <span style={{ 
                  background: analysisData.source === 'gemini' ? 'linear-gradient(135deg, #4CAF50, #45a049)' : 'rgba(0, 200, 150, 0.1)', 
                  padding: '2px 8px', 
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  color: analysisData.source === 'gemini' ? 'white' : '#00C896',
                  fontWeight: '500'
                }}>
                  {analysisData.source === 'gemini' ? '🤖 AI Powered' : '📝 Demo Mode'}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onNewAnalysis}
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 24px rgba(0, 200, 150, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 16px rgba(0, 200, 150, 0.3)';
            }}
          >
            New Analysis
          </button>
        </div>

        <div style={analysisContentStyle}>
          <div dangerouslySetInnerHTML={{ __html: formatAnalysis(analysisText) }} />
          {!isExpanded && isLongContent && (
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '60px',
              background: 'linear-gradient(transparent, rgba(255, 255, 255, 0.9))',
              display: 'flex',
              alignItems: 'end',
              justifyContent: 'center',
              paddingBottom: '10px'
            }}>
              <button
                onClick={() => setIsExpanded(true)}
                style={expandButtonStyle}
                onMouseEnter={(e) => {
                  e.target.style.background = '#00C896';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#00C896';
                }}
              >
                Read More
              </button>
            </div>
          )}
          {isExpanded && isLongContent && (
            <button
              onClick={() => setIsExpanded(false)}
              style={{...expandButtonStyle, marginTop: '1rem'}}
              onMouseEnter={(e) => {
                e.target.style.background = '#00C896';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#00C896';
              }}
            >
              Show Less
            </button>
          )}
        </div>

        <div style={disclaimerStyle}>
          <strong style={{ color: '#d97706' }}>Important Medical Disclaimer:</strong> This analysis is for educational purposes only. 
          Do not use this information as a substitute for professional medical care.
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
