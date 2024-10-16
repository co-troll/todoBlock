import React from 'react'
import GrayLine from './GrayLine'
import BlackLine from './BlackLine'

const LineDiv = () => {
    return (
        <div className='w-full h-[2px] relative'>
            <GrayLine />
            <BlackLine width='20%' />
        </div>
    )
}

export default LineDiv
