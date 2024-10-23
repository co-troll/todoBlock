'use client'

import axios from 'axios'
import styled from '../style.module.css'
import React, { useEffect, useRef, useState } from 'react'
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
    const SMSConfirmInput = useRef<any>(null);

    const [idAvailable, setIdAvailable] = useState<boolean | null>(null);
    const [smsConfirm, setSMSConfirm] = useState('');
    const [Confirm, setConfirm] = useState(false);
    const [time, setTime] = useState(180);
    const [isSend, setIsSend] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    useEffect(() => {
        if (isSend) {
            intervalRef.current = setInterval(() => {
                setTime((prev) => {
                    if (prev === 0) {
                        clearInterval(intervalRef.current!);
                        setIsSend(false);
                        return 180;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isSend]);

    // 인증요청 버튼
    const reqPhone = async () => {
        const phoneValue = phoneNum.current.value;
        const regexPhone = /^01[016789]-?\d{3,4}-?\d{4}$/;
        const isPhoneNumberValid = regexPhone.test(phoneValue);

        if (isPhoneNumberValid) {
            try {
                const response = await axios.post('http://localhost:4000/auth/SMSAuthentication', { number: phoneValue })
                console.log(response.data) // 인증번호 콘솔
                // alert('인증번호 전송이 완료되었습니다.')
                setSMSConfirm(response.data)
                setIsSend(true);
                setConfirm(false);
            } catch (error) {
                console.error('에러 발생', error)
                alert('휴대폰 번호를 다시 확인해주세요.')
            }
        }else{
            alert('휴대폰 번호를 다시 확인해주세요.')
        }
    }

    // 인증확인 버튼
    const checkNum = () => {
        const SMSConfirmValue = SMSConfirmInput.current.value;

        if (smsConfirm == SMSConfirmValue && SMSConfirmValue.length == 6) {
            if (isSend) {
                alert('인증이 완료되었습니다.')
                setConfirm(true);
                setTime(180);
                setIsSend(false);
            } else {
                alert('인증 시간이 초과되었습니다.')
            }
        } else {
            alert('인증번호가 잘못되었습니다.')
        }
    }

    const idCheck = async () => {
        const uid = uidInput.current.value;
        const regexId = /^[a-zA-Z0-9]{6,16}$/
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
        const regexId = /^[a-zA-Z0-9]{6,16}$/
        const regexPassword = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/;
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
            alert('비밀번호는 문자,숫자 포함 6글자~16글자만 가능합니다.')
            return;
        } else if (!isPhoneNumberValid) {
            alert('휴대폰 번호를 다시 확인해주세요.')
            return;
        }

        if (Confirm) {
            try {
                const response = await axios.post('http://localhost:4000/users/signup', {
                    uid: uid,
                    upw: upw,
                    phoneNumber: uPhone,
                });

                router.push('/signup/success')

            } catch (error: any) {
                if (error.response.status || error.response === 409) {
                    alert('이미 가입된 휴대폰 번호입니다.')
                    setConfirm(false);
                    setTime(180);
                } else {
                    console.error('회원가입 실패', error);
                    alert('회원가입 중 오류가 발생했습니다.');
                }
            }
        } else {
            alert('휴대폰 인증이 필요합니다.')
            return;
        }
    }

    return (
        <div>
            <form className='w-full flex flex-col gap-5'>
                <div className='flex flex-col px-6 gap-5 items-center'>
                    <div className='w-full flex flex-col gap-1 relative'>
                        <label className='flex w-full h-5 text-2xl items-center'>아이디</label>
                        {idAvailable === true && (
                            <p className={styled.greenText} style={{ display: 'block' }}>
                                사용 가능한 아이디입니다.
                            </p>
                        )}
                        {idAvailable === false && (
                            <p className={styled.redText} style={{ display: 'block' }}>
                                사용 불가능한 아이디입니다.
                            </p>
                        )}
                        <Input type='text' place='아이디 입력(6~16자)' inputRef={uidInput} />
                        <button type='button' onClick={idCheck} className='w-20 h-9 absolute text-white rounded-md border-2 border-none bg-purple-900/80 right-0 top-3'>중복 확인</button>
                    </div>
                    <div className='w-full flex flex-col gap-1'>
                        <label className='flex w-full h-5 text-2xl items-center'>비밀번호</label>
                        <Input type='password' place='비밀번호 입력(문자, 숫자 포함 6~16자)' inputRef={upwInput} />
                    </div>
                    <div className='w-full flex flex-col gap-1'>
                        <label className='flex w-full h-5 text-2xl items-center'>비밀번호 확인</label>
                        <Input type='password' place='비밀번호 재입력' inputRef={confirmPw} />
                    </div>
                </div>
                <div className='flex flex-col px-6 gap-4 items-center relative'>
                    <label className='flex w-full h-5 text-2xl items-center'>휴대폰 번호</label>
                    <input type='text' ref={phoneNum} placeholder='휴대전화번호 입력(`-`제외)' className='w-full h-6 pl-1 bg-transparent border-b-[1px] border-black placeholder:text-gray-400 placeholder:text-sm focus:outline-none'></input>
                    {!isSend ?
                        <button type='button' className='w-20 h-9  text-white absolute rounded-md border-2 border-none bg-purple-900/80 right-6 top-6' onClick={reqPhone}>인증번호 전송</button>
                        : <div className='w-20 h-9 flex justify-center items-center text-white absolute rounded-md border-2 border-none bg-purple-900/80 right-6 top-6'>{formatTime(time)}</div>
                    }
                    <input type='text' placeholder='인증번호 입력' className='w-full h-6 pl-1 bg-transparent border-b-[1px] border-black placeholder:text-gray-400 placeholder:text-sm focus:outline-none' ref={SMSConfirmInput}></input>
                    {!Confirm ?
                        <button type='button' className='w-20 h-9  text-white absolute rounded-md border-2 border-none bg-purple-900/80 right-6 top-[64px]' onClick={checkNum}>확인</button>
                        : <div className='w-20 h-9 flex justify-center items-center text-white  absolute rounded-md border-2 border-none bg-purple-900/80 right-6 top-[64px]'>완료</div>
                    }
                </div>
                <div className='flex flex-col px-6 gap-3 items-center pt-5'>
                    <Button type='submit' onClick={SignupHandler} children='회원가입' />
                    <Link href='/login' children='돌아가기' className='flex w-full h-9 rounded-md bg-purple-900/80 justify-center text-white text-lg items-center' />
                </div>
            </form>
        </div>
    )
}

export default SignupForm
