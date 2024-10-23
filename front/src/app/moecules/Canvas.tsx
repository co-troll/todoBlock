"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { FormEvent, FormEventHandler, Suspense, useEffect, useRef, useState } from "react";
import Group from "../components/Group";
import Cube, { CubeDiffculty, CubeDiffcultyKeys, CubeLength, CubePosition, CubeType } from "../components/Cube";
import { Box, CameraControls, OrbitControls, OrthographicCamera, useTrail, SoftShadows } from "@react-three/drei";
import Book from "../components/Group";
import { Physics, RigidBody } from "@react-three/rapier";
import Camera from "../components/Camera";
import DraggableRigidBody, { DraggableRigidBodyProps } from "../components/DraggableRigidBody";

export default function Board () {
  const [bookList, setBookList] = useState<Array<{name: string, level: CubeDiffcultyKeys}>>([]);
  const [books, setBooks] = useState<Array<JSX.Element>>([]);
  const [position, setPosition] = useState<number>(2);
  const [clickScreenY, setClickScreenY] = useState<number>(0);
  const [moveScreenY, setMoveScreenY] = useState<number>(0);

  // const bookList = ["11", "22", "33", "44"];
  
  useEffect(() => {
    setTimeout(() => {
      if (books.length >= bookList.length) {
          return;
      }
      setBooks([...books, <Book key={`Book-${books.length}`} name={`${bookList[books.length].name}`} parentFunc={parentFunc} position={position} difficulty={bookList[books.length].level} />])
      setPosition(position + 1.4);
    }, 100)
  }, [books])

  const parentFunc = (data: string) => {
    console.log(data);
    bookList.splice(bookList.findIndex((value) => value.name === data), 1);
    setBooks([]);
    setPosition(2);
    setBookList([...bookList]);
  }

  const handleCreateButton = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { task, level } = e.currentTarget;
    setBooks([]);
    setPosition(2);
    setBookList([...bookList, { name: task.value, level: level.value }]);
    // setBooks([...books, <Book key={`Book-${books.length}`} name={`Book-${books.length}`} position={position} difficulty={CubeDiffculty.EASY} />])
    // setPosition(position + 0.8);
  }

  return (
    <div className="h-[80vh] flex flex-col">
      <Canvas 
        shadows
        onTouchStart={(e) => {setClickScreenY(e.changedTouches[0]?.screenY)}} 
        onTouchMove={(e) => setMoveScreenY(e.changedTouches[0]?.screenY)}
      >
        <Camera clickScreenY={clickScreenY} moveScreenY={moveScreenY} />
        {/* <CameraControls ref={cameraControlRef} /> */}
        {/* <axesHelper args={[5]} />
        <gridHelper args={[20, 20, 0xff0000, 'teal']} /> */}
        <color attach={"background"} args={["beige"]} />
        <ambientLight intensity={1} />
        <directionalLight color={"white"} position={[-20, 20, 20]} castShadow />
        <Physics>
          {books}
          <RigidBody type="fixed" >
            <Box position={[0, -5, 0]} args={[20, 1, 20]} receiveShadow>
              <meshStandardMaterial color="springgreen" />
            </Box>
          </RigidBody>
        </Physics>
      </Canvas>
      <form
        onSubmit={handleCreateButton}
      >
        <input type="radio"  name="level" value={CubeDiffculty.EASY} defaultChecked />
        <label>쉬움</label>
        <input type="radio" name="level" value={CubeDiffculty.NORMAL} />
        <label>보통</label>
        <input type="radio" name="level" value={CubeDiffculty.HARD} />
        <label>어려움</label>
        <input type="radio" name="level" value={CubeDiffculty.EXTRA} />
        <label>매우 어려움</label>
        <input type="text" name="task" />
        <button type="submit">제출</button>
      </form>
      {/* <button onClick={handleCreateButton}>생성</button> */}
    </div>
  );
}