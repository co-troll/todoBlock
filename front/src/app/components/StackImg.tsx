import Image from 'next/image'
import React from 'react'

const StackImg = () => {
    return (
        <div className='w-full h-1/2 relative overflow-hidden'><Image fill src='/stack.png' alt='stack' className='object-cover' /></div>
    )
}

export default StackImg
