import { useEffect } from 'react';

import { ChooseFraction } from './pages';

import './App.css';

function App() {
  const updateAppHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
  };

  window.onload = function () {
    updateAppHeight();
  };

  useEffect(() => {
    window.addEventListener('resize', updateAppHeight);
    window.addEventListener('load', updateAppHeight);

    return () => {
      window.removeEventListener('load', updateAppHeight);
      window.removeEventListener('resize', updateAppHeight);
    };
  }, []);

  return (
    <>
      <ChooseFraction />
    </>
  );
}

export default App;
