import React from 'react'
import LoginForm from '../moecules/LoginForm'
import StackImg from '../components/StackImg'

const page = () => {
    return (
        <div className='flex flex-col w-full h-screen bg-white gap-7'>
            <StackImg />
            <LoginForm />
        </div>
    )
}

export default page
