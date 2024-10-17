'use client'

import React, { useState } from 'react'
import BackBtn from './BackBtn'
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { urlAtom } from '../state/Atom';

const BackDiv = ({text}:{text?:string}) => {

    const [url, setUrl] = useAtom(urlAtom)

    const router = useRouter();

    const backBtn = () => {
        router.push(url ? '/findid' : '/login')
    }

    return (
        <div className='flex w-full h-[50px]'>
            <BackBtn onClick={backBtn}/>
            <p className='flex w-full items-center justify-center text-xl'>{text}</p>
        </div>
    )
}

export default BackDiv
