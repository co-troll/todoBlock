"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import Group from "../components/Group";
import Cube, { CubeDiffculty, CubeLength, CubePosition, CubeType } from "../components/Cube";
import { Box, CameraControls, OrbitControls, OrthographicCamera, useTrail } from "@react-three/drei";
import Book from "../components/Group";
import { Physics, RigidBody } from "@react-three/rapier";
import Camera from "../components/Camera";

export default function Board () {
  const [books, setBooks] = useState<Array<JSX.Element>>([]);
  const [position, setPosition] = useState<number>(2);
  const [clickScreenY, setClickScreenY] = useState<number>(0);
  const [moveScreenY, setMoveScreenY] = useState<number>(0);

  const handleCreateButton = () => {
    setBooks([...books, <Book key={`Book-${books.length}`} name={`Book-${books.length}`} position={position} difficulty={CubeDiffculty.EASY} />])
    setPosition(position + 0.8);
  }

  return (
    <div className="h-[60vh] flex flex-col">
      <Canvas 
        onTouchStart={(e) => setClickScreenY(e.changedTouches[0].screenY)} 
        onTouchMove={(e) => setMoveScreenY(e.changedTouches[0].screenY)}
      >
        <Camera clickScreenY={clickScreenY} moveScreenY={moveScreenY} />
        {/* <CameraControls ref={cameraControlRef} /> */}
        {/* <axesHelper args={[5]} />
        <gridHelper args={[20, 20, 0xff0000, 'teal']} /> */}
        <color attach={"background"} args={["beige"]} />
        <ambientLight intensity={1} />
        <directionalLight color={"white"} position={[-20, 20, 20]} />
        <Suspense>
          <Physics debug>
            {books}
            <RigidBody type="fixed">
              <Box position={[0, -5, 0]} args={[20, 1, 20]} >
                <meshStandardMaterial color="springgreen" />
              </Box>
            </RigidBody>
          </Physics>
        </Suspense> 
      </Canvas>
      <button onClick={handleCreateButton}>생성</button>
    </div>
  );
}