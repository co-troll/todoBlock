import React, { ReactNode } from 'react'

const Input = ({ place }: { place: string }) => {
    return (
        <input type='text' className='w-full h-8 rounded-my pl-2 placeholder:text-gray-400 placeholder:text-sm' placeholder={place} ></input>
    )
}

export default Input
