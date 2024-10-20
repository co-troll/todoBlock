'use client'
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './todolist.module.css';

const page = () => {

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 할 일 리스트 가져오기
  const getTodoList = useQuery({
    queryKey: ['todolist'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:4000/schedule/view', {
        withCredentials: true
      });
      return await response.data;
    }
  })
  
  // const getLogout = useQuery({
  //   queryKey: ['logout'],
  //   queryFn: async () => {
  //     const response = await axios.get('http://localhost:4000/auth/logout', {
  //       withCredentials: true
  //     });
  //     console.log(response)
  //     return response;
  //   }
  // })

  // const logoutHandler = () => {
  //   console.log(getLogout);
  // }


  // 로딩
  useEffect(() => {
    const data = async () => {
      try {
        // console.log(getTodoList.data);
        setIsLoading(true);
      } catch (error) {
        console.log(error);
      }finally {
        setIsLoading(false);
      }
    }
    data();
  }, [])

  // 할 일 리스트 뿌려주기
  useEffect(()=> {
    if(getTodoList.isFetched && (document.getElementById('todoBoxes') as HTMLDivElement)) {
      for(let i = 0; i < getTodoList.data.length; i++) {
        const todoBox = document.createElement('div');
        todoBox.classList.add('todo-box');
        const checkBoxWrap = document.createElement('span');
        checkBoxWrap.classList.add('checkbox-wrap');
        const checkBox = document.createElement('div');
        checkBox.classList.add('checkbox');
        const contentWrap = document.createElement('span');
        contentWrap.classList.add('content-wrap')
        checkBoxWrap.appendChild(checkBox);
        todoBox.append(checkBoxWrap, contentWrap);
        if(todoBox){
          (document.getElementById('todoBoxes') as HTMLDivElement).append(todoBox);
        }
      }
    }
  }, [getTodoList.data, isLoading]) // 데이터 가져왔을 때 + 추가에서 취소 눌렀을 때

  // 로딩 될 때
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
              <div className={`w-full border border-black mt-20 ${styles.boxHeight}`}></div>
              <div className='w-full mt-8 border border-black'>
                <h1 className='p-2'>해야 할 일</h1>
                <div className='w-full'>
                  <div id='todoBoxes' className='w-full border-black border'></div>
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