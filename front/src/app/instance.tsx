import axios from "axios";
require("dotenv").config();

console.log(process.env.DEVELOP);

const instance = axios.create({
    baseURL: "http://localhost:4000",
    withCredentials: true
})

export default instance;