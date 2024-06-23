import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Home = () => {
  const nav = useNavigate();

  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      background: 'linear-gradient(to right, #141e30, #243b55)',
    },
    leftSection: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'rgba(0, 0, 0, 0.7)',
    },
    content: {
      textAlign: 'center',
      padding: '2rem',
      borderRadius: '8px',
      background: 'rgba(0, 0, 0, 0.8)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    },
    title: {
      fontSize: '3rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: '#ffeb3b',
      animation: 'wiggle 1s ease-in-out infinite',
    },
    description: {
      fontSize: '1.25rem',
      marginBottom: '1.5rem',
      color: '#e0e0e0',
      animation: 'fadeIn 1.5s ease-in-out',
    },
    separator: {
      border: '1px solid #e0e0e0',
      width: '50%',
      margin: '0 auto 2rem auto',
      animation: 'fadeIn 1.5s ease-in-out',
    },
    button: {
      display: 'inline-block',
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#fff',
      background: '#d32f2f',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background 0.3s',
      animation: 'pulse 1.5s infinite',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftSection}>
        <div style={styles.content}>
          <h1 style={styles.title}>Online Judge</h1>
          <p style={styles.description}>Built with React, Node.js, Express, and MongoDB.</p>
          <hr style={styles.separator} />
          <Button onClick={() => nav('/questions')} style={styles.button}>
            Go To Questions
          </Button>
        </div>
      </div>
      <div style={styles.rightSection}>
        {/* You can add other content here if needed */}
      </div>
    </div>
  );
};

export default Home;
