import React, { useState, useRef, useEffect } from 'react';
import './Stopper.css';

function Stopper() {
  const [time, setTime] = useState({ hr: 0, min: 0, sec: 0, milli: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [flipSec, setFlipSec] = useState(false); // To trigger flip for seconds
  const intervalRef = useRef(null);

  useEffect(() => {
    if (flipSec) {
      // Remove the flip class after animation completes (100ms)
      const timeout = setTimeout(() => setFlipSec(false), 100);
      return () => clearTimeout(timeout); // Clear timeout if component unmounts or updates
    }
  }, [flipSec]);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          let { hr, min, sec, milli } = prevTime;
          milli += 1;

          if (milli === 70) {
            sec += 1;
            milli = 0;
            setFlipSec(true); // Trigger the flip when the seconds change
          }

          if (sec === 60) {
            min += 1;
            sec = 0;
            setFlipSec(true);
          }

          if (min === 60) {
            hr += 1;
            min = 0;
            setFlipSec(true);
          }

          return { hr, min, sec, milli };
        });
      }, 10); // Updates every 10ms
    }
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const restart = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime({ hr: 0, min: 0, sec: 0, milli: 0 });
  };


  return (
    <div className="stopper">
      <div className="timer-display">
        <span className="hours">{time.hr.toString().padStart(2, '0')}</span> :{' '}
        <span className="minutes">{time.min.toString().padStart(2, '0')}</span> :{' '}
        <span className={`seconds ${flipSec ? 'flip' : ''}`}>
          {time.sec.toString().padStart(2, '0')}
        </span>{' '}
      </div>

      <div>
        <button onClick={start} disabled={isRunning}>
          Start
        </button>
        <button onClick={stop} disabled={!isRunning}>
          Stop
        </button>
        <button onClick={restart}>Restart</button>
      </div>
    </div>
  );
}

export default Stopper;
