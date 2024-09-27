import React from 'react'
import StackImg from '../components/StackImg'
import Link from 'next/link'
import SignupForm from '../moecules/SignupForm'

const page = () => {
    return (
        <div className='flex flex-col w-full h-screen bg-green-50 gap-7'>
            <StackImg />
            <div className='flex w-full text-black text-xl justify-center'>Sign up</div>
            <SignupForm />
        </div>
    )
}

export default page
