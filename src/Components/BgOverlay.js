//imported Hooks
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';


const BgOverlay = () => {
   const [position, setPosition] = useState({ x: 0, y: 0 });
   const [isSpinning, setSpinning] = useState(true);
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
        </>
   )
}


export default BgOverlay;