'use client'

import BackDiv from '@/app/components/BackDiv'
import Line from '@/app/components/Line'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {

    const router = useRouter();

    const toLogin = () => {
        router.push('/login')
    }

    return (
        <div className='w-full flex flex-col gap-5'>
            <div>
                <div className='flex w-full h-[50px]'>
                    <p className='flex w-full items-center justify-center text-xl'>회원가입</p>
                </div>
                <Line color='border-gray-300 border-[1px]' />
            </div>
            <div>
                <p className='w-full px-10 text-3xl'>축하합니다!</p>
                <p className='w-full px-10 text-3xl'>회원가입이 성공하였습니다.</p>
            </div>
            <div className='flex w-full px-10 justify-center font-bold' onClick={toLogin}>
                로그인 하러 가기 &gt;
            </div>
        </div>
    )
}

export default page
