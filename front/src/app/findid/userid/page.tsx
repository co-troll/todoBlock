'use client'

import BackDiv from '@/app/components/BackDiv'
import { urlAtom } from '@/app/state/Atom';
import axios from 'axios';
import { useAtom } from 'jotai'

const page = () => {

    const [url, setUrl] = useAtom(urlAtom);

    setUrl(true);

    // try{
    //     const response = axios.get()
    // }

    return (
        <div>
            <BackDiv text='아이디 찾기' />
        </div>
    )
}

export default page
