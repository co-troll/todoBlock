import React from 'react'

const Input = ({ place,type,inputRef,position }: { place: string,type: string,inputRef: any, position?:string }) => {
    return (
        <input type={type} className={`${position} w-full h-6 pl-1 bg-transparent border-b-[1px] border-black placeholder:text-gray-400 placeholder:text-sm focus:outline-none`} placeholder={place} ref={inputRef}></input>
    )
}

export default Input
