import axios from "axios";
import { BASE_URL } from "./config";

export const basketCreate = async(userId, quantity, productId) =>{

    try {
        let response = await axios.post(`${BASE_URL}/customer/basket/create`,{userId, quantity, productId});
        console.log(response.data.data);
        console.log();
        
    } catch (error) {
        console.log("Error in basket ",error);
    }
}