import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const LINES = [
  { prefix: '$ ', text: 'initializing raybytez-stack...', color: 'text-muted-foreground' },
  { prefix: '✓ ', text: 'backend deployed — 0ms cold start', color: 'text-green-400' },
  { prefix: '✓ ', text: 'frontend bundle: 38kb gzipped', color: 'text-green-400' },
  { prefix: '✓ ', text: 'SSL & CDN configured', color: 'text-green-400' },
  { prefix: '$ ', text: 'running security audit...', color: 'text-muted-foreground' },
  { prefix: '✓ ', text: 'zero vulnerabilities found', color: 'text-green-400' },
  { prefix: '$ ', text: 'awaiting next mission_', color: 'text-primary' },
];

const CHAR_SPEED = 35;   // ms per character
const LINE_PAUSE = 400;  // ms between lines

export default function TerminalTicker() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentText, setCurrentText] = useState('');
  const [blink, setBlink] = useState(true);
  const timeout = useRef(null);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 500);
    return () => clearInterval(id);
  }, []);

  // Typewriter engine
  useEffect(() => {
    if (lineIndex >= LINES.length) {
      // All lines done — restart after a pause
      timeout.current = setTimeout(() => {
        setDisplayedLines([]);
        setCurrentText('');
        setLineIndex(0);
        setCharIndex(0);
      }, 2500);
      return;
    }

    const line = LINES[lineIndex];
    const fullText = line.prefix + line.text;

    if (charIndex < fullText.length) {
      timeout.current = setTimeout(() => {
        setCurrentText(fullText.slice(0, charIndex + 1));
        setCharIndex(c => c + 1);
      }, CHAR_SPEED);
    } else {
      // Line done — commit it and move to next
      timeout.current = setTimeout(() => {
        setDisplayedLines(prev => [...prev, { text: fullText, color: line.color }]);
        setCurrentText('');
        setCharIndex(0);
        setLineIndex(l => l + 1);
      }, LINE_PAUSE);
    }

    return () => clearTimeout(timeout.current);
  }, [lineIndex, charIndex]);

  const currentLine = LINES[lineIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="mt-14 bg-card/60 backdrop-blur-sm border border-white/10 rounded-xl p-5 font-mono text-sm max-w-xl shadow-premium"
    >
      {/* Terminal header bar */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-3 text-xs text-muted-foreground tracking-widest uppercase">raybytez-deploy</span>
      </div>

      {/* Committed lines */}
      <div className="space-y-1">
        {displayedLines.map((line, i) => (
          <div key={i} className={`${line.color} leading-relaxed`}>
            {line.text}
          </div>
        ))}

        {/* Currently typing line */}
        {lineIndex < LINES.length && (
          <div className={`${currentLine?.color ?? 'text-muted-foreground'} leading-relaxed`}>
            {currentText}
            <span className={`inline-block w-2 h-4 bg-primary ml-0.5 align-middle transition-opacity ${blink ? 'opacity-100' : 'opacity-0'}`} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
