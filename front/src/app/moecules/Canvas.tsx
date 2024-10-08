"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import Group from "../components/Group";
import Cube, { CubeDiffculty, CubeLength, CubePosition, CubeType } from "../components/Cube";
import { CameraControls, OrbitControls, useTrail } from "@react-three/drei";
import Book from "../components/Group";

export default function Board () {
  const [position, setPosition] = useState(0);
  const [rotation, setRotation] = useState(0);
  const cameraControlRef = useRef<CameraControls>(null!);

  const handleUpButton = () => {
    setPosition(position + 1);
  }

  const handleDownButton = () => {
    position > 0 ? setPosition(position - 1) : "";
  }

  const handleRotateButton = () => {
    rotation >= 270 ? setRotation(0) : setRotation(rotation + 90);
  }


  const RenderBooks = (count : number) => {
    const arr = [];
    for (let i = 0; i < count * 4; i = i + 4) {
      arr.push(<Book position={i + position} rotation={rotation} key={`Book-${i}`} difficulty={CubeDiffculty.EASY} />);
      arr.push(<Book position={i + position + 1} rotation={rotation} key={`Book-${i + 1}`} difficulty={CubeDiffculty.NORMAL} />);
      arr.push(<Book position={i + position + 2} rotation={rotation} key={`Book-${i + 2}`} difficulty={CubeDiffculty.HARD} />);
      arr.push(<Book position={i + position + 3} rotation={rotation} key={`Book-${i + 3}`} difficulty={CubeDiffculty.EXTRA} />);
    }
    return arr;
  }

  return (
    <div className="h-screen">
      <Canvas orthographic camera={{
          zoom: 30,
          far: 1000,
          position: [10, 5 , 10],
        }}>
        {/* <CameraControls ref={cameraControlRef} /> */}
        {/* <OrbitControls/> */}
        {/* <axesHelper args={[5]} />
        <gridHelper args={[20, 20, 0xff0000, 'teal']} /> */}
        <color attach={"background"} args={["beige"]} />
        <ambientLight intensity={1} />
        <directionalLight color={"white"} position={[-5, 5, 5]} />
        {RenderBooks(5)}
      </Canvas>
      <button onClick={handleUpButton}>상승</button>
      <button onClick={handleDownButton}>하강</button>
      <button onClick={handleRotateButton}>회전</button>
    </div>
  );
}