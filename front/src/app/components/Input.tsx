import React, { ReactNode } from 'react'

const Input = ({ place,type,inputRef }: { place: string,type: string,inputRef: any }) => {
    return (
        <input type={type} className='w-full h-6 pl-1 bg-transparent border-b-[1px] border-black placeholder:text-gray-400 placeholder:text-sm focus:outline-none' placeholder={place} ref={inputRef}></input>
    )
}

export default Input
