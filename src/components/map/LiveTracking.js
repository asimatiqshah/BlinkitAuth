import { ScrollView, StyleSheet, Text, View } from "react-native"
import { useAuthStore } from "../../state/authStore";
import { apiAxios } from "../../services/apiinterceptor";
import { getOrderById } from "../../services/orderService";
import { useEffect } from "react";
import { Blinkit_Colors } from "../../utills/Constants";
import LiveHeader from "./LiveHeader";
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import BilingDetails from "../../features/order/BilingDetails";
import OrderSummary from "./OrderSummary";
import LiveMap from "./LiveMap";
import AgainLiveMap from "../map2/AgainLiveMap";
import { useMapRefStore } from "../../state/mapStore";

const LiveTracking = () => {

    const { currentOrder, setCurrentOrder, user } = useAuthStore();
    const { mapRef, setMapRef } = useMapRefStore();
    
    const fetchOrderDetails = async () => {
        const data = await getOrderById(currentOrder?._id);
        setCurrentOrder(data);
    }

    let msg = "Packing your order";
    let time = "Arriving in 10 minutes";

    if (currentOrder?.status === "confirmed") {
        msg = 'Arriving Soon';
        time = 'Arriving in 8 minutes';
    } else if (currentOrder?.status === "arriving") {
        msg = 'Order Picked Up';
        time = 'Arriving in 6 minutes';
    } else if (currentOrder?.status === "delivered") {
        msg = 'Order Delivered';
        time = 'Fastest Delivery';
    }


    useEffect(() => {
        fetchOrderDetails();
    }, []);

    return (
        <View style={styles.container}>
            <LiveHeader type="Customer" title={msg} secondTitle={time} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                
                {/* <LiveMap
                    deliveryLocation={currentOrder?.deliveryLocation}
                    pickupLocation={currentOrder?.pickupLocation}
                    deliveryPersonLocation={currentOrder?.deliveryPersonLocation}
                    hasAccepted={currentOrder?.status == "confirmed"}
                    hasPickedUp={currentOrder?.status == "arriving"}
                /> */}

                <AgainLiveMap
                deliveryLocation={currentOrder?.deliveryLocation}
                pickupLocation={currentOrder?.pickupLocation}
                deliveryPersonLocation={currentOrder?.deliveryPersonLocation}
                hasPickedUp={currentOrder?.status == "arriving"}
                hasAccepted={currentOrder?.status == "confirmed"}
                mapRef={mapRef}
                setMapRef={setMapRef}

                />

                {/* 1ST ROW */}
                <View style={styles.flexRow}>
                    <View style={styles.iconContainer}>
                        <Icon name="shopping-bag" size={18} color="black" />
                    </View>
                    <View style={{ width: '82%' }}>
                        <Text style={styles.txtHeading}>We will soon assign delivery partner</Text>
                        <Text style={styles.txt1}>{msg}</Text>
                    </View>
                </View>

                {/* DELIVERY DETAILS */}
                <View style={styles.deliveryflexRow}>
                    {/* heading */}
                    <View style={{ flexDirection: 'row', gap: 10, marginBottom: 15, borderBottomWidth: 2, borderColor: Blinkit_Colors.backgroundSecondary, paddingBottom: 10 }}>
                        <View style={styles.iconContainer}>
                            <Icon name="motorcycle" size={18} color="black" />
                        </View>
                        <View style={{ width: '82%' }}>
                            <Text style={styles.txtHeading}>Your delivery details</Text>
                            <Text style={styles.txt1}>Details of you current order</Text>
                        </View>
                    </View>
                    {/* details */}
                    <View style={{ flexDirection: 'row', gap: 10, marginBottom: 15 }}>
                        <View style={styles.iconContainer}>
                            <Icon name="map-marker-alt" size={18} color="black" />
                        </View>
                        <View style={{ width: '82%' }}>
                            <Text style={styles.txtHeading2}>{user.name} {user.phone}</Text>
                            <Text style={styles.txt1}>Receiver contact no</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 10, }}>
                        <View style={styles.iconContainer}>
                            <Icon name="phone-alt" size={18} color="black" />
                        </View>
                        <View style={{ width: '82%' }}>
                            <Text style={styles.txtHeading2}>Delivery at Home</Text>
                            <Text style={styles.txt1}>{currentOrder?.customer?.address}</Text>
                        </View>
                    </View>
                </View>

                {/* 2ND ROW */}
                <View style={{ backgroundColor: 'white', marginTop: 15, borderRadius: 15, elevation: 1 }}>
                    <View style={styles.flexRow2}>
                        <View style={styles.iconContainer}>
                            <Icon name="heart" size={18} color="black" />
                        </View>
                        <View style={{ width: '82%' }}>
                            <Text style={styles.txtHeading}>Order summary</Text>
                            <Text style={styles.txt1}>
                                Order ID - #{currentOrder?.orderId}
                            </Text>
                        </View>
                    </View>
                     {/* ORDER SUMMARY */}
                     <OrderSummary order={currentOrder} />
                     
                    <BilingDetails totalCartItemsPrice={currentOrder?.totalPrice} />

                </View>

                {/* 3RD ROW */}
                <View style={styles.flexRow}>
                    <View style={styles.iconContainer}>
                        <Icon name="heart" size={18} color="black" />
                    </View>
                    <View style={{ width: '82%' }}>
                        <Text style={styles.txtHeading}>Do you like our app?</Text>
                        <Text style={styles.txt1}>
                            Hit Like and subscribe button! If you are enjoying comment your excitement
                        </Text>
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}
export default LiveTracking;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Blinkit_Colors.secondary
    },
    flexRow: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: 10,
        padding: 10,
        marginTop: 15,
        alignItems: 'center',
        gap: 10,
        borderRadius: 10,
        elevation: 1
    },
    txtHeading: {
        fontFamily: 'Okra-Bold',
        fontSize: 14
    },
    iconContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#eee',
        borderRadius: 250,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txt1: {
        fontFamily: 'Okra-Medium',
        fontSize: 12,
        opacity: 0.7
    },
    scrollContent: {
        backgroundColor: Blinkit_Colors.backgroundSecondary,
        paddingBottom: 150,
        padding: 15,
        marginVertical: 10
    },
    flexRow2: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
        gap: 10,
        borderBottomWidth: 2,
        borderColor: Blinkit_Colors.backgroundSecondary,
        borderRadius: 10,
    },
    deliveryflexRow: {
        backgroundColor: 'white',
        paddingVertical: 10,
        padding: 10,
        marginTop: 15,
        alignItems: 'center',
        borderRadius: 10,
        elevation: 1
    },
    txtHeading2: {
        fontFamily: 'Okra-Bold',
        fontSize: 12,
        color: Blinkit_Colors.text
    }

});