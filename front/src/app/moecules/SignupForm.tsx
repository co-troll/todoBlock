'use client'


import React, { useEffect, useRef } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import Link from 'next/link'
import { useAtom } from 'jotai'
import { userAtom } from '../state/userAtom'
import { redirect } from 'next/navigation'

const SignupForm = () => {
    const [user, setUser] = useAtom(userAtom);

    const uidInput = useRef<any>(null);
    const upwInput = useRef<any>(null);
    const confirmPw = useRef<any>(null);
    const phoneNum = useRef<any>(null);

    const SignupHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const uid = uidInput.current.value;
        const upw = upwInput.current.value;
        const rePw = confirmPw.current.value;
        const uPhone = phoneNum.current.value;

        // 정규식
        const regexId = /^[a-z0-9]{8,16}$/;
        const regexPassword = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/;
        const regexPhone = /^01[016789]-\d{3,4}-\d{4}$/;

        const isIdValid = regexId.test(uid);
        const isPasswordValid = regexPassword.test(upw);
        const isPhoneNumberValid = regexPhone.test(uPhone);

        if (upw !== rePw) {
            alert('비밀번호가 일치하지 않습니다.')
        }else if(!isIdValid){
            alert('아이디는 문자열로 이루어진 8글자~16글자만 가능합니다.')
        }else if(!isPasswordValid ){
            alert('비밀번호는 영문,숫자 포함 8글자~16글자만 가능합니다.')
        }else if( isPhoneNumberValid ){
            alert('휴대폰 번호를 다시 확인해주세요.')
        }else {
            setUser((prevUser) => ({
                users: [
                    ...prevUser.users,
                    {
                        uid,
                        upw,
                        uPhone,
                    }
                ]
            }))
            alert('회원가입 성공')
            redirect('/login')
        }
    }

    useEffect(() => {
        if (user) {
            console.log('user 업데이트', user);
        }
    }, [user])

    return (
        <div>
            <form className='flex flex-col px-6 gap-3 items-center'>
                <label className='flex w-full h-5 text-[28px] items-center'>아이디</label>
                <Input type='text' place='아이디를 입력하세요.' inputRef={uidInput} />
                <label className='flex w-full h-5 text-2xl items-center'>비밀번호</label>
                <Input type='password' place='비밀번호를 입력하세요.' inputRef={upwInput} />
                <label className='flex w-full h-5 text-2xl items-center'>비밀번호 확인</label>
                <Input type='password' place='비밀번호를 한번 더 입력하세요.' inputRef={confirmPw} />
                <label className='flex w-full h-5 text-2xl items-center'>휴대폰 번호</label>
                <Input type='text' place='휴대폰번호를 입력하세요.' inputRef={phoneNum} />
                <Button type='submit' onClick={SignupHandler} children='회원가입' />
                <Link href='/login' children='돌아가기' className='flex w-full h-8 rounded-md bg-purple-900/80 justify-center text-white text-lg' />
            </form>
        </div>
    )
}

export default SignupForm
