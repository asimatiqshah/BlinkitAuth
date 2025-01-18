import axios from "axios";
import { BASE_URL } from "./config";
import { tokenStorage } from "../state/storage";
import { useAuthStore } from "../state/authStore";
import { apiAxios } from "./apiinterceptor";

//THIS FUNCTION - USING IN CUSTOMER LOGIN TO CHECK USER IN DATABASE
export const customerLoginHandler = async (phoneNumber) => {
    try {
        let response = await axios.post(`${BASE_URL}/customer/login`, { phone: phoneNumber },{
            headers: {
                'Content-Type': 'application/json'
              }
        });
        console.log(response);
        const { accessToken, refreshToken, customer } = response.data;
        console.log("going here");
        
        tokenStorage.set('accessToken', accessToken);
        tokenStorage.set('refreshToken', refreshToken);
        const { setUser } = useAuthStore.getState();
        console.log(accessToken);
        setUser(customer);

    } catch (error) {
        console.log(error);
        console.log(error.response);
    }
}

//THIS FUNCTION - USING THIS FUNCTION IN SPLASH SCREEN AND RUN THIS WHEN ACCESS TOKEN EXPIRED
export const refreshTokenHandler = async (refreshToken, navigation) => {
    try {
        let result = await axios.post(`${BASE_URL}/refresh-token`, { refreshToken });
        const newAccessToken = result.data.accessToken;
        console.log(newAccessToken);
        
        const newRefreshToken = result.data.refreshToken;
        tokenStorage.set('accessToken', newAccessToken);
        tokenStorage.set('refreshToken', newRefreshToken);
        return newAccessToken;
    } catch (error) {
        console.log("REFRESH TOKEN ERROR ", error.response);
        //this will reset the storage by delete all the key-value pairs stored in the MMKV instance.
        tokenStorage.clearAll();
        navigation.reset({
            index: 0,
            routes: [{ name: 'CustomerLogin' }]
        });

    }
}

//REFTECH USER
export const refetchUser = async (setUser) => {
    try {
        const response = await apiAxios('/user');
        setUser(response);
    } catch (error) {
        console.log("Login Error Refetch user error",error);
    }
}