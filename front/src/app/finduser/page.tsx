import React from 'react'
import BackDiv from '../components/BackDiv'
import LineDiv from '../components/LineDiv'
import Find from '../moecules/Find'

const page = () => {
    return (
        <div className='flex flex-col gap-5'>
            <Find />
            <div className='flex flex-col px-10 gap-5'>
                <button className='flex w-full h-10 px-10 justify-center items-center border-2 border-black text-2xl'>아이디 찾기</button>
                <button className='flex w-full h-10 px-10 justify-center items-center border-2 border-black text-2xl'>비밀번호 찾기</button>
            </div>
        </div>
    )
}

export default page
