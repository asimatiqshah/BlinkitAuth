import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useAuthStore } from "../../state/authStore";
import { apiAxios } from "../../services/apiinterceptor";
import { confirmOrder, getOrderById, sendLiveOrderUpdates } from "../../services/orderService";
import { useEffect, useState } from "react";
import { Blinkit_Colors } from "../../utills/Constants";
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import BilingDetails from "../../features/order/BilingDetails";


import AgainLiveMap from "../map2/AgainLiveMap";
import { useMapRefStore } from "../../state/mapStore";
import LiveHeader from "../map/LiveHeader";
import OrderSummary from "../map/OrderSummary";
import { useNavigation, useRoute } from "@react-navigation/native";
import Geolocation from "@react-native-community/geolocation";

const DeliveryMap = () => {

    const navigation = useNavigation();

    // const {currentOrder} = useAuthStore(state=>state.currentOrder)
    const { user, currentOrder, setCurrentOrder } = useAuthStore();
    const { mapRef, setMapRef } = useMapRefStore();
    const [orderData, setOrderData] = useState(null);
    const [myLocation, setMyLocation] = useState(null);

    const route = useRoute();

    const orderDetails = route?.params;

    // console.log(user);
    // console.log("current order",orderData.deliveryPartners[0]);


    const fetchOrderDetails = async () => {
        const data = await getOrderById(orderDetails?._id);
        setOrderData(data);
    }

    useEffect(() => {
        fetchOrderDetails();
    }, []);


    useEffect(() => {
        const watchId = Geolocation.watchPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                setMyLocation({ latitude, longitude });
            },
            (error) => {
                console.error('Error in fetching location:', error);
            },
            {
                enableHighAccuracy: true,
                distanceFilter: 10, // update on every change
            }
        );

        return () => Geolocation.clearWatch(watchId);

    }, []);



    const acceptOrder = async () => {
        const data = await confirmOrder(orderData?._id, myLocation);
        if (data) {
            setCurrentOrder(data);
            Alert.alert('Order Accepted, Grab your package');
        } else {
            Alert.alert('There was an error');
        }
        fetchOrderDetails();
    };

    const orderPickedUp = async () => {
        try {
            const data = await sendLiveOrderUpdates(
                orderData?._id,
                myLocation,
                'arriving'
            );

            if (data) {
                setCurrentOrder(data);
                Alert.alert("Let's deliver it as soon as possible");
            } else {
                Alert.alert('There was an error');
            }
            fetchOrderDetails();

        } catch (error) {
            console.error('orderPickedUp Error:', error);
            Alert.alert('There was an error processing your request');
        }
    };

    const orderDelivered = async () => {
        try {
            const data = await sendLiveOrderUpdates(
                orderData?._id,
                myLocation,
                'delivered'
            );

            if (data) {
                setCurrentOrder(null);
                Alert.alert('Woohoo! You made it😊');
            } else {
                Alert.alert('There was an error');
            }
            fetchOrderDetails();  // Moved outside try-catch to ensure it always runs
        } catch (error) {
            console.error('orderDelivered Error:', error);
            Alert.alert('There was an error updating delivery status');
        }
    };




    //USER AUTHENTICATION CHECKING
    const isAuthentic = orderData?.branch?.deliveryPartners?.includes(user?._id);

    let message = 'Start this order';
    if (isAuthentic &&
        orderData?.status === 'confirmed'
    ) {
        message = 'Grab your order';
    } else if (
        isAuthentic &&
        orderData?.status === 'arriving'
    ) {
        message = 'Complete your order';
    } else if (
        isAuthentic &&
        orderData?.status === 'delivered'
    ) {
        message = 'Your milestone';
    } else if (
        isAuthentic &&
        orderData?.status != 'available'
    ) {
        message = 'You missed it!';
    }


    useEffect(() => {
        async function sendLiveUpdates() {
            if (
                orderData?.deliveryPartner?._id == user?._id &&
                orderData?.status != 'delivered' &&
                orderData?.status != 'canceled'
            ) {
                await sendLiveOrderUpdates(
                    orderData._id,
                    myLocation,
                    orderData?.status,  // Fixed: Changed _status to status
                );
                fetchOrderDetails();
            }
        }
        sendLiveUpdates();
    }, [myLocation]);



    return (
        <View style={styles.container}>
            <LiveHeader type="Delivery" title={message} secondTitle={"Delivery in 10 minutes"} />
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

                {orderData?.deliveryLocation && orderData?.pickupLocation && (
                        <AgainLiveMap
                            deliveryLocation={orderData?.deliveryLocation || null}
                            pickupLocation={orderData?.pickupLocation || null}
                            deliveryPersonLocation={orderData?.deliveryLocation || myLocation}
                            hasPickedUp={orderData?.status == "arriving"}
                            hasAccepted={
                                orderData?.status == "confirmed"
                            }
                            mapRef={mapRef}
                            setMapRef={setMapRef}
                        />
                    )}



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
                            <Text style={styles.txtHeading2}>{orderData?.customer?.name} {orderData?.customer?.phone}</Text>
                            <Text style={styles.txt1}>Receiver contact no</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 10, }}>
                        <View style={styles.iconContainer}>
                            <Icon name="phone-alt" size={18} color="black" />
                        </View>
                        <View style={{ width: '82%' }}>
                            <Text style={styles.txtHeading2}>Delivery at Home</Text>
                            <Text style={styles.txt1}>{orderData?.customer?.address}</Text>
                        </View>
                    </View>
                </View>
                <OrderSummary order={orderData} />
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

            {

                orderData?.status != 'delivered' && orderData?.status != 'cancelled' && (
                    <View style={[styles.btnContainer]}>

                        {orderData?.status == 'available' && (
                            <TouchableOpacity onPress={acceptOrder}>
                                <Text>Accept Order</Text>
                            </TouchableOpacity>
                        )}

                        {orderData?.status == 'confirmed' && (

                            <TouchableOpacity onPress={orderPickedUp}>
                                <Text>Order Picked Up</Text>
                            </TouchableOpacity>
                        )}

                        {orderData?.status == 'arriving' && (
                            <TouchableOpacity onPress={orderDelivered}>
                                <Text>Order Delivered</Text>
                            </TouchableOpacity>
                        )}

                    </View>
                )

            }


        </View>
    )
}
export default DeliveryMap;

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
    },
    btnContainer: {
        padding: 10,
    }

});