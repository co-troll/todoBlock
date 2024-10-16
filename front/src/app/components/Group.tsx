import * as THREE from "three";
import Cube, { CubeLength, CubePosition, CubeType, CubeDiffculty, CubeDiffcultyKeys } from "./Cube";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { RefObject, useRef, useState } from "react";
import { DragControls, OrbitControls, Text } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import DraggableRigidBody, { DraggableRigidBodyProps } from "./DraggableRigidBody";

const Book = ({ difficulty, position, name } : { difficulty : CubeDiffcultyKeys, position: number, name: string }) => {
  const group = useRef<THREE.Group>(null!);
  const [hasFocus, setFocus] = useState(false);
  useFrame(() => {
    // group.current.rotation.y += 0.02;
  })
  
  const handleClick = (event : ThreeEvent<MouseEvent>) => {
    // setFocus(true);
    event.stopPropagation();
    console.log(event.eventObject.parent);
    event.eventObject.parent!.visible = false;
  }

  const DraggableRigidBodyProps: Partial<DraggableRigidBodyProps> = {
    rigidBodyProps: {
      gravityScale: 3.5,
      linearDamping: 5,
      angularDamping: 0.2,
      colliders: "cuboid",
      onCollisionEnter: (payload) => payload.target.rigidBody?.setBodyType(2, false),
      
    },
    dragControlsProps: {
      preventOverlap: true,
      
    },
  };

  return (
    // <DraggableRigidBody groupProps={ { position: [0, position, 0]  }} {...DraggableRigidBodyProps} visibleMesh={
      <RigidBody name={name} onCollisionEnter={(payload) => payload.target.rigidBody?.setBodyType(2, true)}>
        <group ref={group} rotation={[0, THREE.MathUtils.degToRad(Math.floor(Math.random() * 2) * 90 + 90), 0]} position={[0, 0, 0]} scale={[1,1,1]} >
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