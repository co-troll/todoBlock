'use client'
import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import HeaderTab from '@/app/components/HeaderTab'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [todolist, setTodolist] = useState<any[]>([]);

    const router = useRouter();

    // 스케쥴 완료된거 조회

    const getCompleteTodolist = useQuery({
        queryKey: ['complete'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:4000/schedule/view?status=finished', {
                withCredentials: true
            })
            return await response.data;
        },
        staleTime: 0,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    })

    useEffect(() => {
        try {
            getCompleteTodolist.refetch();
        } catch (error) {
            console.log(error);
        }
    }, [])

    useEffect(()=> {
        if(getCompleteTodolist.data) {
            console.log(getCompleteTodolist.data)
            setTodolist(getCompleteTodolist.data)
        }
    }, [getCompleteTodolist.data])

    return (
        <div className='w-full flex flex-col justify-center'>
            <Header />
            <HeaderTab props={{
                main: 'border-b-2 text-gray-300 text-sm',
                todo: 'border-b-2 text-gray-300 text-sm',
                complete: 'border-2 border-b-0 font-bold'
            }} />
            <div className='w-full flex flex-col px-6 gap-2'>
                <div className='text-bold text-2xl pt-2'>완료 한 일</div>
                <div id='todoBoxes' className='w-full flex flex-col gap-2'>
                    {todolist.map((data, index) => {
                        // console.log(data)
                        return (
                            <li onClick={()=>router.push(`/todolist/view/${data.id}`)} key={index} className='w-full h-12 border-black border-[1px] rounded-md list-none'>
                                <div className='w-full h-2/3 border border-black flex p-1'>
                                    <div data-index={data.id} className='w-5 h-5 border border-black rounded-full'></div>
                                    <div className='ml-2'>
                                        {data.content}
                                    </div>
                                </div>
                                <div className='w-full'>
                                    <div className='flex'>
                                        {data.dateArr.map((el: string, id: number)=>{
                                            return (
                                                <div key={id} className='mr-2'>{el}</div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default page
