'use client'

import BackDiv from '@/app/components/BackDiv'
import Line from '@/app/components/Line';
import { urlAtom, userInputAtom } from '@/app/state/Atom';
import { useAtom, useAtomValue } from 'jotai'
import { useRouter } from 'next/navigation';

const page = () => {

    const [url, setUrl] = useAtom(urlAtom);
    const userInput = useAtomValue(userInputAtom);
    const router = useRouter();

    setUrl(true);

    const toLogin = () => {
        router.push('/login')
    }

    const toFindPw = () => {
        router.push('/findpw')
    }

    return (
        <div className='w-full flex flex-col gap-5'>
            <div>
                <BackDiv text='아이디 찾기' />
                <Line color='border-gray-300 border-[1px]' />
            </div>
            <div className='flex flex-col w-full px-10 gap-10'>
                <div className='flex flex-col text-3xl gap-2'>
                    <p>입력한 정보와 일치하는 </p>
                    <p>아이디를 확인해 주세요.</p>
                </div>
                <div>
                    <div className='text-2xl'>아이디: {userInput.uid}</div>
                    <div className='text-xl'>휴대폰 번호: {userInput.uphone}</div>
                </div>
                <div className='flex flex-col gap-2'>
                    <button onClick={toLogin} className='w-full h-10 rounded-full bg-purple-900 text-white'>로그인 하러 가기</button>
                    <button onClick={toFindPw} className='w-full h-10 rounded-full bg-purple-900 text-white'>비밀번호 찾기</button>
                </div>
            </div>
        </div>
    )
}

export default page
