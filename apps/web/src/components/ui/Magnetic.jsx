import React, { useRef, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion';

export default function Magnetic({ children }) {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX, y: middleY });
    }

    const reset = () => setPosition({ x: 0, y: 0 });

    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const x = useSpring(position.x, springConfig);
    const y = useSpring(position.y, springConfig);

    return (
        <motion.div
            style={{ position: "relative", x, y }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
        >
            {children}
        </motion.div>
    )
}