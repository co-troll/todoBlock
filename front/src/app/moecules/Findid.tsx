'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react'

const Findid = () => {

    const router = useRouter();

    const phoneInput = useRef<any>(null);

    const findBtn = async () => {
        const phoneValue = phoneInput.current.value;

        try {
            const response = await axios.post('http://localhost:4000/users/findingpassword', { phoneNumber: phoneValue })
            console.log(response.data)
        } catch (error) {
            console.error('에러 발생', error)
        }
        // router.push('findid/userid')
    }

    return (
        <div className='flex flex-col gap-5 px-10 pt-5'>
            <div className='flex gap-1'>
                <input type='text' ref={phoneInput} placeholder='휴대전화번호 입력(`-`제외)' className='w-3/4 h-10 border-b-[1px] pl-1 focus:outline-none'></input>
                <button className='w-1/4 h-10 border-[1px] border-purple-900 rounded-full text-sm font-bold text-purple-900'>인증번호 전송</button>
            </div>
            <div className='flex gap-1'>
                <input type='text' placeholder='인증번호 입력' className='w-3/4 h-10 border-b-[1px] pl-1 focus:outline-none'></input>
                <button className='w-1/4 h-10 border-[1px] border-purple-900 rounded-full text-sm font-bold text-purple-900'>확인</button>
            </div>
            <button className='w-full h-10 rounded-full bg-purple-900 text-white' onClick={findBtn}>아이디 찾기</button>
        </div>
    )
}

export default Findid
