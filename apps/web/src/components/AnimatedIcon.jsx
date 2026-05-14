import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

const AnimatedIcon = ({ icon: Icon, className }) => {
  const iconRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!iconRef.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Find all path and line elements inside the icon
          const paths = iconRef.current.querySelectorAll('path, line, circle, rect, polygon, polyline');
          
          if (paths.length > 0) {
            anime({
              targets: paths,
              strokeDashoffset: [anime.setDashoffset, 0],
              easing: 'easeInOutSine',
              duration: 1500,
              delay: function(el, i) { return i * 150 },
              direction: 'alternate',
              loop: false
            });
            setHasAnimated(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(iconRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  return (
    <div ref={iconRef} className="flex items-center justify-center">
      <Icon className={className} />
    </div>
  );
};

export default AnimatedIcon;
