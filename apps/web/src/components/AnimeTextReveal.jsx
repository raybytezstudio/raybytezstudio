import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const AnimeTextReveal = ({ text, className, delayOffset = 0 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Split text into words, and words into letters, preserving spaces
    if (!containerRef.current) return;
    
    // Clear previous content
    containerRef.current.innerHTML = '';
    
    const words = text.split(' ');
    
    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.whiteSpace = 'nowrap';
      
      word.split('').forEach((letter) => {
        const letterSpan = document.createElement('span');
        letterSpan.textContent = letter;
        letterSpan.style.display = 'inline-block';
        letterSpan.style.opacity = '0';
        letterSpan.classList.add('anime-letter');
        wordSpan.appendChild(letterSpan);
      });
      
      containerRef.current.appendChild(wordSpan);
      
      // Add space after word if it's not the last word
      if (wordIndex < words.length - 1) {
        const spaceSpan = document.createElement('span');
        spaceSpan.innerHTML = '&nbsp;';
        spaceSpan.style.display = 'inline-block';
        containerRef.current.appendChild(spaceSpan);
      }
    });

    const animation = anime.timeline({ loop: false })
      .add({
        targets: containerRef.current.querySelectorAll('.anime-letter'),
        translateY: [40, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 1200,
        delay: (el, i) => delayOffset + 30 * i
      });

    return () => {
      animation.pause();
    };
  }, [text]);

  return (
    <span ref={containerRef} className={className} />
  );
};

export default AnimeTextReveal;
