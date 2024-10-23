'use client'

import BackDiv from '@/app/components/BackDiv'
import Line from '@/app/components/Line'
import ToLoginBtn from '@/app/components/ToLoginBtn'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {

    return (
        <div className='w-full flex flex-col gap-7'>
            <div>
                <div className='flex w-full h-[50px]'>
                    <p className='flex w-full items-center justify-center text-xl'>회원가입</p>
                </div>
                <Line color='border-gray-300 border-[1px]' />
            </div>
            <div className='w-full flex justify-center items-center'>
                <Image src={'/user.png'} alt={'유저 이미지'} width={300} height={300} />
            </div>
            <div className='flex flex-col gap-2'>
                <p className='w-full px-10 text-3xl'>축하합니다!</p>
                <p className='w-full px-10 text-3xl'>회원가입이 성공하였습니다.</p>
            </div>
            <ToLoginBtn />
        </div>
    )
}

export default page
