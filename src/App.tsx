import { useState } from 'react';
import './App.css';

function App() {
  const [valorantSensitivity, setValorantSensitivity] = useState<number>(0);
  const [csgoSensitivity, setCsgoSensitivity] = useState<number>(0);
  const [mouseDPI, setMouseDPI] = useState<number>(800);
  const [edpi, setEDPI] = useState<number>(0);

  const handleValorantSensitivityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valorantSensitivity = Number(event.target.value);
    const csgoSensitivity = (valorantSensitivity * 3.18181818) * (mouseDPI / 800);
    setCsgoSensitivity(Number(csgoSensitivity.toFixed(3)));
    setValorantSensitivity(valorantSensitivity);
    setEDPI(getEDPI(mouseDPI, csgoSensitivity));
  };
  
  const handleCsgoSensitivityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const csgoSensitivity = Number(event.target.value);
    const valorantSensitivity = csgoSensitivity / 3.18181818;
    setCsgoSensitivity(csgoSensitivity);
    setValorantSensitivity(Number(valorantSensitivity.toFixed(3)));
    setEDPI(getEDPI(mouseDPI, csgoSensitivity));
  };

  const handleMouseDPIChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMouseDPI(Number(event.target.value));
    setEDPI(getEDPI(Number(event.target.value), csgoSensitivity));
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
      <label>Mouse DPI: <span style={{color:"red"}}>(If change, please re-enter sensitivity) </span></label>
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

