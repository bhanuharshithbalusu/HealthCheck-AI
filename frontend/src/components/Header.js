import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const headerStyle = {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.8) 100%)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255,255,255,0.2)',
    padding: '1rem 0',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  };

  const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#00C896',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const navLinksStyle = {
    display: 'flex',
    gap: '2rem',
    listStyle: 'none'
  };

  const linkStyle = {
    color: '#333',
    textDecoration: 'none',
    fontWeight: '500',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    transition: 'all 0.2s ease'
  };

  const activeLinkStyle = {
    ...linkStyle,
    background: 'linear-gradient(135deg, #00C896 0%, #1DB584 100%)',
    color: 'white'
  };

  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <Link to="/" style={logoStyle}>
          🏥 HealthCheck
        </Link>
        <ul style={navLinksStyle}>
          <li>
            <Link 
              to="/" 
              style={location.pathname === '/' ? activeLinkStyle : linkStyle}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/analysis" 
              style={location.pathname === '/analysis' ? activeLinkStyle : linkStyle}
            >
              Analysis
            </Link>
          </li>
          <li>
            <Link 
              to="/history" 
              style={location.pathname === '/history' ? activeLinkStyle : linkStyle}
            >
              History
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
