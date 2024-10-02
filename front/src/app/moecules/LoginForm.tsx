import React from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { Nanum_Pen_Script } from "next/font/google";

// const nanum = Nanum_Pen_Script({ weight: ['400'], preload: false });

const LoginForm = () => {
    return (
        <div>
            <form className='flex flex-col px-6 gap-3 items-center'>
                <label className='flex w-full h-5 text-[28px] items-center'>아이디</label>
                <Input place='아이디를 입력하세요' />
                <label className='flex w-full h-6 text-2xl items-center'>비밀번호</label>
                <Input place='비밀번호를 입력하세요' />
                <Button children='로그인' />
                <Button children='회원가입' />
            </form>
        </div>
    )
}

export default LoginForm
