import axios from "axios";


export const api = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
        "Content-Type": "application/json"
    }
});


api.interceptors.request.use(config => {

    const token = localStorage.getItem("accessToken");
    if(token){ config.headers.Authorization = `Bearer ${token}`}
    return token;
})

const failed = async (error) => {

    const originalRequest = error.config;

    if(error.response?.status === 401 && !originalRequest._retry){

        originalRequest._retry = true;

        const refresh = localStorage.getItem("refreshToken");
        
        try{
            const res = await api.post("refresh/", {refresh});
            
            if(res.data.refresh){
                localStorage.setItem("refreshToken", res.data.refresh);
            }
            
            localStorage.setItem("accessToken", res.data.access);

            return api(originalRequest);
        
        }catch(error){
            
            console.log(error);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            
            window.location.href = "/login";

            return Promise.reject(error);
        }
    
    }

    return Promise.reject(error);

}

api.interceptors.response.use(res => res, failed);

