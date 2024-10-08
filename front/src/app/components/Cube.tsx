"use client"

import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";

export const CubeType = {
  FLOOR: [4, 0.1, 4],
  WALL: [0.1, 0.5, 4],
  CENTER: [3.9, 0.4, 3.9],
} as const;
type CubeTypeKeys = (typeof CubeType)[keyof typeof CubeType];

export const CubeLength = {
  SMALL: 1,
  MEDIUM: 2,
  BIG: 3,
  LARGE: 4
} as const;
type CubeLengthKeys = (typeof CubeLength)[keyof typeof CubeLength]; 

export const CubePosition = {
  FLOOR: [0, 0.05, 0],
  WALL: [-2, 0.25, 0],
  CENTER: [0, 0.25, 0],
  TOP: [0, 0.45, 0]
} as const;
type CubePositionKeys = (typeof CubePosition)[keyof typeof CubePosition]; 

export const CubeDiffculty = {
  EASY : "#0396FF",
  NORMAL : "#98fb98",
  HARD : "#F8D800",
  EXTRA : "#EA5455"
} as const;
export type CubeDiffcultyKeys = (typeof CubeDiffculty)[keyof typeof CubeDiffculty]; 

export const CubeTheme = {
  DEFAULT: '',
  WARNING: ''
} as const;
type CubeThemeKeys = (typeof CubeTheme)[keyof typeof CubeTheme];

interface Props {
  className?: string;
  type: CubeTypeKeys;
  length: CubeLengthKeys;
  position: CubePositionKeys;
  theme?: CubeThemeKeys;
  diff? : CubeDiffcultyKeys;
}

const Cube = (props: Props) => {
  const mesh = useRef<THREE.Mesh>(null!);
  useFrame(() => {
    // mesh.current.rotation.z += 0.025;
  })

  return (
    <>
      <mesh 
        ref={mesh}
        position={[...props.position]}
        scale={[1, 1, 1]}
        rotation={[
          THREE.MathUtils.degToRad(0),
          THREE.MathUtils.degToRad(0),
          THREE.MathUtils.degToRad(0),
        ]}
        
      >
        <boxGeometry args={[...props.type]} />
        <meshStandardMaterial color={props.type === CubeType.CENTER ? "white" : props.diff} roughness={100}/>
      </mesh>
    </>
  );
}

export default Cube;