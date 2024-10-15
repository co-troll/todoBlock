import Image from 'next/image'
import React, { ReactNode } from 'react'

const StackImg = ({className} : {className : string}) => {
    return (
        <div className={`w-full relative overflow-hidden ${className}`}><Image fill src='/stack.png' alt='stack' className='object-cover' /></div>
    )
}

export default StackImg
