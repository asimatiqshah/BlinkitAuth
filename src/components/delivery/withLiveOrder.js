import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuthStore } from "../../state/authStore";
import { Blinkit_Colors } from "../../utills/Constants";
import { useEffect, useState } from "react";
import Geolocation from "@react-native-community/geolocation";
import { sendLiveOrderUpdates } from "../../services/orderService";
import { useNavigation } from "@react-navigation/native";

const withLiveOrder = (WrappedComponent) => {
    return (props) => {
        const { currentOrder, user } = useAuthStore();
        const [myLocation, setMyLocation] = useState(null);
        const navigation = useNavigation();

        console.log(user);
        

        useEffect(() => {
            if (currentOrder) {
                const watchId = Geolocation.watchPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        console.log(latitude, longitude);
                        setMyLocation({latitude, longitude});
                    },
                    (error) => {
                        console.warn("Error fetching location", error);
                    },
                    {
                        enableHighAccuracy: true,
                        distanceFilter: 10, // meters
                    }
                );
                return Geolocation.clearWatch(watchId);
            }

        }, [currentOrder]);


        useEffect(()=>{

            const sendLiveUpdates= async()=>{
                if(currentOrder?.deliveryPartner?._id == user?._id  &&  currentOrder?.status !== 'delivered'  && currentOrder?.status !== 'cancelled'){
                        sendLiveOrderUpdates(currentOrder._id,myLocation,currentOrder?.status);
                }
            }
            sendLiveUpdates();

        },[myLocation])


        return (

            <>
                <WrappedComponent {...props} />
                {
                    currentOrder && (
                        <View style={styles.container}>
                            <View style={{ flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10, height: 100, gap: 10 }}>
                                <View style={{ width: '70%' }}>
                                    <Text style={styles.textHeading}>#{currentOrder?.orderId}</Text>
                                    <Text style={styles.textHeadingRegular}>
                                        {currentOrder?.deliveryLocation?.address}
                                    </Text>
                                </View>
                                <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('DeliveryMap',{...currentOrder})}>
                                    <Text style={[styles.textHeading, { color: 'white', textAlign: 'center' }]}>Continue</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }
            </>
        )
    }
}
export default withLiveOrder;
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: 'white',
        width: '100%',
        bottom: 0,
        elevation: 5,
        paddingBottom: 10
    },
    img: {
        backgroundColor: Blinkit_Colors.backgroundSecondary,
        borderRadius: 1000,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
    },
    textHeading: {
        fontFamily: 'Okra-Bold',
        fontSize: 14,
    },
    textHeadingRegular: {
        fontFamily: 'Okra-Medium',
        fontSize: 12,
    },
    btn: {
        paddingVertical: 10,
        backgroundColor: Blinkit_Colors.secondary,
        borderRadius: 5,
        width: '30%',
        marginTop: 5,
        height: 40,
        justifyContent: 'center'
    }
})