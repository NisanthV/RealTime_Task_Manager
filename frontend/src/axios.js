import axios from "axios";


export const api = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
        "Content-Type": "application/json"
    }
});


api.interceptors.request.use(config => {
    const token = localStorage.getItem("accessToken");
    // console.log("Request interceptor - Token:", token);
    // console.log("Request URL:", config.url);
    console.log(config)
    
    if(token){ 
        config.headers.Authorization = `Bearer ${token}`;
        // console.log("Authorization header set:", config.headers.Authorization);
    } else {
        console.log("No token found for request");
    }
    return config;
})

const failed = async (error) => {
    console.log("Response interceptor - Error:", error);
    console.log("Error status:", error.response?.status);
    console.log("Error config:", error.config);

    const originalRequest = error.config;

    if(error.response?.status === 401 && !originalRequest._retry){
        // console.log("Attempting token refresh...");
        originalRequest._retry = true;

        const refresh = localStorage.getItem("refreshToken");
        // console.log("Refresh token:", refresh);
        
        try{
            const res = await api.post("refresh/", {refresh});
            console.log("Refresh response:", res.data);
            
            if(res.data.refresh){
                localStorage.setItem("refreshToken", res.data.refresh);
            }
            
            localStorage.setItem("accessToken", res.data.access);
            // console.log("New access token set:", res.data.access);
            
            return api(originalRequest);
        
        }catch(refreshError){
            console.log("Refresh failed:", refreshError);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            
            window.location.href = "/login";

            return Promise.reject(refreshError);
        }
    
    }

    return Promise.reject(error);

}

api.interceptors.response.use(res => res, failed);

