import { create } from "zustand";
import { MMKV } from "react-native-mmkv";
import { createJSONStorage, persist } from "zustand/middleware";
import { mmkvStorage } from "./storage"; // Ensure you have this
import { basketCreate } from "../services/basketServices";

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            currentOrder: null,
            cart: {},

            addProduct: (productId,name,productWeight,productPrice,image) => {
                //1.update zustand
                set((state) => {
                    const cart =  {
                        ...state.cart,
                        [productId]: {
                            quantity: (state.cart[productId]?.quantity || 0) + 1,
                            price: productPrice,
                            name,
                            productWeight,
                            image
                        },
                    }
                    return {cart}
                });

                //2.update backand
                const userId = get().user._id;
                const quantity = get().cart[productId].quantity;
                //now call api function and pass parameters
                basketCreate(userId,quantity,productId);

            },
            removeProduct: (productId) => {
                set((state) => {
                    const newCart = { ...state.cart };
                    if (newCart[productId]) {
                        if (newCart[productId].quantity > 1) {
                            newCart[productId].quantity -= 1;
                        } else {
                            delete newCart[productId];
                        }
                    }
                    return { cart: newCart };
                });
            },

            setUser: (data) => set({ user: data }),
            setCurrentOrder: (order) => set({ currentOrder: order }),
            clearCart:()=>set({ cart: {} }),
            logout: () => set({ user: null, currentOrder: null, cart: {} }),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => mmkvStorage),
        }
    )
);

