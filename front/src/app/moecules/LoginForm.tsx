'use client'

import axios from 'axios'
import React, { useRef } from 'react'
import Input from '../components/Input'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoginForm = () => {

    const uidInput = useRef<any>(null);
    const upwInput = useRef<any>(null);
    const router = useRouter();

    const LoginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const uid = uidInput.current.value;
        const upw = upwInput.current.value;

        try {
            const response = await axios.post('http://localhost:4000/auth/login', { uid, upw },
                {
                    withCredentials:true,
                }
            );

            if(response.status === 200){
                router.push('/todolist')
            }
        }catch(error:any){
            if(error.response && error.response.status === 401){
                alert('아이디 또는 비밀번호를 다시 확인해주세요.');
            }else{
                console.error('에러',error)
                alert('로그인 중 오류가 발생')
            }
        }
    }

    return (
        <div>
            <form className='flex flex-col px-6 gap-3 items-center' onSubmit={LoginHandler}>
                <label className='flex w-full h-5 text-[28px] items-center'>아이디</label>
                <Input type='text' place='아이디를 입력하세요' inputRef={uidInput} />
                <label className='flex w-full h-6 text-2xl items-center'>비밀번호</label>
                <Input type='password' place='비밀번호를 입력하세요' inputRef={upwInput} />
                <button className='flex w-full h-9 rounded-md bg-purple-900/80 justify-center text-white text-xl items-center'>로그인</button>
                <Link href='/signup' children='회원가입' className='flex w-full h-9 rounded-md bg-purple-900/80 justify-center text-white text-xl items-center' />
            </form>
        </div>
    )
}

export default LoginForm
