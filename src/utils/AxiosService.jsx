import axios from 'axios'

// https://resume-builder-backend-aap4.onrender.com
// https://resumebuilder-backend-xzhm.onrender.com
// http://localhost:8000/
const AxiosService = axios.create({
    baseURL:" https://resumebuilder-backend-xzhm.onrender.com/",
    headers:{
        "Content-Type":"application/json"
    }
})
// common url for backend - axios service

AxiosService.interceptors.request.use((config)=>{
    const token = sessionStorage.getItem("token")
    if(config.authenticate && token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})
// it is like a middleware, it works request and response 

export default AxiosService