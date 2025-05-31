import axios from "axios";
import { BASE_URL } from "./config";
import { tokenStorage } from "../state/storage";
import { useAuthStore } from "../state/authStore";
import { apiAxios } from "./apiinterceptor";

//THIS FUNCTION - USING IN CUSTOMER LOGIN TO CHECK USER IN DATABASE
export const customerLoginHandler = async (phoneNumber) => {
    try {
        let response = await axios.post(`${BASE_URL}/customer/login`, { phone: phoneNumber }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        const { accessToken, refreshToken, customer } = response.data;

        tokenStorage.set('accessToken', accessToken);
        tokenStorage.set('refreshToken', refreshToken);
        const { setUser } = useAuthStore.getState();
        setUser(customer);

    } catch (error) {
        console.log(error);
        console.log(error.response);
    }
}

//DELIVERY LOGIN
export const DeliveryLoginHandler = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/delivery/login`, { email, password });
        const { accessToken, refreshToken, deliveryPartner } = response.data;
        tokenStorage.set('accessToken', accessToken);
        tokenStorage.set('refreshToken', refreshToken);
        const { setUser } = useAuthStore.getState();
        setUser(deliveryPartner);
    } catch (error) {
        console.log("Login Error", error);
    }
}

//THIS FUNCTION - USING THIS FUNCTION IN SPLASH SCREEN AND RUN THIS WHEN ACCESS TOKEN EXPIRED
export const refreshTokenHandler = async (refreshToken, navigation) => {
    try {
        let result = await axios.post(`${BASE_URL}/refresh-token`, { refreshToken });
        const newAccessToken = result.data.accessToken;
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
        setUser(response?.data.user);
    } catch (error) {
        console.log("Login Error Refetch user error", error);
    }
}


export const updateUserLocation = async (data, setUser) => {
    try {
        let result = await apiAxios.post('/user', data);
        refetchUser(setUser);
    } catch (error) {
        console.log("update user location error" ,error);
    }
}

export const fetchOrders = async (status,userId,branchId)=>{
    
    let uri =
    status == 'available'
    ? `/order?status=${status}&branchId=${branchId}`
    :  `/order?branchId=${branchId}&deliveryPartnerId=${userId}&status=delivered`;
    try {
        let response = await apiAxios(uri);
        return response.data;
    } catch (error) {   
        console.log("Fetch Delivery Order Error" ,error);
        return null;
    }
}