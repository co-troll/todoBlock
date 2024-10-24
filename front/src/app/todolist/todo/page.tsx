'use client'

import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import HeaderTab from '@/app/components/HeaderTab'
import instance from '@/app/instance'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [todolist, setTodolist] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const router = useRouter();
    const queryClient = useQueryClient();

    // 할 일 리스트 가져오기
    const getTodoList = useQuery({
        queryKey: ['todolist'],
        queryFn: async () => {
            const response = await instance({
                method: "get",
                url: 'schedule/view?status=not-finished'
            });
            return await response.data;
        },
        staleTime: 0,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    })

    // 로딩
    useEffect(() => {
        const data = async () => {
            try {
                getTodoList.refetch();
                setIsLoading(true);
            } catch (error) {
                console.log(error);
            } finally {
                console.log(todolist)
                setIsLoading(false);
            }
        }
        data();
    }, [])

    // 할 일 리스트 뿌려주기
    useEffect(() => {
        if (getTodoList.isFetched) {
            setTodolist(getTodoList.data);
        }
    }, [getTodoList.data, isLoading]) // 데이터 가져왔을 때 + 추가에서 취소 눌렀을 때

    const completeMutate = useMutation({
        mutationFn: async (index) => {
            return await instance({
                method: "patch",
                url: `schedule/isfinished/${index}`,
                data: {
                    isFinished: true
                }
            });
        },
        onError(err) {
            console.log(err);
        },
        onSuccess() {
            getTodoList.refetch();
        }
    })

    const onClickCompleleHandler = (e: any) => {
        e.stopPropagation();
        const index = e.target.getAttribute('data-index');
        completeMutate.mutate(index);
    }

    useEffect(()=>{
        console.log(todolist)
    }, [todolist])

    // 로딩 될 때
    if (isLoading) {
        return <div>로딩중</div>
    }


    return (
        <div className='w-full flex flex-col justify-center'>
            <Header />
            <HeaderTab props={{
                main: 'border-b-2 text-gray-300 text-sm',
                todo: 'border-2 border-b-0 font-bold',
                complete: 'border-b-2 text-gray-300 text-sm'
            }} />
            <div className='w-full flex flex-col px-6 gap-2'>
                <div className='text-bold text-2xl pt-2'>오늘의 할일</div>
                <div id='todoBoxes' className='w-full flex flex-col gap-2'>
                    {todolist.map((data: any, index) => {
                        // console.log(data;
                        return (
                            <div onClick={()=>{
                                queryClient.invalidateQueries(['viewTodo']);
                                router.push(`/todolist/view/${data.id}`);
                            }}
                            key={index} className='w-full h-max border-black border-[1px] rounded-md list-none'>
                                <div className='w-full h-2/3 border border-black flex p-1'>
                                    <div data-index={data.id} className='w-5 h-5 border border-black rounded-full relative z-10' onClick={onClickCompleleHandler}></div>
                                    <div className='ml-2'>
                                        {data.content}
                                    </div>
                                </div>
                                <div className='w-full'>
                                    <div className='flex h-max'>
                                        {data.dateArr.map((el: string, id: number)=>{
                                            return (
                                                <div key={id} className='mr-2'>{el}</div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default page
