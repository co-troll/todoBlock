import React, { ReactNode } from 'react'

const Button = ({ children,type,onClick }: { children: ReactNode,type:'submit' | 'button' | 'reset', onClick: any }) => {
    return (
        <button type={type} onClick={onClick} className='w-full h-8 rounded-md bg-purple-900/80 justify-center text-white text-lg'>{children}</button>
    )
}

export default Button
