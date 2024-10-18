import React, { ReactNode } from 'react'
import { Nanum_Pen_Script } from "next/font/google";

const nanum = Nanum_Pen_Script({ weight: ['400'], preload:false, display: 'swap'});

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className={nanum.className}>
            {children}
        </div>
    )
}

export default layout
