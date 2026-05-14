import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = [
  "DESIGN",
  "DEVELOP",
  "DEPLOY"
];

const chars = "!<>-_\\/[]{}—=+*^?#_";

const DecryptText = ({ word }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(
        word
          .split("")
          .map((letter, index) => {
            if (index < iterations) return letter;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iterations >= word.length) {
        clearInterval(interval);
      }

      iterations += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [word]);

  return <span>{displayText}</span>;
};

const ScreenLoader = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setIndex((prev) => {
        if (prev >= words.length - 1) {
          clearInterval(wordInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 400); // Give it a moment at 100% before triggering exit
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    return () => {
      clearInterval(wordInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-primary font-mono"
    >
      <div className="absolute top-8 left-8 text-xs tracking-widest opacity-50">
        RAYBYTEZ_SYS // INITIALIZING
      </div>

      <div className="text-4xl md:text-6xl font-black tracking-tighter mb-12 flex items-center">
        <motion.span 
          animate={{ opacity: [1, 0, 1] }} 
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="mr-4"
        >
          _
        </motion.span>
        <DecryptText key={index} word={words[index]} />
      </div>

      <div className="w-64 max-w-[80vw] flex flex-col gap-2">
        <div className="flex justify-between text-xs tracking-wider opacity-70">
          <span>LOADING [{progress}%]...</span>
          <span>{progress === 100 ? 'SYSTEM READY' : ''}</span>
        </div>
        <div className="h-1 w-full bg-white/10 overflow-hidden">
          <div 
            className="h-full bg-primary" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ScreenLoader;
