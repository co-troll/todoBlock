'use client'

import React, { useRef, useState } from 'react'
import BackDiv from '../components/BackDiv'
import Line from '../components/Line'
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { userInputAtom, urlAtom, userAtom } from '../state/Atom';
import axios from 'axios';

const page = () => {

    const [url, setUrl] = useAtom(urlAtom);
    const [userInput, setUserInput] = useAtom(userInputAtom);
    const [SMSConfirm, setSMSConfirm] = useState(false);

    setUrl(false);

    const phoneInput = useRef<any>(null);
    const SMSConfirmInput = useRef<any>(null);
    const router = useRouter();

    const toFindPw = () => {
        router.push('/findpw')
    }

    const toFindId = () => {
        router.push('/findid')
    }

    // 인증요청 버튼
    const reqPhone = async () => {
        const phoneValue = phoneInput.current.value;

        try {
            const response = await axios.post('http://localhost:4000/', phoneValue)
            // response에 랜덤함수값
            console.log(response)
            // setSMSConfirm(response)
        } catch (error) {
            console.error('에러 발생', error)
        }
    }

    // 인증확인 버튼
    const checkNum = () => {
        const SMSConfirmValue = SMSConfirmInput.current.value;
        if(SMSConfirm === SMSConfirmValue){
            console.log('인증완료')
            alert('인증 완료되었습니다.')
            return true;
        }
    }

    // 아이디 찾기 버튼
    const findBtn = async () => {
        const phoneValue = phoneInput.current.value;

        try {
            const response = await axios.post('http://localhost:4000/users/findingpassword', { phoneNumber: phoneValue })
            console.log(response.data.uid)
            if (response.data) {
                if (checkNum()) {
                    setUserInput({
                        uid: response.data.uid,
                        uphone: phoneValue,
                    })
                    router.push('findid/userid')
                }
            } else {
                console.log('오류 발생')
            }
        } catch (error) {
            console.error('에러 발생', error)
        }
    }

    return (
        <div className='flex flex-col gap-5'>
            <BackDiv text='아이디 / 비밀번호 찾기' />
            <div className='flex flex-col gap-2'>
                <div className='flex text-xl'>
                    <div className='w-1/2 flex flex-col items-center text-purple-900 hover:cursor-pointer' onClick={toFindId}>
                        <p>아이디 찾기</p>
                        <Line color='bg-purple-900' />
                    </div>
                    <div className='w-1/2 flex flex-col items-center text-gray-400 hover:cursor-pointer' onClick={toFindPw}>
                        <p>비밀번호 찾기</p>
                        <Line color='bg-gray-400' />
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-4 px-10'>
                <div className='flex gap-1'>
                    <input type='text' ref={phoneInput} placeholder='휴대전화번호 입력(`-`제외)' className='w-3/4 h-10 border-b-[1px] pl-1 focus:outline-none'></input>
                    <button className='w-1/4 h-10 border-[1px] border-purple-900/80 rounded-full text-sm font-bold text-purple-900' onClick={reqPhone}>인증번호 전송</button>
                </div>
                <div className='flex gap-1'>
                    <input type='text' placeholder='인증번호 입력' className='w-3/4 h-10 border-b-[1px] pl-1 focus:outline-none'></input>
                    <button className='w-1/4 h-10 border-[1px] border-purple-900/80 rounded-full text-sm font-bold text-purple-900'>확인</button>
                </div>
                <button className='w-full h-10 rounded-full bg-purple-900/80 text-white' onClick={findBtn}>아이디 찾기</button>
            </div>
            {/* <Findid /> */}
        </div>
    )
}

export default page
