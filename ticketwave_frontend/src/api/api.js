import axios from "axios"

const axios_api = axios.create({
    baseURL: "http://35.195.241.8/api", // tutti i microservizi stanno dietro /api
    withCredentials: true
})
// Interceptor sulle richieste per aggiungere il token
axios_api.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => Promise.reject(error)
)

export default axios_api
