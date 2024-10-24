"use client"

import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";

const BOOK_SIZE = 7 as const;
const BOOK_HEIGHT = 1.4 as const;
const FLOOR_HEIGHT = 0.15 as const;

export const CubeType = {
  FLOOR: [BOOK_SIZE, FLOOR_HEIGHT, BOOK_SIZE],
  WALL: [FLOOR_HEIGHT, BOOK_HEIGHT, BOOK_SIZE],
  CENTER: [(BOOK_SIZE - FLOOR_HEIGHT), (BOOK_HEIGHT - FLOOR_HEIGHT), (BOOK_SIZE - FLOOR_HEIGHT)],
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
  FLOOR: [0, (FLOOR_HEIGHT / 2), 0],
  WALL: [-(BOOK_SIZE / 2 - FLOOR_HEIGHT / 2), (BOOK_HEIGHT / 2), 0],
  CENTER: [0, (BOOK_HEIGHT / 2), 0],
  TOP: [0, (BOOK_HEIGHT - (FLOOR_HEIGHT / 2)), 0]
} as const;
type CubePositionKeys = (typeof CubePosition)[keyof typeof CubePosition]; 

export const CubeDiffculty = {
  EASY : "#98fb98",
  NORMAL : "#F8D800",
  HARD : "#EA5455"
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

  const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; //한글

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
        castShadow
        receiveShadow
      >
        <boxGeometry  args={[...props.type]} />
        {props.type === CubeType.WALL ? 
        <Text 
          scale={[0.7, 0.7, 0.7]} 
          position={[-0.1, 0, 0]} 
          rotation={[THREE.MathUtils.degToRad(0), THREE.MathUtils.degToRad(-90), THREE.MathUtils.degToRad(0)]}
          color={"black"}
        >
          {
            korean.test(props.name!) ? 
            props.name!.length > 10 ? props.name!.substring(0, 9) + "..." : props.name! : 
            props.name!.length > 15 ? props.name!.substring(0, 14) + "..." : props.name!
          }
        </Text> : <></>}
        <meshStandardMaterial color={props.type === CubeType.CENTER ? "white" : props.diff} roughness={100}/>
      </mesh>
    </>
  );
}

export default Cube;