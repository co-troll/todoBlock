"use client"

import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";

export const CubeType = {
  FLOOR: [5, 0.1, 5],
  WALL: [0.1, 0.8, 5],
  CENTER: [4.9, 0.7, 4.9],
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
  WALL: [-2.5, 0.4, 0],
  CENTER: [0, 0.4, 0],
  TOP: [0, 0.75, 0]
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
  name? : string;
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
        {props.type === CubeType.WALL ? 
        <Text 
          scale={[0.5, 0.5, 0.5]} 
          position={[-0.1, 0, 0]} 
          rotation={[THREE.MathUtils.degToRad(0), THREE.MathUtils.degToRad(-90), THREE.MathUtils.degToRad(0)]}
          color={"black"}
        >
          {props.name}
        </Text> : <></>}
        <meshStandardMaterial color={props.type === CubeType.CENTER ? "white" : props.diff} roughness={100}/>
      </mesh>
    </>
  );
}

export default Cube;