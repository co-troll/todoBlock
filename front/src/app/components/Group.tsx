import * as THREE from "three";
import Cube, { CubeLength, CubePosition, CubeType, CubeDiffculty, CubeDiffcultyKeys } from "./Cube";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { RigidBody } from "@react-three/rapier";

const Book = ({ id, difficulty, position, name, parentFunc } : { id: number, difficulty : CubeDiffcultyKeys, position: number, name: string, parentFunc: (data: string) => void }) => {
  const group = useRef<THREE.Group>(null!);
  useFrame(() => {
    // group.current.rotation.y += 0.02;
  })
  
  const handleClick = (event : ThreeEvent<MouseEvent>) => {
    // setFocus(true);
    event.stopPropagation();
    console.log(event.eventObject);
    parentFunc(event.eventObject.parent?.name!)
  }

  return (
    // <DraggableRigidBody groupProps={ { position: [0, position, 0]  }} {...DraggableRigidBodyProps} visibleMesh={
      // <RigidBody name={String(id)} onCollisionEnter={(payload) => payload.target.rigidBody?.setBodyType(2, true)}>
      <RigidBody name={String(id)} onCollisionEnter={(payload) => {if (payload.rigidBody?.bodyType() == 1) { payload.target.rigidBody?.setBodyType(1, true)}}}>
        <group onClick={handleClick}  ref={group} rotation={[0, THREE.MathUtils.degToRad(Math.floor(Math.random() * 2) * 90 + 90), 0]} position={[0, position, 0]} scale={[1,1,1]} >
            {/* <CuboidCollider args={[2, 0.1, 2]} /> */}
            <Cube type={CubeType.FLOOR} position={CubePosition.FLOOR} length={CubeLength.SMALL} diff={difficulty} /> 
            <Cube type={CubeType.WALL} position={CubePosition.WALL} length={CubeLength.SMALL} diff={difficulty} name={name} /> 
            <Cube type={CubeType.CENTER} position={CubePosition.CENTER} length={CubeLength.SMALL} /> 
            <Cube type={CubeType.FLOOR} position={CubePosition.TOP} length={CubeLength.SMALL} diff={difficulty} /> 
            {/* <CuboidCollider args={[2, 0.3, 2]} position={[0, 0.2, 0]}/> */}
        </group>
      </RigidBody>
    // }/>
  );
}

export default Book;