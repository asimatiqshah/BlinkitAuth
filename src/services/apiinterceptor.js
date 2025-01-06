import axios from "axios";
import { BASE_URL } from "./config";
import { tokenStorage } from "../state/storage";
import { Alert } from "react-native";

// 1. Create an instance of Axios
// 2. Request Interceptor
// 3. Response Interceptor


// 1. Create an instance of Axios
export const apiAxios = axios.create({
    baseURL: BASE_URL,
});

// 2. Request Interceptor
apiAxios.interceptors.request.use(
    (config) => {
        // Modify the request before sending it, e.g., add an authorization token
        const accessToken = tokenStorage.getString('accessToken');
        console.log("i am here in apiinterceptor");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        // You can also add logging or other request-related logic here
        console.log('Request:', config);
        return config;
    }
);

// 3. Response Interceptor
apiAxios.interceptors.response.use(
    (response) => {
        // Modify the response or handle success globally
        return response;
    },
    async (error)=>{
        if(error.response && error.response.status === 401){
            try {
                const newAccessToken = tokenStorage.getString('accessToken');
                console.log("New Access Token Generated in apiinterceptor");
                if(newAccessToken){
                    error.config.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axios(error.config);
                }

            } catch (error) {
                console.log("Error in refresh token");
            }
        }

        if(error.response && error.response.status !== 401){
            const errorMessage = error.response.data.message || "something went wrong";
            Alert.alert(errorMessage);
        }

        return Promise.resolve(error);
    }
)