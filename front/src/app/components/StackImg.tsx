import Image from 'next/image'
import React from 'react'

const StackImg = ({ className }: { className?: string }) => {
    return (
        <div className={`w-full flex items-center justify-center relative ${className}`}>
            <Image src='/logo.png' alt='logo' width={350} height={350} className='pt-4 object-cover flex justify-center items-center' />
        </div>
    )
}

export default StackImg
