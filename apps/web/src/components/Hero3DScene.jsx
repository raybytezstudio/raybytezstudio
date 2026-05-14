import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

const TechCore = () => {
  const coreRef = useRef();
  const wireframeRef = useRef();

  // Fast, lightweight 128x128 tech pattern that animates
  const surfaceTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = '#220000'; // Deep rich red-black
    ctx.fillRect(0, 0, 128, 128);
    
    // Abstract circuit grid - very bright blocks
    ctx.fillStyle = '#FF2200'; // Intense pure red-orange
    for(let i = 0; i < 128; i += 16) {
      for(let j = 0; j < 128; j += 16) {
        if(Math.random() > 0.6) { // Less blocks, but they stand out more
          ctx.fillRect(i, j, 8, 8);
        }
      }
    }
    
    // Intense crisp lines
    ctx.strokeStyle = '#FF6B35'; // Agency vibrant orange
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.8;
    for(let i = 0; i <= 128; i += 32) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 128);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(128, i);
      ctx.stroke();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    // Repeat pattern slightly to wrap around nicely
    texture.repeat.set(3, 2);
    return texture;
  }, []);

  // Gritty micro-surface noise for physical roughness
  const noiseTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(128, 128);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const v = Math.random() * 255;
      imageData.data[i] = v;
      imageData.data[i+1] = v;
      imageData.data[i+2] = v;
      imageData.data[i+3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    return texture;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.x = time * 0.05;
      coreRef.current.rotation.y = time * 0.08;
      // Very subtle, almost static pulse
      const scale = 1 + Math.sin(time) * 0.02;
      coreRef.current.scale.set(scale, scale, scale);
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = time * -0.05;
      wireframeRef.current.rotation.y = time * -0.08;
    }
    // Very slow texture scroll so it doesn't distract
    if (surfaceTexture) {
      surfaceTexture.offset.x = time * 0.02;
      surfaceTexture.offset.y = time * 0.01;
    }
  });

  return (
    <group position={[3, 0, 0]}>
      {/* Solid Inner Core */}
      <mesh ref={coreRef}>
        {/* Icosahedron with high detail creates beautiful faceted triangles */}
        <icosahedronGeometry args={[1.5, 12]} />
        <meshStandardMaterial 
          color="#FF3300" // Deep saturated red-orange
          emissive="#FF4400" // Rich emissive (not too high to prevent turning white)
          emissiveIntensity={1.5}
          roughness={0.3} // Glossier to catch sharp, rich highlights
          metalness={1.0} // Fully metallic for maximum contrast
          map={surfaceTexture}
          bumpMap={surfaceTexture}
          bumpScale={0.6} // Massive bump scale so texture physically pops
          roughnessMap={noiseTexture}
          flatShading={true}
        />
      </mesh>
      
      {/* Outer Wireframe Shell */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[2.2, 2]} />
        <meshBasicMaterial 
          color="#ffffff" 
          wireframe={true} 
          transparent 
          opacity={0.15} 
        />
      </mesh>
    </group>
  );
};

const ParticleField = ({ count = 2000 }) => {
  const pointsRef = useRef();
  
  // Generate random positions
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      // Very slow drift
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.01;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.005;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#FF8844"
        transparent
        opacity={0.8}
        sizeAttenuation={true}
      />
    </points>
  );
};

const FloatingObjects = ({ count = 30 }) => {
  const objects = useMemo(() => {
    const temp = [];
    const geometries = ['box', 'torus', 'octahedron', 'tetrahedron'];
    for (let i = 0; i < count; i++) {
      temp.push({
        id: i,
        type: geometries[Math.floor(Math.random() * geometries.length)],
        position: [
          (Math.random() - 0.5) * 30, // Spread wide
          (Math.random() - 0.5) * 20, // Spread tall
          (Math.random() - 0.5) * 20 - 15 // Push deep into the background
        ],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ],
        scale: Math.random() * 2.5 + 0.5,
        speed: Math.random() * 0.3 + 0.1, // Much slower
        isWireframe: Math.random() > 0.4
      });
    }
    return temp;
  }, [count]);

  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const obj = objects[i];
        child.rotation.x += 0.001 * obj.speed;
        child.rotation.y += 0.002 * obj.speed;
        // Very slow float
        child.position.y += Math.sin(state.clock.getElapsedTime() * obj.speed * 0.2 + i) * 0.002;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {objects.map((obj) => {
        let geometry;
        if (obj.type === 'box') geometry = <boxGeometry args={[1, 1, 1]} />;
        else if (obj.type === 'torus') geometry = <torusGeometry args={[0.7, 0.2, 16, 32]} />;
        else if (obj.type === 'octahedron') geometry = <octahedronGeometry args={[1]} />;
        else geometry = <tetrahedronGeometry args={[1]} />;
        
        return (
          <mesh
            key={obj.id}
            position={obj.position}
            rotation={obj.rotation}
            scale={obj.scale}
          >
            {geometry}
            <meshStandardMaterial 
              color={obj.isWireframe ? "#ffffff" : "#FF6B35"} 
              transparent 
              opacity={obj.isWireframe ? 0.3 : 0.5} 
              wireframe={obj.isWireframe}
              roughness={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
};

const Hero3DScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} className="w-full h-full pointer-events-auto">
        <ambientLight intensity={0.5} />
        {/* Warm, rich lighting so the colors don't wash out to white */}
        <directionalLight position={[10, 10, 10]} intensity={2.5} color="#FF8844" />
        <directionalLight position={[-10, -10, -10]} intensity={2.5} color="#FF1100" />
        
        <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <TechCore />
        </Float>
        
        <FloatingObjects count={25} />
        <ParticleField count={1000} />
      </Canvas>
    </div>
  );
};

export default Hero3DScene;
