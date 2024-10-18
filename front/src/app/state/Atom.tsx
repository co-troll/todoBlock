import { atom } from "jotai";

export const userAtom = atom({
    users: [
        {
            uid:'',
            upw:'',
            uPhone:'',
        }
    ]
})

export const userInputAtom = atom({
    uid:'',
    uphone:'',
})

export const urlAtom = atom(false)