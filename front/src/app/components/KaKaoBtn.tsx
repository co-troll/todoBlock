'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const KaKaoBtn = () => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&scope=profile_nickname,account_email,gender`

    // const Auth2Redirect = () => {
    //     const [code, setCode] = useState<string | null>(null)
    //     const router = useRouter()
    //     let isSuccessed = false
    //     useEffect(() => {
    //         if (typeof window !== 'undefined') {
    //             new URL(window.location.href).searchParams.get('code') &&
    //                 setCode(new URL(window.location.href).searchParams.get('code'))
    //             // 1. 인가코드 추출
    //         }
    //     }, [])
    //     const kakaoLogin = async () => {
    //         // 3. 추출된 인가코드로 백엔드에 로그인 요청
    //         try {
    //             const res = await axios.get(
    //                 `/usports/login/oauth2/code/kakao?code=${code}`,
    //             )
    //             if (res.status === 200) {
    //                 // 로그인 성공 시 로직 처리
    //                 isSuccessed = true
    //             }
    //         } catch (error) {
    //             console.log(error)
    //         }
    //         if (isSuccessed) {
    //             router.replace('/')
    //         }
    //     }
    //     useEffect(() => {
    //         code !== null && kakaoLogin()
    //         // 2. 인가코드 추출되면 kakaoLogin 로직 실행
    //     }, [code])

    //     return null
    // }
    return (
        <div>
            <Link href={KAKAO_AUTH_URL}>
                <button>카카오로 로그인</button>
            </Link>
        </div>
    )
}

export default KaKaoBtn
