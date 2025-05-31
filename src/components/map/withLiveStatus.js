import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuthStore } from "../../state/authStore";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { getOrderById } from "../../services/orderService";
import { useEffect } from "react";
import { SOCKET_URL } from "../../services/config";
import { io } from "socket.io-client";

const withLiveStatus = (WrappedComponent) => {
    return (props) => {
        const { currentOrder, setCurrentOrder } = useAuthStore();
        const navigation = useNavigation();

        const routeName = useNavigationState(
            state => state.routes[state.index]?.name
        );

        const fetchOrderDetails = async () => {
            const data = await getOrderById(currentOrder?._id);
            setCurrentOrder(data);
        };

        useEffect(() => {
            if (currentOrder) {
                const socket = io(SOCKET_URL, {
                    transports: ['websocket'],
                });

                socket.on('connect', () => {
                    socket.emit("joinRoom", currentOrder?._id);
                });

                socket.on('liveTrackingUpdates', () => {
                    fetchOrderDetails();
                });

                return () => {
                    socket.disconnect();
                };
            }
        }, [currentOrder]);

        const showLiveStatusBar = currentOrder && routeName === 'ProductDashboard';

        return (
            <>
                <WrappedComponent {...props} />
                {showLiveStatusBar && (
                    <View style={styles.statusBar}>
                        <View style={styles.statusBarInner}>
                            <View style={styles.iconRow}>
                                <Image
                                    source={require('../../assets/icons/bucket.png')}
                                    style={styles.iconStyle}
                                />
                                <View>
                                    <Text style={styles.textHeading}>Order is available</Text>
                                    <Text style={styles.textHeadingRegular}>
                                        {currentOrder.items.length} item{currentOrder.items.length > 1 ? 's' : null}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.btn_bg} onPress={()=>navigation.navigate('LiveTracking')}>
                                <Text style={styles.buttonText}>View Cart</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </>
        );
    };
};

export default withLiveStatus;

const styles = StyleSheet.create({
    statusBar: {
        position: 'absolute',
        width: '100%',
        backgroundColor: 'white',
        bottom: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 10,
    },
    statusBarInner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6, // Only supported in newer React Native versions
    },
    iconStyle: {
        width: 40,
        height: 40,
    },
    textHeading: {
        fontFamily: 'Okra-Bold',
        fontSize: 14,
    },
    textHeadingRegular: {
        fontFamily: 'Okra-Medium',
        fontSize: 14,
    },
    btn_bg: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        width: '30%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'Okra-Medium',
        fontSize: 13,
    },
});
