import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [valorantSensitivity, setValorantSensitivity] = useState<number>(0);
  const [csgoSensitivity, setCsgoSensitivity] = useState<number>(0);
  const [mouseDPI, setMouseDPI] = useState<number>(800);
  const [mouseCM, setMouseCM] = useState<number>(0);
  const [edpi, setEDPI] = useState<number>(0);

  const handleValorantSensitivityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valorantSensitivity = Number(event.target.value);
    const csgoSensitivity = (valorantSensitivity * 3.18181818) * (mouseDPI / 800);
    setCsgoSensitivity(Number(csgoSensitivity.toFixed(3)));
    setValorantSensitivity(valorantSensitivity);
    setMouseCM(Number(getMouseCM(csgoSensitivity, mouseDPI).toFixed(2)));
    setEDPI(getEDPI(mouseDPI, csgoSensitivity));
  };
  
  const handleCsgoSensitivityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const csgoSensitivity = Number(event.target.value);
    const valorantSensitivity = csgoSensitivity / 3.18181818;
    setCsgoSensitivity(csgoSensitivity);
    setValorantSensitivity(Number(valorantSensitivity.toFixed(3)));
    setMouseCM(Number(getMouseCM(csgoSensitivity, mouseDPI).toFixed(2)));
    setEDPI(getEDPI(mouseDPI, csgoSensitivity));
  };

  const handleMouseDPIChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMouseDPI(Number(event.target.value));
    setMouseCM(getMouseCM(csgoSensitivity, Number(event.target.value)));
    setEDPI(getEDPI(Number(event.target.value), csgoSensitivity));
  };

  const getMouseCM = (sensitivity: number, dpi: number) => {
    const radiansPerDegree = Math.PI / 180;
    const circumference = 2 * Math.PI * (10 / 2.54);
    const distance = (circumference * sensitivity) / dpi;
    const angleInRadians = 2 * Math.atan(distance / 2);
    const cmPerRadian = distance / angleInRadians;
    const cmPerDegree = cmPerRadian / radiansPerDegree;
    return 10 / cmPerDegree;
  };

  const getEDPI = (mouseDPI: number, sensitivity: number) => {
    return mouseDPI * sensitivity;
  };


  

return (
  <div className="App">
    <h1>CS:GO and Valorant Sensitivity Converter</h1>
    <div>
      <label>Valorant Sensitivity:</label>
      <input type="number" value={valorantSensitivity} onChange={handleValorantSensitivityChange} />
    </div>
    <div>
      <label>CS:GO Sensitivity:</label>
      <input type="number" value={csgoSensitivity} onChange={handleCsgoSensitivityChange} />
    </div>
    <div>
      <label>Mouse DPI:</label>
      <input type="number" value={mouseDPI} onChange={handleMouseDPIChange} />
    </div>
    <div>
      <label>eDPI:</label>
      <input type="number" value={edpi} disabled />
    </div>
  </div>
);
}

export default App;

