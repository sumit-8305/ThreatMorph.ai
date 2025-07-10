import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { ScrollControls, useScroll } from '@react-three/drei';
import * as THREE from 'three';

const RotatingWireframe = () => {
  const meshRef = useRef();
  const scroll = useScroll();

  useFrame(() => {
    const offset = scroll.offset;
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x += 0.002;
      meshRef.current.position.y = -offset * 10;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 2]}>
      <sphereGeometry args={[2, 20, 20]} />
      <meshBasicMaterial
        color="#40E0D0"
        wireframe
        side={THREE.FrontSide}
        toneMapped={false}
      />
    </mesh>
  );
};

const WireframeScene = () => {
  return (
    <div className="absolute top-0 left-0 w-[65vw] h-[65vh] md:w-[60vw] md:h-[60vh] z-0 pointer-events-none overflow-hidden">
      <Canvas
        className="w-full h-full"
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <ScrollControls pages={3} damping={4}>
          <RotatingWireframe />
        </ScrollControls>
      </Canvas>
    </div>
  );
};

export default WireframeScene;
