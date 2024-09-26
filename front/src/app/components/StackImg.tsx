import Image from 'next/image'
import React from 'react'

const StackImg = () => {
    return (
        <div className='w-full h-1/2 bg-gray-400 relative rounded-b-my'><Image fill src='/stack.png' alt='stack' className='rounded-b-my object-cover' /></div>
    )
}

export default StackImg
