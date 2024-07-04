import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import { Button } from 'react-bootstrap';
import backgroundImage from '../images/background.jpg'; // Adjust the path based on your folder structure

const Home = () => {
  const nav = useNavigate();

  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      background: `linear-gradient(to right, rgba(20, 30, 48, 0.7), rgba(36, 59, 85, 0.7)), url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    leftSection: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      textAlign: 'center',
      padding: '2rem',
      borderRadius: '8px',
      background: 'rgba(0, 0, 0, 0.7)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    },
    title: {
      fontSize: '3rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: '#ffeb3b',
    },
    description: {
      fontSize: '1.25rem',
      marginBottom: '1.5rem',
      color: '#e0e0e0',
    },
    separator: {
      border: '1px solid #e0e0e0',
      width: '50%',
      margin: '0 auto 2rem auto',
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
    },
  };

  const titleSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 300,
  });

  const descSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 600,
  });

  const buttonSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 900,
  });

  return (
    <div style={styles.container}>
      <div style={styles.leftSection}>
        <div style={styles.content}>
          <animated.h1 style={{ ...styles.title, ...titleSpring }}>Online Judge</animated.h1>
          <animated.p style={{ ...styles.description, ...descSpring }}>
            Built with React, Node.js, Express, and MongoDB.
          </animated.p>
          <hr style={styles.separator} />
          <animated.div style={buttonSpring}>
            <Button onClick={() => nav('/questions')} style={styles.button}>
              Go To Questions
            </Button>
          </animated.div>
        </div>
      </div>
      <div style={styles.rightSection}>
        {/* You can add other content here if needed */}
      </div>
    </div>
  );
};

export default Home;
