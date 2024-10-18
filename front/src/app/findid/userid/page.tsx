'use client'

import BackDiv from '@/app/components/BackDiv'
import { urlAtom } from '@/app/state/Atom';
import { useAtom } from 'jotai'

const page = () => {

    const [url, setUrl] = useAtom(urlAtom);

    setUrl(true);

    return (
        <div>
            <BackDiv />
        </div>
    )
}

export default page
