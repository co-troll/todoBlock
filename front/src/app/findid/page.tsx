'use client'

import React from 'react'
import BackDiv from '../components/BackDiv'
import Line from '../components/Line'
import { useRouter } from 'next/navigation';
import Input from '../components/Input';

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
                    <div className='w-1/2 flex flex-col items-center text-purple-900 hover:cursor-pointer' onClick={toFindId}>
                        <p>아이디 찾기</p>
                        <Line color='bg-purple-900' />
                    </div>
                    <div className='w-1/2 flex flex-col items-center text-gray-400 hover:cursor-pointer' onClick={toFindPw}>
                        <p>비밀번호 찾기</p>
                        <Line color='bg-gray-400' />
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-5 px-10 pt-5'>
                <div className='flex gap-1'>
                    <input type='text' placeholder='휴대전화번호 입력(`-`제외)' className='w-4/5 h-10 border-b-[1px]'></input>
                    <button className='w-1/5 h-10 border-2 '></button>
                </div>
            </div>
        </div>
    )
}

export default page
