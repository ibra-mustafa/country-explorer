import React from 'react';
import { useNavigate } from 'react-router';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1 style={{
        fontSize: '48px',
        color: '#1a1a1a',
        marginBottom: '16px'
      }}>404</h1>
      <h2 style={{
        fontSize: '24px',
        color: '#333',
        marginBottom: '24px'
      }}>Page Not Found</h2>
      <p style={{
        color: '#666',
        marginBottom: '32px',
        maxWidth: '500px'
      }}>
        Oops! The page you're looking for doesn't exist. You might have mistyped the address or the page might have moved.
      </p>
      <button
        onClick={() => navigate('/')}
        style={{
          padding: '12px 24px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          transition: 'background-color 0.2s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
      >
        Back to Home
      </button>
    </div>
  );
};

export default NotFoundPage;