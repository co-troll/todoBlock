import React from 'react'
import LoginForm from '../moecules/LoginForm'
import StackImg from '../components/StackImg'
import Image from 'next/image'

const page = () => { 

    return (
        <div className='flex flex-col w-full h-screen bg-white gap-4'>
            <StackImg className={'w-full h-2/5 relative overflow-hidden '} />
            <LoginForm />
            <div className='flex w-full px-6 justify-center text-base'><span id='findId' className='hover:cursor-pointer'>아이디 / 비밀번호 찾기 &gt;</span></div>
            <div className='flex w-full px-6'>
                <div className="flex w-full px-6 h-8 justify-center items-center gap-2 font-bold bg-yellow-300 rounded-md hover:cursor-pointer">
                    <Image src="/kakao.png" width={30} height={30} className="rounded-md" alt='카카오 아이콘' />
                    <span>카카오로 시작하기</span>
                </div>
            </div>
        </div>
    )
    
}

export default page
