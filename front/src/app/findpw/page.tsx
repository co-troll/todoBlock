'use client'

import React, { useRef } from 'react'
import Line from '../components/Line'
import BackDiv from '../components/BackDiv'
import { useRouter } from 'next/navigation'
import { useAtom } from 'jotai'
import { urlAtom } from '../state/Atom'

const page = () => {
    const [url, setUrl] = useAtom(urlAtom);
    setUrl(false);

    const uidInput = useRef<any>(null);
    const uphoneInput = useRef<any>(null);

    const router = useRouter();

    const toFindPw = () => {
        router.push('/findpw')
    }

    const toFindId = () => {
        router.push('/findid')
    }

    return (
        <div className='w-full flex flex-col gap-5'>
            <BackDiv text='아이디 / 비밀번호 찾기' />
            <div className='flex flex-col gap-5'>
                <div className='flex text-xl'>
                    <div className='w-1/2 flex flex-col items-center text-gray-400 hover:cursor-pointer' onClick={toFindId}>
                        <p>아이디 찾기</p>
                        <Line color='bg-gray-400' />
                    </div>
                    <div className='w-1/2 flex flex-col items-center text-purple-900 hover:cursor-pointer' onClick={toFindPw}>
                        <p>비밀번호 찾기</p>
                        <Line color='bg-purple-900' />
                    </div>
                </div>
                <div className='flex flex-col px-10 gap-4'>
                    <div className='flex gap-1 '>
                        <input type='text' ref={uidInput} placeholder='아이디 입력' className='w-3/4 h-10 border-b-[1px] pl-1 focus:outline-none'></input>
                        <button className='w-1/4 h-10 border-[1px] border-purple-900/80 rounded-full text-sm font-bold text-purple-900'>인증번호 전송</button>
                    </div>
                    <div className='flex gap-1'>
                        <input type='text' placeholder='휴대폰번호 입력(`-`제외)' className='w-3/4 h-10 border-b-[1px] pl-1 focus:outline-none'></input>
                        <button className='w-1/4 h-10 border-[1px] border-purple-900/80 rounded-full text-sm font-bold text-purple-900'>확인</button>
                    </div>
                    <button className='w-full h-10 rounded-full bg-purple-900/80 text-white'>비밀번호 찾기</button>
                </div>
            </div>
        </div>
    )
}

export default page
