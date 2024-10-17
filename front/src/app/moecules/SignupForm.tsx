'use client'

import axios from 'axios'
import styled from '../style.module.css'
import React, { useRef, useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const SignupForm = () => {

    const router = useRouter();

    const uidInput = useRef<any>(null);
    const upwInput = useRef<any>(null);
    const confirmPw = useRef<any>(null);
    const phoneNum = useRef<any>(null);

    const [idAvailable, setIdAvailable] = useState<boolean | null>(null);

    const idCheck = async () => {
        const uid = uidInput.current.value;
        const regexId = /^[a-z0-9]{6,16}$/;
        const isIdValid = regexId.test(uid);

        try {
            const response = await axios.get(`http://localhost:4000/users/check/${uid}`)

            if (response.status === 200) {
                if (!isIdValid) {
                    setIdAvailable(false);
                } else {
                    setIdAvailable(true);
                }
            }
        } catch (error) {
            setIdAvailable(false);
        }
    }

    const SignupHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const uid = uidInput.current.value;
        const upw = upwInput.current.value;
        const rePw = confirmPw.current.value;
        const uPhone = phoneNum.current.value;

        // 정규식
        const regexId = /^[a-z0-9]{6,16}$/;
        const regexPassword = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/;
        const regexPhone = /^01[016789]-?\d{3,4}-?\d{4}$/;

        const isIdValid = regexId.test(uid);
        const isPasswordValid = regexPassword.test(upw);
        const isPhoneNumberValid = regexPhone.test(uPhone);

        if (upw !== rePw) {
            alert('비밀번호가 일치하지 않습니다.')
            return;
        } else if (!isIdValid) {
            alert('아이디는 영문과 숫자로 이루어진 6글자~16글자만 가능합니다.')
            return;
        } else if (!isPasswordValid) {
            alert('비밀번호는 영문,숫자 포함한 8글자~16글자만 가능합니다.')
            return;
        } else if (!isPhoneNumberValid) {
            alert('휴대폰 번호를 다시 확인해주세요.')
            return;
        }


        try {
            const response = await axios.post('http://localhost:4000/users/signup', {
                uid: uid,
                upw: upw,
                phoneNumber: uPhone,
            });

            alert('회원가입 성공, 로그인 페이지로 이동합니다.')

            router.push('/login')

        } catch (error: any) {
            if (error.response.status || error.response === 409) {
                alert('아이디 또는 핸드폰번호 중복입니다.')
            } else {
                console.error('회원가입 실패', error);
                alert('회원가입 중 오류가 발생했습니다.');
            }
        }
    }

    return (
        <div>
            <form className='flex flex-col px-6 gap-3 items-center relative'>
                <label className='flex w-full h-5 text-[28px] items-center'>아이디</label>
                {/* <p className={styled.greenText}>사용 가능한 아이디입니다.</p> */}
                {idAvailable === true && (
                    <p className={styled.greenText} style={{ display: 'block' }}>
                        사용 가능한 아이디입니다.
                    </p>
                )}
                {/* // <p className={styled.redText}>중복된 아이디입니다.</p> */}
                {idAvailable === false && (
                    <p className={styled.redText} style={{ display: 'block' }}>
                        사용 불가능한 아이디입니다.
                    </p>
                )}
                <Input type='text' place='아이디를 입력하세요.' inputRef={uidInput} />
                <button type='button' onClick={idCheck} className='w-16 h-8 absolute text-white rounded-md border-2 border-none bg-purple-900/80 right-6 top-6'>중복 확인</button>
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
