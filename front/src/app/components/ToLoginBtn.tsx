'use client'

import { useRouter } from 'next/navigation';
import React from 'react'

const ToLoginBtn = () => {
    const router = useRouter();

    const toLogin = () => {
        router.push('/login')
    }

    return (
        <div className='w-full flex px-5'>
            <button className='flex w-full h-14 bg-purple-900/80 justify-center rounded-md items-center text-white text-lg' onClick={toLogin}>로그인 화면으로</button>
        </div>
    )
}

export default ToLoginBtn
