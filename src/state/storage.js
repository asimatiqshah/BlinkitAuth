import { MMKV } from 'react-native-mmkv';

export const tokenStorage = new MMKV({
    id:'token-storage',
    encryptionKey:'some-secret-key'
});

export const storage = new MMKV({
    id:'my-app-storage',
    encryptionKey:'some-secret-key'
  });

 //GLOBAL SETTER AND GETTER FUNCTION 
 export const mmkvStorage = {
    setItem:(key,value)=>{
        storage.set(key,value)
    },
    geItem:(key)=>{
        const value = storage.getString(key);
        return value || null;
    },
    removeItem:(key)=>{
        storage.removeItem(key)
    }
 } 