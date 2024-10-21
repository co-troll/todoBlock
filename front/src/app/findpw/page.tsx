'use client'

import React, { useRef, useState } from 'react'
import Line from '../components/Line'
import BackDiv from '../components/BackDiv'
import { useAtom } from 'jotai'
import { urlAtom, userInputAtom } from '../state/Atom'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Loading from '../components/Loading'

const page = () => {
    const [url, setUrl] = useAtom(urlAtom);
    const [smsConfirm, setSMSConfirm] = useState('');
    const [confirm, setConfirm] = useState(false);
    const [userInfo, setUserInfo] = useAtom(userInputAtom);

    setUrl(false);

    const idInput = useRef<any>(null);
    const phoneInput = useRef<any>(null);
    const SMSConfirmInput = useRef<any>(null);

    const router = useRouter();

    const toFindPw = () => {
        router.push('/findpw')
    }

    const toFindId = () => {
        router.push('/findid')
    }

    //인증번호 요청
    const reqPhone = async () => {
        const idValue = idInput.current.value;
        const phoneValue = phoneInput.current.value;

        try {
            const response = await axios.post('http://localhost:4000/auth/checkpassword', { uid:idValue, phoneNumber: phoneValue })
            console.log(response.data) // 인증번호 콘솔
            alert('인증번호를 전송했습니다.')
            setSMSConfirm(response.data)
        } catch (error) {
            console.error('에러 발생', error)
            alert('입력하신 정보와 일치하는 회원이 없습니다.\n해당 정보를 다시 확인하시거나 회원가입을 해주세요')
        }
    }

    // 인증확인 버튼
    const smsCheck = () => {
        const SMSConfirmValue = SMSConfirmInput.current.value;

        if (smsConfirm == SMSConfirmValue && SMSConfirmValue.length == 6) {
                alert('인증이 완료되었습니다.')
                setConfirm(true);
        } else {
            alert('인증번호가 잘못되었습니다.')
        }
    }

    const findPwBtn = async () => {
        const idValue = idInput.current.value;
        const phoneValue = phoneInput.current.value;

        if(confirm){
            try{
                const response = await axios.post('http://localhost:4000/users/requestpasswordchange' ,{ uid:idValue , phoneNumber:phoneValue})
                console.log(response)
                alert('성공')
                setUserInfo({
                    uid:idValue,
                    uphone:phoneValue
                })
                router.push(`/findpw/userpw`)
            }catch(error){
                console.error('에러 발생', error)
            }
        }else{
            alert('휴대폰 인증을 해주세요.')
        }
    }

    return (
        <div className='w-full flex flex-col gap-5'>
            <BackDiv text='아이디 / 비밀번호 찾기' />
            <div className='flex flex-col gap-5'>
                <div className='flex text-xl'>
                    <div className='w-1/2 flex flex-col items-center text-gray-400 hover:cursor-pointer' onClick={toFindId}>
                        <p>아이디 찾기</p>
                        <Line color='bg-gray-400' />
                    </div>
                    <div className='w-1/2 flex flex-col items-center text-purple-900 hover:cursor-pointer' onClick={toFindPw}>
                        <p>비밀번호 찾기</p>
                        <Line color='bg-purple-900' />
                    </div>
                </div>
                <div className='flex flex-col px-10 gap-4'>
                    <div className='flex gap-1 '>
                        <input type='text' ref={idInput} placeholder='아이디 입력' className='w-full h-10 border-b-[1px] pl-1 focus:outline-none'></input>
                    </div>
                    <div className='flex gap-1'>
                        <input type='text' ref={phoneInput} placeholder='휴대폰번호 입력(`-`제외)' className='w-3/4 h-10 border-b-[1px] pl-1 focus:outline-none'></input>
                        <button onClick={reqPhone} className='w-1/4 h-10 border-[1px] border-purple-900/80 rounded-full text-sm font-bold text-purple-900'>인증번호 전송</button>
                    </div>
                    <div className='flex gap-1'>
                        <input type='text' ref={SMSConfirmInput} placeholder='인증번호 입력' className='w-3/4 h-10 border-b-[1px] pl-1 focus:outline-none'></input>
                        <button onClick={smsCheck} className='w-1/4 h-10 border-[1px] border-purple-900/80 rounded-full text-sm font-bold text-purple-900'>확인</button>
                    </div>
                    <button onClick={findPwBtn} className='w-full h-10 rounded-full bg-purple-900/80 text-white'>비밀번호 찾기</button>
                </div>
            </div>
        </div>
    )
}

export default page
