import React from 'react'

const Line = ({ color }: { color: string }) => {
    return (
        <div className={`${color} w-full h-[2px]`}>

        </div>
    )
}

export default Line