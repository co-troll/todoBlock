'use client'

import React from 'react'
import Find from '../moecules/Find'
import { useRouter } from 'next/navigation';

const page = () => {

    const router = useRouter();

    const findId = () => {
        router.push('/finduser/findid')
    }

    const findpw = () => {
        router.push('/finduser/findpw')
    }
    
    return (
        <div className='flex flex-col gap-5'>
            <Find />
            <p className='flex flex-col px-10 text-2xl'>회원</p>
            <div className='flex flex-col px-10 gap-5'>
                <button onClick={findId} className='flex w-full h-10 px-10 justify-center items-center border-2 border-black text-2xl'>아이디 찾기</button>
                <button onClick={findpw} className='flex w-full h-10 px-10 justify-center items-center border-2 border-black text-2xl'>비밀번호 찾기</button>
            </div>
        </div>
    )
}

export default page
