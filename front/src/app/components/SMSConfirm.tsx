'use client'

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

const SMSConfirm = () => {
    const [smsConfirm, setSMSConfirm] = useState('');
    const [Confirm, setConfirm] = useState(false);

    const phoneInput = useRef<any>(null);
    const SMSConfirmInput = useRef<any>(null);

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
        const phoneValue = phoneInput.current.value;

        try {
            const response = await axios.post('http://localhost:4000/auth/SMSAuthentication', { number: phoneValue })
            console.log(response.data) // 인증번호 콘솔
            // alert('인증번호 전송이 완료되었습니다.')
            setSMSConfirm(response.data)
            setIsSend(true);
        } catch (error) {
            console.error('에러 발생', error)
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
                setIsSend(false);
            } else {
                alert('인증 시간이 초과되었습니다.')
            }
        } else {
            alert('인증번호가 잘못되었습니다.')
        }
    }

    return (
        <div className='flex flex-col px-6 gap-6 items-center relative'>
            <label className='flex w-full h-5 text-2xl items-center'>휴대폰 번호</label>
            <input type='text' ref={phoneInput} placeholder='휴대전화번호 입력(`-`제외)' className='w-full h-6 pl-1 bg-transparent border-b-[1px] border-black placeholder:text-gray-400 placeholder:text-sm focus:outline-none'></input>
            {!isSend ?
                <button className='w-16 h-8  text-white absolute rounded-md border-2 border-none bg-purple-900/80 right-6 top-9' onClick={reqPhone}>인증번호 전송</button>
                : <div className='w-16 h-8  text-white absolute rounded-md border-2 border-none bg-purple-900/80 right-6 top-9'>{formatTime(time)}</div>
            }
            <input type='text' placeholder='인증번호 입력' className='w-full h-6 pl-1 bg-transparent border-b-[1px] border-black placeholder:text-gray-400 placeholder:text-sm focus:outline-none' ref={SMSConfirmInput}></input>
            {!Confirm ?
                <button className='w-16 h-8  text-white absolute rounded-md border-2 border-none bg-purple-900/80 right-6 top-[83px]' onClick={checkNum}>확인</button>
                : <div className='w-16 h-8  text-white  absolute rounded-md border-2 border-none bg-purple-900/80 right-6 top-[83px]'>완료</div>
            }
        </div>
    )
}

export default SMSConfirm
