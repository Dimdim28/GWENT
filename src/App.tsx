import { useEffect } from "react";
import "./App.css"
import { ChooseFraction } from "./pages";

function App() {
  const updateAppHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
  }

  window.onload = function () {
    updateAppHeight();
  }

  useEffect(() => {
    window.addEventListener('resize', updateAppHeight);
    window.addEventListener('load', updateAppHeight)

    return () => {
      window.removeEventListener('load', updateAppHeight);
      window.removeEventListener('resize', updateAppHeight)
    }
  }, [])

  return (
    <>
      <ChooseFraction />
    </>
  )
}

export default App
