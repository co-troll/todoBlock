import React from 'react'
import styled from '../style.module.css'

const BackBtn = ({onClick} : {onClick : React.MouseEventHandler<HTMLDivElement>}) => {
    return (
        <div className={styled.backBtn} onClick={onClick}></div>
    )
}

export default BackBtn
