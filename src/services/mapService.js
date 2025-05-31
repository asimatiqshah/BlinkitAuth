import axios from "axios"
import { GOOLE_MAP_API } from "./config";
import { updateUserLocation } from "./authServices";

export const reverseGeocode = async (latitude, longitude, setUser) => {
    try {
        // console.log(latitude,longitude);

        // const data = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOLE_MAP_API}`);

        //OPENCAGE API CALLING
        // const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=e901cc77ba8a450db770ff9b9e823b51`);
        // console.log(response.data.results[0].formatted);

        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

        const response = await axios.get(url, {
            headers: {
                'Accept-Language': 'en',
                'User-Agent': 'YourAppName/1.0 (your@email.com)',
            }
        });

        if (response.status == "200") {
            const address = response?.data.display_name;
            updateUserLocation({liveLocation:{latitude,longitude},address},setUser);
        }else{
            console.log("Geo Code Failed",response?.data);
        }

    } catch (error) {
        console.log("Geo Code Failed",error);
    }

}