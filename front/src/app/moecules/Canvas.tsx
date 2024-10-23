"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { FormEvent, FormEventHandler, Suspense, use, useEffect, useRef, useState } from "react";
import Group from "../components/Group";
import Cube, { CubeDiffculty, CubeDiffcultyKeys, CubeLength, CubePosition, CubeType } from "../components/Cube";
import { Box, CameraControls, OrbitControls, OrthographicCamera, useTrail, SoftShadows } from "@react-three/drei";
import Book from "../components/Group";
import { Physics, RigidBody } from "@react-three/rapier";
import Camera from "../components/Camera";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Board ({ todolist }: { todolist: [{id: number, content: string, dateArr: string[], difficulty: CubeDiffcultyKeys}] }) {
  // const [bookList, setBookList] = useState<Array<{name: string, level: CubeDiffcultyKeys}>>([]);
  const [bookList, setBookList] = useState<[{id: number, content: string, dateArr: string[], difficulty: CubeDiffcultyKeys}] | []>([]);
  const [books, setBooks] = useState<Array<JSX.Element>>([]);
  const [position, setPosition] = useState<number>(2);
  const [clickScreenY, setClickScreenY] = useState<number>(0);
  const [moveScreenY, setMoveScreenY] = useState<number>(0);
  const router = useRouter();
  const [init, setInit] = useState<boolean>(true);

  // const bookList = ["11", "22", "33", "44"];

  useEffect(()=>{
    console.log(todolist.length, 11)
    if(todolist.length > 0) {
      setTimeout(()=>{
      }, 1000);
      setBookList(todolist);
    }
  }, [todolist])
  
  useEffect(()=>{
    if(bookList.length > 0 && init) {
      console.log(133)
      setBooks([<Book key={`Book-${0}`} id={bookList[0]!.id} name={`${bookList[0]!.content}`} parentFunc={parentFunc} position={position} difficulty={bookList[0]!.difficulty} />])
      setPosition(position + 1.4);
      setInit(false);
    }
  }, [bookList])

  useEffect(() => {
    setTimeout(() => {
      console.log(books.length)
      if (books.length >= bookList.length || books.length == 0) {
          return;
      }
      setBooks([...books, <Book key={`Book-${books.length + 1}`} id={bookList[books.length].id} name={`${bookList[books.length].content}`} parentFunc={parentFunc} position={position} difficulty={bookList[books.length].difficulty} />])
      setPosition(position + 1.4);
    }, 100)
  }, [books])

  const parentFunc = (data: string) => {
    console.log(data);
    console.log(bookList.findIndex((value) => value.content === data), 1);
    router.push(`http://localhost:3000/todolist/view/${parseInt(data)}`)
    // setBooks([]);
    // setPosition(2);
    // setBookList([...bookList]);
    
  }

  // const handleCreateButton = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const { content, difficulty } = e.currentTarget;
  //   setBooks([]);
  //   setPosition(2);
  //   setBookList([...bookList, { content: content.value, difficulty: difficulty.value }]);
  //   // setBooks([...books, <Book key={`Book-${books.length}`} name={`Book-${books.length}`} position={position} difficulty={CubeDiffculty.EASY} />])
  //   // setPosition(position + 0.8);
  // }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Canvas 
        shadows
        onTouchStart={(e) => {setClickScreenY(e.changedTouches[0]?.screenY)}} 
        onTouchMove={(e) => setMoveScreenY(e.changedTouches[0]?.screenY)}
      >
        <Camera clickScreenY={clickScreenY} moveScreenY={moveScreenY} initPosition={position} />
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
      {/* <form
        onSubmit={handleCreateButton}
      >
        <input type="radio"  name="difficulty" value={CubeDiffculty.EASY} defaultChecked />
        <label>쉬움</label>
        <input type="radio" name="difficulty" value={CubeDiffculty.NORMAL} />
        <label>보통</label>
        <input type="radio" name="difficulty" value={CubeDiffculty.HARD} />
        <label>어려움</label>
        <input type="radio" name="difficulty" value={CubeDiffculty.EXTRA} />
        <label>매우 어려움</label>
        <input type="text" name="content" />
        <button type="submit">제출</button>
      </form> */}
      {/* <button onClick={handleCreateButton}>생성</button> */}
    </div>
  );
}