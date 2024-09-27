import React, { ReactNode } from 'react'

const Input = ({ place }: { place: string }) => {
    return (
        <input type='text' className='w-full h-6 pl-1 bg-transparent border-b-[1px] border-black placeholder:text-gray-400 placeholder:text-sm focus:outline-none' placeholder={place} ></input>
    )
}

export default Input
