'use client'
import { useQueries, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const page = () => {
  const [todoList, setTodoList] = useState<[{content: string, dateArr:string[], difficulty: string}] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getTodoList = useQuery({
    queryKey: ['todolist'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:4000/schedule/view', {
        withCredentials: true
      });
      // console.log(response.data);
      return await response.data;
    }
  })

  useEffect(() => {
    const data = async () => {
      try {
        const res = await getTodoList.data;
        console.log(res);
        setTodoList(res);
      } catch (error) {
        console.log(error);
      }finally {
        setIsLoading(false);
      }
    }
    data();
  }, [])

  useEffect(()=> {
    console.log(todoList);
  }, [todoList])
  
  useEffect(() => {
    try {
      if(!getTodoList.isLoading && todoList) {
        // <div className='w-full flex'>
        //               <span className='w-10 flex justify-center items-center h-10'>
        //                 <div className='w-7 h-7 rounded-full border border-black'></div>
        //               </span>
        //               <span className='w-90 h-10 border border-black'></span>
        //             </div>
        // console.log(1)
        // for(let i = 0; i < todoList.length; i++) {
        // const todoBox = document.createElement('div');
        // todoBox.classList.add('w-full flex');
        // const checkBoxWrap = document.createElement('span');
        // checkBoxWrap.classList.add('w-10 flex justify-center items-center h-10')
        // const checkBox = document.createElement('div');
        // checkBox.classList.add('w-7 h-7 rounded-full border border-black');
        // const contentWrap = document.createElement('span');
        // contentWrap.classList.add('w-90 h-10 border border-black')
        // checkBoxWrap.appendChild(checkBox);
        // todoBox.append(checkBoxWrap, contentWrap);
        // (document.getElementById('todoBoxes') as HTMLDivElement).append(todoBox);
      // }
    }
    } catch (error) {
      console.log(error)
    }
  }, [getTodoList.isLoading])
  if(isLoading) {
    return <div>로딩중</div>
  }

  return (
    <>
      <div className='w-full flex justify-center'>
            <div className='w-11/12'>
              <div className='w-full h-10 flex justify-between pt-3'>
                ㅇㅇ님 환영합니다
                <div>로그아웃버튼</div>
              </div>
              <div className='w-full border border-black mt-20 box-height'></div>
              <div className='w-full mt-8 border border-black'>
                <h1 className='p-2'>해야 할 일</h1>
                <div className='w-full'>
                  <div id='todoBoxes' className='w-full border-black border'>
                    {/* <div className='w-full flex'>
                      <span className='w-10 flex justify-center items-center h-10'>
                        <div className='w-7 h-7 rounded-full border border-black'></div>
                      </span>
                      <span className='w-90 h-10 border border-black'></span>
                    </div> */}
                    {/* {todoList?.map(() => {
                      console.log(todoList);

                      return (
                      <div className='w-full flex'>
                        <span className='w-10 flex justify-center items-center h-10'>
                          <div className='w-7 h-7 rounded-full border border-black'></div>
                        </span>
                        <span className='w-90 h-10 border border-black'></span>
                      </div>
                    )}
                  )} */}
                    <div></div>
                  </div>
                </div>
              </div>
              <div className='w-full mt-8'>
                <h1>완료된 일</h1>
              </div>
              <div className='w-11/12 fixed bottom-10 flex justify-between px-3'>
                <div className='bg-white w-14 h-14 border border-blue-300 rounded-full flex justify-center items-center text-3xl text-blue-500'></div>
                <Link href={'/todolist/add'} className='bg-white w-14 h-14 border border-blue-300 rounded-full flex justify-center items-center text-3xl text-blue-500'>
                  <span className='pb-1'>+</span>
                </Link>
              </div>
              <div></div>
            </div>
        </div>
    </>
  )
}

export default page