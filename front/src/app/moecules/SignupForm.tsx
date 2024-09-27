import React from 'react'
import Input from '../components/Input'
import Button from '../components/Button'

const SignupForm = () => {
    return (
        <div>
            <form className='flex flex-col px-10 gap-3 items-center'>
            <Input place='아이디' />
            <Input place='비밀번호' />
            <Input place='비밀번호확인' />
            <Button children='회원가입'/>
            <Button children='회원가입'/>
        </form>
        </div>
    )
}

export default SignupForm
