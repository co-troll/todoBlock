import React, { ReactNode } from 'react'

const Button = ({children}: {children:ReactNode}) => {
    return (
        <button className='w-full h-8 rounded-2xl bg-purple-900/80 justify-center text-white text-lg'>{children}</button>
    )
}

export default Button
