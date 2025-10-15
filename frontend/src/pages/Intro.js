import React from 'react';

const Intro = () => {
  const handleStartAnalysis = () => {
    window.location.href = '/analysis';
  };

  return (
    <div style={{ 
      minHeight: 'calc(100vh - 140px)', 
      padding: '2rem 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ 
        maxWidth: '900px', 
        margin: '0 auto', 
        padding: '0 2rem',
        textAlign: 'center'
      }}>
        
        {/* Hero Section */}
        <div style={{ marginBottom: '4rem' }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: '700', 
            marginBottom: '1.5rem',
            color: '#2d3748',
            background: 'linear-gradient(135deg, #00C896 0%, #1DB584 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            HealthCheck AI
          </h1>
          <p style={{ 
            fontSize: '1.3rem', 
            color: '#4a5568', 
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Advanced AI-powered healthcare symptom analysis for educational purposes
          </p>
          <button
            onClick={handleStartAnalysis}
            style={{
              background: 'linear-gradient(135deg, #00C896 0%, #1DB584 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '18px 36px',
              fontSize: '1.2rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 8px 25px rgba(0, 200, 150, 0.4)',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px) scale(1.05)';
              e.target.style.boxShadow = '0 15px 35px rgba(0, 200, 150, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 8px 25px rgba(0, 200, 150, 0.4)';
            }}
          >
            Start Analysis
          </button>
        </div>

        {/* Project Overview */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '3rem',
          marginBottom: '3rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(15px)'
        }}>
          <h2 style={{ 
            color: '#00C896', 
            marginBottom: '1.5rem',
            fontSize: '2rem',
            fontWeight: '600'
          }}>
            Project Overview
          </h2>
          <p style={{ 
            color: '#555', 
            lineHeight: '1.8', 
            fontSize: '1.1rem',
            marginBottom: '2rem'
          }}>
            HealthCheck AI is a comprehensive healthcare symptom checker application that leverages 
            Google's advanced Gemini AI technology to provide educational information about potential 
            health conditions based on user-described symptoms. Our platform delivers professional-grade 
            medical insights while maintaining strict educational boundaries.
          </p>
          
          <div style={{
            background: 'linear-gradient(135deg, #fff3cd, #ffeaa7)',
            border: '1px solid #ffeaa7',
            borderRadius: '12px',
            padding: '1.5rem',
            color: '#856404'
          }}>
            <strong>Medical Disclaimer:</strong> This platform is designed exclusively for educational 
            purposes and should never replace professional medical advice, diagnosis, or treatment. 
            Always consult with qualified healthcare professionals for medical concerns.
          </div>
        </div>

        {/* Key Functionalities */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '3rem',
          marginBottom: '3rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(15px)'
        }}>
          <h2 style={{ 
            color: '#00C896', 
            marginBottom: '2rem',
            fontSize: '2rem',
            fontWeight: '600'
          }}>
            Key Functionalities
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            
            {/* AI Analysis */}
            <div 
              style={{
                background: 'rgba(0, 200, 150, 0.05)',
                border: '1px solid rgba(0, 200, 150, 0.2)',
                borderRadius: '15px',
                padding: '2rem',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                const container = e.currentTarget;
                container.style.transform = 'translateY(-8px)';
                container.style.boxShadow = '0 15px 30px rgba(0, 200, 150, 0.2)';
                container.style.background = 'rgba(0, 200, 150, 0.1)';
                const h3 = container.querySelector('h3');
                const p = container.querySelector('p');
                if (h3) h3.style.color = '#00C896';
                if (p) p.style.color = '#4a4a4a';
              }}
              onMouseLeave={(e) => {
                const container = e.currentTarget;
                container.style.transform = 'translateY(0)';
                container.style.boxShadow = 'none';
                container.style.background = 'rgba(0, 200, 150, 0.05)';
                const h3 = container.querySelector('h3');
                const p = container.querySelector('p');
                if (h3) h3.style.color = '#00C896';
                if (p) p.style.color = '#555';
              }}
            >
              <div style={{ 
                fontSize: '3rem', 
                marginBottom: '1rem', 
                pointerEvents: 'none',
                userSelect: 'none',
                background: 'transparent'
              }}>🤖</div>
              <h3 style={{ 
                color: '#00C896', 
                marginBottom: '1rem', 
                fontSize: '1.3rem', 
                transition: 'color 0.3s ease', 
                pointerEvents: 'none',
                userSelect: 'none',
                background: 'transparent'
              }}>
                Advanced AI Analysis
              </h3>
              <p style={{ 
                color: '#555', 
                lineHeight: '1.6', 
                transition: 'color 0.3s ease', 
                pointerEvents: 'none',
                userSelect: 'none',
                background: 'transparent'
              }}>
                Powered by Google Gemini AI for comprehensive symptom analysis and condition assessment
              </p>
            </div>

            {/* Clinical Assessment */}
            <div 
              style={{
                background: 'rgba(0, 200, 150, 0.05)',
                border: '1px solid rgba(0, 200, 150, 0.2)',
                borderRadius: '15px',
                padding: '2rem',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                const container = e.currentTarget;
                container.style.transform = 'translateY(-8px)';
                container.style.boxShadow = '0 15px 30px rgba(0, 200, 150, 0.2)';
                container.style.background = 'rgba(0, 200, 150, 0.1)';
                const h3 = container.querySelector('h3');
                const p = container.querySelector('p');
                if (h3) h3.style.color = '#00C896';
                if (p) p.style.color = '#4a4a4a';
              }}
              onMouseLeave={(e) => {
                const container = e.currentTarget;
                container.style.transform = 'translateY(0)';
                container.style.boxShadow = 'none';
                container.style.background = 'rgba(0, 200, 150, 0.05)';
                const h3 = container.querySelector('h3');
                const p = container.querySelector('p');
                if (h3) h3.style.color = '#00C896';
                if (p) p.style.color = '#555';
              }}
            >
              <div style={{ 
                fontSize: '3rem', 
                marginBottom: '1rem', 
                pointerEvents: 'none',
                userSelect: 'none',
                background: 'transparent'
              }}>📋</div>
              <h3 style={{ 
                color: '#00C896', 
                marginBottom: '1rem', 
                fontSize: '1.3rem', 
                transition: 'color 0.3s ease', 
                pointerEvents: 'none',
                userSelect: 'none',
                background: 'transparent'
              }}>
                Clinical Assessment
              </h3>
              <p style={{ 
                color: '#555', 
                lineHeight: '1.6', 
                transition: 'color 0.3s ease', 
                pointerEvents: 'none',
                userSelect: 'none',
                background: 'transparent'
              }}>
                Detailed medical analysis with possible conditions, severity indicators, and recommendations
              </p>
            </div>

            {/* History Tracking */}
            <div 
              style={{
                background: 'rgba(0, 200, 150, 0.05)',
                border: '1px solid rgba(0, 200, 150, 0.2)',
                borderRadius: '15px',
                padding: '2rem',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                const container = e.currentTarget;
                container.style.transform = 'translateY(-8px)';
                container.style.boxShadow = '0 15px 30px rgba(0, 200, 150, 0.2)';
                container.style.background = 'rgba(0, 200, 150, 0.1)';
                const h3 = container.querySelector('h3');
                const p = container.querySelector('p');
                if (h3) h3.style.color = '#00C896';
                if (p) p.style.color = '#4a4a4a';
              }}
              onMouseLeave={(e) => {
                const container = e.currentTarget;
                container.style.transform = 'translateY(0)';
                container.style.boxShadow = 'none';
                container.style.background = 'rgba(0, 200, 150, 0.05)';
                const h3 = container.querySelector('h3');
                const p = container.querySelector('p');
                if (h3) h3.style.color = '#00C896';
                if (p) p.style.color = '#555';
              }}
            >
              <div style={{ 
                fontSize: '3rem', 
                marginBottom: '1rem', 
                pointerEvents: 'none',
                userSelect: 'none',
                background: 'transparent'
              }}>📚</div>
              <h3 style={{ 
                color: '#00C896', 
                marginBottom: '1rem', 
                fontSize: '1.3rem', 
                transition: 'color 0.3s ease', 
                pointerEvents: 'none',
                userSelect: 'none',
                background: 'transparent'
              }}>
                Analysis History
              </h3>
              <p style={{ 
                color: '#555', 
                lineHeight: '1.6', 
                transition: 'color 0.3s ease', 
                pointerEvents: 'none',
                userSelect: 'none',
                background: 'transparent'
              }}>
                Complete tracking of all symptom analyses with searchable history and detailed records
              </p>
            </div>

            {/* Emergency Detection */}
            <div 
              style={{
                background: 'rgba(0, 200, 150, 0.05)',
                border: '1px solid rgba(0, 200, 150, 0.2)',
                borderRadius: '15px',
                padding: '2rem',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                const container = e.currentTarget;
                container.style.transform = 'translateY(-8px)';
                container.style.boxShadow = '0 15px 30px rgba(0, 200, 150, 0.2)';
                container.style.background = 'rgba(0, 200, 150, 0.1)';
                const h3 = container.querySelector('h3');
                const p = container.querySelector('p');
                if (h3) h3.style.color = '#00C896';
                if (p) p.style.color = '#4a4a4a';
              }}
              onMouseLeave={(e) => {
                const container = e.currentTarget;
                container.style.transform = 'translateY(0)';
                container.style.boxShadow = 'none';
                container.style.background = 'rgba(0, 200, 150, 0.05)';
                const h3 = container.querySelector('h3');
                const p = container.querySelector('p');
                if (h3) h3.style.color = '#00C896';
                if (p) p.style.color = '#555';
              }}
            >
              <div style={{ 
                fontSize: '3rem', 
                marginBottom: '1rem', 
                pointerEvents: 'none',
                userSelect: 'none',
                background: 'transparent'
              }}>🚨</div>
              <h3 style={{ 
                color: '#00C896', 
                marginBottom: '1rem', 
                fontSize: '1.3rem', 
                transition: 'color 0.3s ease', 
                pointerEvents: 'none',
                userSelect: 'none',
                background: 'transparent'
              }}>
                Emergency Detection
              </h3>
              <p style={{ 
                color: '#555', 
                lineHeight: '1.6', 
                transition: 'color 0.3s ease', 
                pointerEvents: 'none',
                userSelect: 'none',
                background: 'transparent'
              }}>
                Intelligent crisis detection with immediate emergency contact recommendations
              </p>
            </div>

            {/* Educational Content */}
            <div 
              style={{
                background: 'rgba(0, 200, 150, 0.05)',
                border: '1px solid rgba(0, 200, 150, 0.2)',
                borderRadius: '15px',
                padding: '2rem',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                const container = e.currentTarget;
                container.style.transform = 'translateY(-8px)';
                container.style.boxShadow = '0 15px 30px rgba(0, 200, 150, 0.2)';
                container.style.background = 'rgba(0, 200, 150, 0.1)';
                const h3 = container.querySelector('h3');
                const p = container.querySelector('p');
                if (h3) h3.style.color = '#00C896';
                if (p) p.style.color = '#4a4a4a';
              }}
              onMouseLeave={(e) => {
                const container = e.currentTarget;
                container.style.transform = 'translateY(0)';
                container.style.boxShadow = 'none';
                container.style.background = 'rgba(0, 200, 150, 0.05)';
                const h3 = container.querySelector('h3');
                const p = container.querySelector('p');
                if (h3) h3.style.color = '#00C896';
                if (p) p.style.color = '#555';
              }}
            >
              <div style={{ 
                fontSize: '3rem', 
                marginBottom: '1rem', 
                pointerEvents: 'none',
                userSelect: 'none',
                background: 'transparent'
              }}>🎓</div>
              <h3 style={{ 
                color: '#00C896', 
                marginBottom: '1rem', 
                fontSize: '1.3rem', 
                transition: 'color 0.3s ease', 
                pointerEvents: 'none',
                userSelect: 'none',
                background: 'transparent'
              }}>
                Educational Focus
              </h3>
              <p style={{ 
                color: '#555', 
                lineHeight: '1.6', 
                transition: 'color 0.3s ease', 
                pointerEvents: 'none',
                userSelect: 'none',
                background: 'transparent'
              }}>
                Comprehensive health education with clear explanations and actionable health insights
              </p>
            </div>

            {/* Privacy & Security */}
            <div 
              style={{
                background: 'rgba(0, 200, 150, 0.05)',
                border: '1px solid rgba(0, 200, 150, 0.2)',
                borderRadius: '15px',
                padding: '2rem',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                const container = e.currentTarget;
                container.style.transform = 'translateY(-8px)';
                container.style.boxShadow = '0 15px 30px rgba(0, 200, 150, 0.2)';
                container.style.background = 'rgba(0, 200, 150, 0.1)';
                const h3 = container.querySelector('h3');
                const p = container.querySelector('p');
                if (h3) h3.style.color = '#00C896';
                if (p) p.style.color = '#4a4a4a';
              }}
              onMouseLeave={(e) => {
                const container = e.currentTarget;
                container.style.transform = 'translateY(0)';
                container.style.boxShadow = 'none';
                container.style.background = 'rgba(0, 200, 150, 0.05)';
                const h3 = container.querySelector('h3');
                const p = container.querySelector('p');
                if (h3) h3.style.color = '#00C896';
                if (p) p.style.color = '#555';
              }}
            >
              <div style={{ 
                fontSize: '3rem', 
                marginBottom: '1rem', 
                pointerEvents: 'none',
                userSelect: 'none',
                background: 'transparent'
              }}>🔒</div>
              <h3 style={{ 
                color: '#00C896', 
                marginBottom: '1rem', 
                fontSize: '1.3rem', 
                transition: 'color 0.3s ease', 
                pointerEvents: 'none',
                userSelect: 'none',
                background: 'transparent'
              }}>
                Privacy Focused
              </h3>
              <p style={{ 
                color: '#555', 
                lineHeight: '1.6', 
                transition: 'color 0.3s ease', 
                pointerEvents: 'none',
                userSelect: 'none',
                background: 'transparent'
              }}>
                Enterprise-grade security with local data storage and complete privacy protection
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Intro;
