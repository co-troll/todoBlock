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