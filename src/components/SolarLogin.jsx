import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SolarLogin.css';

const SolarLogin = ({ onLogin, hideSignup = false }) => {
  const [phase, setPhase] = useState('idle'); // idle -> beam -> lit -> login
  const [litCells, setLitCells] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const TOTAL_CELLS = 24;

  const startAnimation = () => {
    setPhase('idle');
    setLitCells([]);
    
    setTimeout(() => {
      setPhase('beam');
    }, 600); // 0.6s

    setTimeout(() => {
      setPhase('lit');
      for (let i = 0; i < TOTAL_CELLS; i++) {
        setTimeout(() => {
          setLitCells(prev => [...prev, i]);
        }, i * (1000 / TOTAL_CELLS));
      }
    }, 2600); // 2.6s

    setTimeout(() => {
      setPhase('login');
    }, 3600); // 3.6s
  };

  useEffect(() => {
    startAnimation();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username) {
      setError('Username is required');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    try {
      if (onLogin) {
        await onLogin({ username, password, mode: 'login' });
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
    }
  };

  return (
    <div className="solar-scene">
      {/* Sun & Beam */}
      <div className="sun-container">
        <div className="sun"></div>
        <div className={`beam ${phase !== 'idle' ? 'active' : ''}`}></div>
      </div>

      {/* Solar Panel */}
      <div className="panel-wrapper">
        <div className="panel">
          {Array.from({ length: TOTAL_CELLS }).map((_, index) => (
            <div 
              key={index} 
              className={`panel-cell ${litCells.includes(index) ? 'on' : ''}`}
            ></div>
          ))}
        </div>
      </div>

      {/* Login Popup */}
      <AnimatePresence>
        {phase === 'login' && (
          <div className="login-popup-wrapper">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", bounce: 0.4 }}
            >
              <form onSubmit={handleSubmit} className="solar-login-card">
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <h2 style={{ color: 'white', marginBottom: '0.5rem', fontFamily: 'Outfit, sans-serif' }}>
                    System Login
                  </h2>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                    Secure Portal Access
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input 
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setError('');
                    }}
                    className="solar-input"
                    placeholder="Enter username"
                    autoFocus
                  />
                  <input 
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    className="solar-input"
                    placeholder="Enter access key"
                  />
                  {error && <p style={{ color: '#ef4444', fontSize: '0.85rem', margin: 0 }}>{error}</p>}
                </div>

                <button type="submit" className="solar-btn" style={{ marginTop: '1.5rem' }}>
                  Authenticate
                </button>
                

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <button className="reload-btn" onClick={startAnimation}>
        Animation dobara chalayein
      </button>
    </div>
  );
};

export default SolarLogin;
