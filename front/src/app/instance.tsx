import axios from "axios";

console.log(process.env.NEXT_PUBLIC_DEVELOP);

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_DEVELOP ? "http://localhost:4000" : `http://${process.env.NEXT_PUBLIC_AWS_URL}:4000`,
    withCredentials: true
})

export default instance;