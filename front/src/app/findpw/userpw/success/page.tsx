'use client'

import Line from '@/app/components/Line';
import ToLoginBtn from '@/app/components/ToLoginBtn';
import Image from 'next/image';
import React from 'react'

const page = () => {

    return (
        <div className='w-full flex flex-col gap-5'>
            <div>
                <div className='flex w-full h-[50px]'>
                    <p className='flex w-full items-center justify-center text-xl'>비밀번호 변경</p>
                </div>
                <Line color='border-gray-300 border-[1px]' />
            </div>
            <div className='w-full flex justify-center items-center'>
                <Image src={'/user.png'} alt={'유저 이미지'} width={300} height={300} />
            </div>
            <div className='w-full flex flex-col px-5 justify-center items-center'>
                <p className='w-full flex pb-5 justify-center text-3xl'>비밀번호 변경 완료</p>
                <p className='w-full flex justify-center text-base text-gray-600'>비밀번호 변경이 완료되었습니다.</p>
                <p className='w-full flex justify-center text-base text-gray-600'>새로운 비밀번호로 로그인해주세요.</p>
            </div>
            <ToLoginBtn />
        </div>
    )
}

export default page
