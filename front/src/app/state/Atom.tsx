import { atom } from "jotai";

export const Atom = atom({
    users: [
        {
            uid:'',
            upw:'',
            uPhone:'',
        }
    ]
})

export const urlAtom = atom(false)