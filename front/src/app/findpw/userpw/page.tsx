'use client'

import BackDiv from '@/app/components/BackDiv';
import Line from '@/app/components/Line';
import { userInputAtom } from '@/app/state/Atom';
import axios from 'axios';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react'

const page = () => {
    const [userInfo, setUserInfo] = useAtom(userInputAtom);
    const router = useRouter();
    
    const pwInput = useRef<any>(null);
    const pwCheckInput = useRef<any>(null);
    
    const changBtn = async () => {
        const regexPassword = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/;
        const regexCheck = regexPassword.test(pwInput.current.value)
        
        if(!regexCheck){
            alert('비밀번호가 조건에 맞지 않습니다.')
        }else if(pwInput.current.value !== pwCheckInput.current.value){
            alert('비밀번호가 일치하지 않습니다.')
        }else{
            try{
                const response = await axios.patch(`http://localhost:4000/users/${userInfo.uid}`, {upw: pwInput.current.value})
                router.push('/findpw/userpw/success')
            }catch(error){
                console.error('에러 발생', error)
            }
        }
    }


    return (
        <div className='w-full flex flex-col gap-5'>
            <div>
                <BackDiv text='비밀번호 찾기' />
                <Line color='border-gray-300 border-[1px]' />
            </div>
            <p className='px-10 text-2xl'>비밀번호 재설정</p>
            <p className='px-10 text-sm'>비밀번호는 문자,숫자 포함 6글자~16글자만 가능합니다.</p>
            <div className='w-full flex flex-col px-10 gap-3'>
                <input type='password' ref={pwInput} className='w-full h-9 border-b-[1px] focus:outline-none pl-1' placeholder='비밀번호를 입력해주세요.' />
                <input type='password' ref={pwCheckInput} className='w-full h-9 border-b-[1px] focus:outline-none pl-1' placeholder='비밀번호를 한번 더 입력해주세요.' />
                <button onClick={changBtn} className='w-full h-10 rounded-full bg-purple-900/80 text-white'>비밀번호 변경</button>
            </div>
        </div>
    )
}

export default page
