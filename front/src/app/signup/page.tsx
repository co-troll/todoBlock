import React, { useRef } from 'react'
import StackImg from '../components/StackImg'
import SignupForm from '../moecules/SignupForm'

const page = () => {
    return (
        <div className='flex flex-col w-full h-screen bg-white gap-2'>
            <StackImg />
            <SignupForm />
        </div>
    )
}

export default page
