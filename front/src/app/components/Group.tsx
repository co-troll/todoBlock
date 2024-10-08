import * as THREE from "three";
import Cube, { CubeLength, CubePosition, CubeType, CubeDiffculty, CubeDiffcultyKeys } from "./Cube";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Book = ({ position, rotation, difficulty } : { position : number, rotation : number, difficulty : CubeDiffcultyKeys }) => {
  const group = useRef<THREE.Group>(null!);
  useFrame(() => {
    // group.current.rotation.y += 0.02;
  })
  return (
    <group ref={group} rotation={[0, position * THREE.MathUtils.degToRad(90) + THREE.MathUtils.degToRad(rotation), 0]} position={[0, position - 7, 0]} scale={[1, 1, 1]} >
        <Cube type={CubeType.FLOOR} position={CubePosition.FLOOR} length={CubeLength.SMALL} diff={difficulty} /> 
        <Cube type={CubeType.WALL} position={CubePosition.WALL} length={CubeLength.SMALL} diff={difficulty} /> 
        <Cube type={CubeType.CENTER} position={CubePosition.CENTER} length={CubeLength.SMALL} /> 
        <Cube type={CubeType.FLOOR} position={CubePosition.TOP} length={CubeLength.SMALL} diff={difficulty} /> 
    </group>
  );
}

export default Book;