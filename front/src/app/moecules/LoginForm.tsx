'use client'

import React, { useRef } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import Link from 'next/link';

const LoginForm = () => {

    const uidInput = useRef<any>(null);
    const upwInput = useRef<any>(null);

    const LoginHandler = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        console.log(uidInput)
        
        const uid = uidInput.current.value;
        const upw = upwInput.current.value;
        
        console.log(uid)
        console.log(upw)
    }

    return (
        <div>
            <form className='flex flex-col px-6 gap-3 items-center' onSubmit={LoginHandler}>
                <label className='flex w-full h-5 text-[28px] items-center'>아이디</label>
                <Input type='text' place='아이디를 입력하세요' inputRef={uidInput}/>
                <label className='flex w-full h-6 text-2xl items-center'>비밀번호</label>
                <Input type='password' place='비밀번호를 입력하세요' inputRef={upwInput}/>
                <button>로그인</button>
                <Link href='/signup' children='회원가입' className='flex w-full h-8 rounded-md bg-purple-900/80 justify-center text-white text-lg'/>
            </form>
        </div>
    )
}

export default LoginForm
