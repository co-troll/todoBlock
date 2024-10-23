'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import dltBox from '../../../../../public/deleteBox.png'
import styles from '../../todolist.module.css'
import ClockImage from '../../../../../public/clock.png'

const page = ({params} : {params: any}) => {

    const [todoData, setTodoData] = useState({id: -1, content: 'd'});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getTodoData = useQuery({
        queryKey: ['todolist'],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:4000/schedule/view/${params.id}`, {
                withCredentials: true
            })
            return await response.data
        }
    })

    useEffect(()=>{
        console.log(params, 1)
    }, [])

    useEffect(()=>{
        setIsLoading(true);
        try {
            if(todoData.id !== -1) {
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }, [todoData])
    
    useEffect(()=>{
        if(getTodoData.data) {
            setTodoData(getTodoData.data);
        }
    }, [getTodoData.data])

    useEffect(() => {
        console.log(isLoading)
        if(!isLoading) {
            (document.getElementById('content') as HTMLTextAreaElement).value = todoData.content;
        }
    }, [isLoading])

    if(isLoading) {
        return <div>로딩중</div>
    }

  return (
    <div className='w-full flex flex-col items-center'>
        <div className='w-full flex justify-between items-center'>
            <div className='w-10'></div>
            <div className='w-18 flex'>
                <div>수정</div>
                <div>삭제</div>
            </div>
        </div>
        <div className='w-full flex justify-center'>
        <div className='w-11/12'>
            <div className='w-full mt-4'>
              <h1 className='text-2xl'>새 할일 리스트</h1>
            </div>
            <div className='w-full flex flex-col items-center mt-8'>
                <textarea name="" id="content" className={`border border-black w-full h-24 text-lg resize-none overflow-hidden`}></textarea>
                <div className='w-full mt-4'>
                  <div className='flex items-center h-14 border rounded-sm px-2'>
                    <span>
                      <Image src={ClockImage} width={32} height={32} alt='시계' / >
                    </span>
                    <span className='text-lg ml-1'>시간</span>
                  </div>
                    <div id='dateBoxes' className='w-25 text-3xl mt-4 grid grid-cols-3'></div>
                    {/* <div id='calendarWrap' className='absolute w-full h-full bg-[rgb(0,0,0,0.8)] top-0 left-0 flex justify-center items-center'>
                      <Calendar className={`${styles.calendar} calendar`} locale='ko' formatDay={(locale, date) => date.toLocaleString('en', {day: 'numeric'})} />
                    </div> */}
                </div>
                <div className='w-full border h-14 border-black mt-3 flex items-center text-lg px-3'>
                  <span className='w-4/12'>
                    <div className='w-full h-10 flex items-center justify-center cursor-pointer' id='difficulty_easy' data-difficulty='easy'>
                      <div className='w-4 h-4 border border-black bg-yellow-400 mr-1' data-difficulty='easy'></div>
                      <span data-difficulty='easy'>쉬움</span>
                    </div>
                  </span>
                  <span className='w-4/12'>
                    <div className='w-full h-10 flex items-center justify-center cursor-pointer' id='difficulty_normal' data-difficulty='normal'>
                      <div className='w-4 h-4 border border-black bg-green-400 mr-1' data-difficulty='normal'></div>
                      <span data-difficulty='normal'>보통</span>
                    </div>
                  </span>
                  <span className='w-4/12'>
                    <div className='w-full h-10 flex items-center justify-center cursor-pointer' id='difficulty_hard' data-difficulty='hard'>
                      <div className='w-4 h-4 border border-black bg-red-400 mr-1' data-difficulty='hard'></div>
                      <span data-difficulty='hard'>어려움</span>
                    </div>
                  </span>
                  {/* <span className='w-3/12 h-12 flex items-center' data-difficulty='normal' onClick={selectDifficulty}>
                    <div className='w-4 h-4 border border-black bg-green-400 mr-1' data-difficulty='normal'></div>
                    <span data-difficulty='normal'>보통</span>
                  </span>
                  <span className='w-3/12 h-12 flex items-center' data-difficulty='hard' onClick={selectDifficulty}>
                    <div className='w-4 h-4 border border-black bg-red-400 mr-1'data-difficulty='hard'></div>
                    <span data-difficulty='hard'>어려움</span>
                  </span> */}
                </div>
            </div>
        </div>
    </div>
    </div>
    
  )
}

export default page