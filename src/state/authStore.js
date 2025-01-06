import { create } from "zustand";
import { MMKV } from "react-native-mmkv";
import { createJSONStorage, persist } from "zustand/middleware";
import { mmkvStorage, storage } from "./storage";


//Zustand store and manually store data in mmkv storage
////////////////////////////////////////////////////////
// const authStore = (set)=>({
//     user:storage.getString('user') || null,
//     currentOrder:null,
//     setUser:(data)=>{
//         //zustand store updated
//         set({user:data});
//         //store in mmkV storage
//         storage.set('user',data);
//     },
//     setCurrentOrder:(order)=>set({currentOrder:order}),
//     logout:()=> set({user:null,currentOrder:null})

// });
// const useAuthStore = create(authStore);
// export default useAuthStore;


//Zustand store with presist middleware
export const useAuthStore = create(
    persist(
        (set,get)=>({
            user:null,
            currentOrder:null,
            setUser:(data)=> set({user:data}),
            setCurrentOrder:(order)=>set({currentOrder:order}),
            logout:()=> set({user:null,currentOrder:null})
        }),
        {
            name:'auth-storage',
            storage:createJSONStorage(() => mmkvStorage)
        }
    )
);




