import React from 'react'
import LoginForm from '../moecules/LoginForm'
import StackImg from '../components/StackImg'
import Link from 'next/link'

const page = () => {
    return (
        <div className='flex flex-col w-full h-screen bg-green-50 gap-7'>
            <StackImg />
            <div className='flex w-full text-black text-xl justify-center'>Login</div>
            <LoginForm />
            <div className='w-full flex text-xs text-white justify-center'>아직 회원이 아니신가요? <Link href='/signup' className='pl-1 underline text-purple-500'>회원가입</Link></div>
        </div>
    )
}

export default page
