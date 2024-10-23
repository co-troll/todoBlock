import Image from 'next/image'
import React from 'react'

const Header = () => {
    return (
        <div className='w-full h-14 flex justify-between bg-sky-300 items-center px-2'>
            {/* 로고 이미지로 바꿔야함 클릭시 메인으로 이동까지.*/}
            <Image src={'/logo.png'} alt='로고' width={50} height={50}/>
            <div className='flex gap-2'>
                <span>TEST님</span>
                <span>Logout</span>
            </div>
        </div>
    )
}

export default Header
