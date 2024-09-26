import React from 'react'
import Input from '../components/Input'
import Button from '../components/Button'

const LoginForm = () => {
    return (
        <form className='flex flex-col px-10 gap-3 items-center
        '>
            <Input place='아이디' />
            <Input place='비밀번호' />
            <Button />
        </form>
    )
}

export default LoginForm
