//imported Hooks
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';


const BgOverlay = () => {
   const [position, setPosition] = useState({ x: 0, y: 0 });
   const [isSpinning, setSpinning] = useState(true);
   const handleClick = () => {
    setSpinning(!isSpinning);
  };
   const [isOn, setIsOn] = useState(false);
   const toggleSwitch = () => setIsOn(!isOn);
   const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
  };
   useEffect(() => {
      const updatePosition = e => {
        setTimeout(() => {
          setPosition({ x: e.clientX, y: e.clientY });
        }, 100);
      };
      window.addEventListener('mousemove', updatePosition);
      return () => window.removeEventListener('mousemove', updatePosition);
    }, []);
   return (
        <>
          <div className={isSpinning ? 'isSpinning' : ''} 
          style={{ position: 'fixed', left: position.x, top: position.y }}
          >
          </div>
          <div className='onOff'>
            <p>Spinning On/Off</p>
            <div className="switch" data-isOn={isOn} onClick={toggleSwitch}>
              <motion.button className="handle" onClick={handleClick} data-isOn={isOn}layout transition={spring}>
                <i className="fa-solid  fa-plug-circle-plus on" data-isOn={isOn}></i>
                <i className="fa-solid fa-plug-circle-xmark off" data-isOn={isOn}></i>
                </motion.button>
            </div>
          </div>
        </>
   )
}


export default BgOverlay;