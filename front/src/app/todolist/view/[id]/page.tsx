'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import dltBox from '../../../../../public/deleteBox.png'
import styles from '../../todolist.module.css'
import ClockImage from '../../../../../public/clock.png'
import { CubeDiffculty } from '@/app/components/Cube'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const page = ({params} : {params: any}) => {
  
  const router = useRouter();
  
  const [todoData, setTodoData] = useState({dateArr: ["test"], content: 'd', isFinished: ""});
  const [selectDate, setSelectDate] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const queryClient = useQueryClient();

    const getTodoData = useQuery({
        queryKey: ['viewTodo'],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:4000/schedule/view/${params.id}`, {
                withCredentials: true
            })
            return await response.data;
        },
        staleTime: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    })

    const deleteTodoList = useMutation({
      mutationKey: ['delteTodo'],
      mutationFn: async () => {
        return await axios.delete(`http://localhost:4000/schedule/delete/${params.id}`, {
          withCredentials: true
        });
      },
      onError(error) {
        console.log(error);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['todolist']);
      }
    })

    const dltTodo = async () => {
      await deleteTodoList.mutateAsync();
      if(todoData.isFinished) {
        router.push('/todolist/complete')
      }else {
        router.push('/todolist/todo');
      }
    }

    const restoreMutation = useMutation({
      mutationKey: ['restoreTodo'],
      mutationFn: async () => {
        return await axios.patch(`http://localhost:4000/schedule/isfinished/${params.id}`, {isFinished: false}, {
          withCredentials: true
        })
      },
      onError(err) {
        console.log(err);
      }
    })

    const restoreHandler = async () => {
      await restoreMutation.mutateAsync();
      router.push('/todolist/todo');
    }

    useEffect(()=>{
      getTodoData.refetch();
        console.log(params, 1)
        setIsLoading(true)
    }, [])

    useEffect(()=>{
      getTodoData.refetch();
      setIsLoading(true)
      if(getTodoData.isFetchedAfterMount && getTodoData.data) {
        console.log("됨")
        setIsLoading(false);
        setTodoData(getTodoData.data);
        setSelectDate(getTodoData.data.dateArr);
      }
    }, [getTodoData.isFetchedAfterMount])

    useEffect(()=>{
        setIsLoading(true);
        try {
          console.log(todoData)
            if(todoData.dateArr[0] !== "test") {
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }, [todoData])

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
            <div className='w-30' onClick={() => {
              router.push('/todolist')
            }}>메인으로 돌아가기</div>
            <div className='w-18 flex'>
              {todoData.isFinished ? (
                <>
                  <div onClick={restoreHandler} className='mr-1'>복구</div>
                  <div onClick={dltTodo}>삭제</div>
                </>
                ) : (
                <>
                  <Link className='mr-1' href={`/todolist/update/${params.id}`}>수정</Link>
                  <div onClick={dltTodo}>삭제</div>
                </>
              )

              }
            </div>
        </div>
        <div className='w-full flex justify-center'>
        <div className='w-11/12'>
            <div className='w-full mt-4'>
              <h1 className='text-2xl'>새 할일 리스트</h1>
            </div>
            <div className='w-full flex flex-col items-center mt-8'>
                <textarea name="" id="content" className={`border border-black w-full h-24 text-lg resize-none overflow-hidden p-1 px-2`} readOnly></textarea>
                <div className='w-full mt-4'>
                  <div className='flex items-center h-14 border rounded-sm px-2'>
                    <span>
                      <Image src={ClockImage} width={32} height={32} alt='시계' / >
                    </span>
                    <span className='text-lg ml-1'>시간</span>
                  </div>
                    <div id='dateBoxes' className='w-full text-3xl mt-4 grid grid-cols-3'>
                    {selectDate.map((el, id) => <div key={id} className={`${styles.dateBox}`}>
                          {el}
                      </div>)}
                    </div>
                    {/* <div id='calendarWrap' className='absolute w-full h-full bg-[rgb(0,0,0,0.8)] top-0 left-0 flex justify-center items-center'>
                      <Calendar className={`${styles.calendar} calendar`} locale='ko' formatDay={(locale, date) => date.toLocaleString('en', {day: 'numeric'})} />
                    </div> */}
                </div>
                <div className='w-full border h-14 border-black mt-3 flex items-center text-lg px-3'>
                  <span className='w-4/12'>
                    <div className='w-full h-10 flex items-center justify-center cursor-pointer' id='difficulty_easy' data-difficulty='easy'>
                      <div className={`w-4 h-4 border border-black bg-[#98fb98] mr-1`} data-difficulty='easy'></div>
                      <span data-difficulty='easy'>쉬움</span>
                    </div>
                  </span>
                  <span className='w-4/12'>
                    <div className='w-full h-10 flex items-center justify-center cursor-pointer' id='difficulty_normal' data-difficulty='normal'>
                      <div className='w-4 h-4 border border-black bg-[#F8D800] mr-1' data-difficulty='normal'></div>
                      <span data-difficulty='normal'>보통</span>
                    </div>
                  </span>
                  <span className='w-4/12'>
                    <div className='w-full h-10 flex items-center justify-center cursor-pointer' id='difficulty_hard' data-difficulty='hard'>
                      <div className='w-4 h-4 border border-black bg-[#EA5455] mr-1' data-difficulty='hard'></div>
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