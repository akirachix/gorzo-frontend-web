import React, { useEffect, useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
const SplashScreen = () => {
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  useEffect(() => {
    setFadeIn(true);
    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);
    const navigateTimer = setTimeout(() => {
      navigate("/welcome");
    }, 3500);
    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate]);
  return (
    <div className={`splash-container ${fadeIn ? 'fade-in' : ''} ${fadeOut ? 'fade-out' : ''}`}>
      <h1 className="haba-title">
        HABA <span className="light-text">HABA</span>
      </h1>
      <p className="splash-subtitle">Little by little, go digital.</p>
    </div>
  );
};
export default SplashScreen;