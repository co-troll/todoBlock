import Image from 'next/image'
import React from 'react'


const Loading = () => {
    return (
        <div>
            <Image src={'/loading2.gif'} alt={'로딩'} width={300} height={300} />
        </div>
    )
}

export default Loading
