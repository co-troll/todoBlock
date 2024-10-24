"use client"
import Image from 'next/image'

import React from 'react'
import instance from '../instance'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter();
    const getTodoList = useQuery({
        queryKey: ['userid'],
        queryFn: async () => {
          const response = await instance({
            method: "get",
            url: "users/getuid"
          });
          return await response.data;
        },
        staleTime: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
      })

      

  const handleLogout = async () => {
    await instance({
      method: "get",
      url: "/auth/logout"
    })
    router.push("/login");
  }

    return (
        <div className='w-full h-[8vh] flex justify-between bg-sky-300 items-center px-2'>
            {/* 로고 이미지로 바꿔야함 클릭시 메인으로 이동까지.*/}
            <Image src={'/logo.png'} alt='로고' width={50} height={50}/>
            <div className='flex gap-2'>
                <span>{getTodoList.data}님</span>
                <span onClick={handleLogout}>Logout</span>
            </div>
        </div>
    )
}

export default Header
