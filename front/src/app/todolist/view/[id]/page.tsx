'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import dltBox from '../../../../../public/deleteBox.png'
import styles from '../../todolist.module.css'
import ClockImage from '../../../../../public/clock.png'
import { CubeDiffculty } from '@/app/components/Cube'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import instance from '@/app/instance'

const page = ({params} : {params: any}) => {
  
  const router = useRouter();
  
  const [todoData, setTodoData] = useState({dateArr: ["test"], content: 'd', isFinished: ""});
  const [selectDate, setSelectDate] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [difficulty, setDifficulty] = useState('');

  const queryClient = useQueryClient();

    const getTodoData = useQuery({
        queryKey: ['viewTodo'],
        queryFn: async () => {
            const response = await instance({
              method: "get",
              url: `schedule/view/${params.id}`
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
        return await instance({ 
          method: "delete",
          url: `schedule/delete/${params.id}`
        });
      },
      onError(error) {
        console.log(error);
      },
      onSuccess: () => {
        // queryClient.invalidateQueries(['todolist']);
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
        return await instance({
          method: "patch",
          url: `schedule/isfinished/${params.id}`, 
          data: {
            isFinished: false
          }

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
        setDifficulty(getTodoData.data.difficulty);
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

    useEffect(() => {
      switch(difficulty) {
        case "easy" :
          (document.getElementById(`difficulty_${difficulty}`) as HTMLDivElement).style.backgroundColor = "gray";
          (document.getElementById(`difficulty_normal`) as HTMLDivElement).style.backgroundColor = "white";
          (document.getElementById(`difficulty_hard`) as HTMLDivElement).style.backgroundColor = "white";
          break;
        case "normal" :
          (document.getElementById(`difficulty_${difficulty}`) as HTMLDivElement).style.backgroundColor = "gray";
          (document.getElementById(`difficulty_easy`) as HTMLDivElement).style.backgroundColor = "white";
          (document.getElementById(`difficulty_hard`) as HTMLDivElement).style.backgroundColor = "white";
          break;
        case "hard" :
          (document.getElementById(`difficulty_${difficulty}`) as HTMLDivElement).style.backgroundColor = "gray";
          (document.getElementById(`difficulty_easy`) as HTMLDivElement).style.backgroundColor = "white";
          (document.getElementById(`difficulty_normal`) as HTMLDivElement).style.backgroundColor = "white";
          break;
      }
    }, [difficulty]);

  

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
                  <div onClick={restoreHandler} className='mr-1 py-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 119.4 122.88" width={15} height={15}><path d="M83.91,26.34a43.78,43.78,0,0,0-22.68-7,42,42,0,0,0-24.42,7,49.94,49.94,0,0,0-7.46,6.09,42.07,42.07,0,0,0-5.47,54.1A49,49,0,0,0,30,94a41.83,41.83,0,0,0,18.6,10.9,42.77,42.77,0,0,0,21.77.13,47.18,47.18,0,0,0,19.2-9.62,38,38,0,0,0,11.14-16,36.8,36.8,0,0,0,1.64-6.18,38.36,38.36,0,0,0,.61-6.69,8.24,8.24,0,1,1,16.47,0,55.24,55.24,0,0,1-.8,9.53A54.77,54.77,0,0,1,100.26,108a63.62,63.62,0,0,1-25.92,13.1,59.09,59.09,0,0,1-30.1-.25,58.45,58.45,0,0,1-26-15.17,65.94,65.94,0,0,1-8.1-9.86,58.56,58.56,0,0,1,7.54-75,65.68,65.68,0,0,1,9.92-8.09A58.38,58.38,0,0,1,61.55,2.88,60.51,60.51,0,0,1,94.05,13.3l-.47-4.11A8.25,8.25,0,1,1,110,7.32l2.64,22.77h0a8.24,8.24,0,0,1-6.73,9L82.53,43.31a8.23,8.23,0,1,1-2.9-16.21l4.28-.76Z"/></svg>
                  </div>
                  <div onClick={dltTodo} className='py-2 pr-2'>
                  <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M14.25 1c.41 0 .75.34.75.75V3h5.25c.41 0 .75.34.75.75v.5c0 .41-.34.75-.75.75H3.75A.75.75 0 0 1 3 4.25v-.5c0-.41.34-.75.75-.75H9V1.75c0-.41.34-.75.75-.75h4.5Z"></path><path fill="currentColor" fill-rule="evenodd" d="M5.06 7a1 1 0 0 0-1 1.06l.76 12.13a3 3 0 0 0 3 2.81h8.36a3 3 0 0 0 3-2.81l.75-12.13a1 1 0 0 0-1-1.06H5.07ZM11 12a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0v-6Zm3-1a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Z" clip-rule="evenodd"></path></svg>
                  </div>
                </>
                ) : (
                <>
                  <Link className='mr-1 py-2' href={`/todolist/update/${params.id}`}>
                  <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="m13.96 5.46 4.58 4.58a1 1 0 0 0 1.42 0l1.38-1.38a2 2 0 0 0 0-2.82l-3.18-3.18a2 2 0 0 0-2.82 0l-1.38 1.38a1 1 0 0 0 0 1.42ZM2.11 20.16l.73-4.22a3 3 0 0 1 .83-1.61l7.87-7.87a1 1 0 0 1 1.42 0l4.58 4.58a1 1 0 0 1 0 1.42l-7.87 7.87a3 3 0 0 1-1.6.83l-4.23.73a1.5 1.5 0 0 1-1.73-1.73Z"></path></svg>
                  </Link>
                  <div onClick={dltTodo} className='py-2 pr-2'>
                    <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M14.25 1c.41 0 .75.34.75.75V3h5.25c.41 0 .75.34.75.75v.5c0 .41-.34.75-.75.75H3.75A.75.75 0 0 1 3 4.25v-.5c0-.41.34-.75.75-.75H9V1.75c0-.41.34-.75.75-.75h4.5Z"></path><path fill="currentColor" fill-rule="evenodd" d="M5.06 7a1 1 0 0 0-1 1.06l.76 12.13a3 3 0 0 0 3 2.81h8.36a3 3 0 0 0 3-2.81l.75-12.13a1 1 0 0 0-1-1.06H5.07ZM11 12a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0v-6Zm3-1a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Z" clip-rule="evenodd"></path></svg>
                  </div>
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
                      <Image src={ClockImage} width={32} height={32} alt='시계' />
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