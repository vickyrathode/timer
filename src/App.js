import { useState } from 'react';
import './App.css';
import Stopper from './components/Stopper';

function App() {
  const [darkMode, setDarkMode] = useState(false); // For dark mode toggle

  const dark = () => {
    setDarkMode(prevMode => !prevMode); // Toggle dark mode
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <button onClick={dark} className='btn'>
        {!darkMode ? "Dark Mode" : "Light Mode"}
      </button>
      <Stopper />
    </div>
  );
}

export default App;
