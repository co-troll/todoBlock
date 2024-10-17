'use client'

import React from 'react'
import Line from '../components/Line'
import BackDiv from '../components/BackDiv'
import { useRouter } from 'next/navigation'

const page = () => {

    const router = useRouter();

    const toFindPw = () => {
        router.push('/findpw')
    }

    const toFindId = () => {
        router.push('/findid')
    }

    return (
        <div className='flex flex-col gap-5'>
            <BackDiv />
            <div className='flex flex-col gap-2'>
                <div className='flex text-xl'>
                    <div className='w-1/2 flex flex-col items-center text-gray-400 hover:cursor-pointer' onClick={toFindId}>
                        <p>아이디 찾기</p>
                        <Line color='bg-gray-400' />
                    </div>
                    <div className='w-1/2 flex flex-col items-center text-purple-900 hover:cursor-pointer' onClick={toFindPw}>
                        <p>비밀번호 찾기</p>
                        <Line color='bg-purple-900'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
