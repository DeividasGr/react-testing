import { useState } from 'react';
import './App.css';

export const replaceCamelWithSpaces = (colorName) => {
  const result = colorName.replace(/\B([A-Z])\B/g, ' $1');
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);

  return finalResult;
};

function App() {
  const [color, setColor] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const currentColor = color ? 'MidnightBlue' : 'MediumVioletRed';

  const handleButtonColor = () => {
    setColor(!color);
  };

  return (
    <div>
      <button
        onClick={handleButtonColor}
        style={{ backgroundColor: `${disabled ? 'gray' : currentColor}` }}
        disabled={disabled}
      >
        Change to{' '}
        {color
          ? replaceCamelWithSpaces('MediumVioletRed')
          : replaceCamelWithSpaces('MidnightBlue')}
      </button>
      <br />
      <label htmlFor="checkbox">Disable button</label>
      <input
        id="checkbox"
        defaultChecked={disabled}
        onChange={(e) => setDisabled(e.target.checked)}
        type="checkbox"
      />
    </div>
  );
}

export default App;
