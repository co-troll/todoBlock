'use client'

import React from 'react'
import BackBtn from './BackBtn'
import { useRouter } from 'next/navigation';

const BackDiv = () => {

    const router = useRouter();

    const backBtn = () => {
        router.push('/login')
    }

    return (
        <div className='flex w-full h-[50px]'>
            <BackBtn onClick={backBtn}/>
            <p className='flex w-full items-center justify-center text-xl'>아이디 / 비밀번호 찾기</p>
        </div>
    )
}

export default BackDiv
