import React, { ReactNode } from 'react'
import { Nanum_Pen_Script } from "next/font/google";

const nanum = Nanum_Pen_Script({ subsets: ['latin'], weight: ['400'], preload:false});

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <html>
            <body className={nanum.className}>
                {children}
            </body>
        </html>
    )
}

export default layout
