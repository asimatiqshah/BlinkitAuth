import axios from "axios"
import { BASE_URL } from "./config"

export const getAllCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/categories`);
        return response.data.categories;
    } catch (error) {
        console.log("error in fetching categories", error);
        return [];
    }
}

export const productsByCategory = async (categoryId) => {
    try {
        if (!categoryId) {
            console.log("Invalid category");
            return []; // Return empty array to avoid errors
        }
            const response = await axios.get(`${BASE_URL}/products/${categoryId._id}`);
            return response.data.products;
    } catch (error) {
        console.log("error in fetching products", error);
        return [];
    }
}