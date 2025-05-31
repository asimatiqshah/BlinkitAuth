import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomHeader from "../../components/ui/CustomHeader";
import { fetchCustomerOrders } from "../../services/orderService";
import { useAuthStore } from "../../state/authStore";
import { useEffect, useState } from "react";
import ProfileOrderItem from "../order/ProfileOrderItem";
import { Blinkit_Colors } from "../../utills/Constants";
import Icon from 'react-native-vector-icons/dist/Ionicons';
import WalletItem from "./WalletItem";
import { storage, tokenStorage } from "../../state/storage";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {

    const [orders, setOrders] = useState([]);
    const { user, logout, clearCart } = useAuthStore();
    const navigation = useNavigation();

    const fetchOrders = async () => {
        const data = await fetchCustomerOrders(user?._id);
        setOrders(data);
    }

    useEffect(() => {
        fetchOrders();
    }, [])

    const renderHeader = () => {
        return (
            <View>
                <Text style={styles.textHeader}>Your Account</Text>
                <Text style={styles.textMedium}>{user?.phone}</Text>

                <View style={styles.walletContainer}>
                    <WalletItem icon="wallet-outline" label="wallet" />
                    <WalletItem icon="chatbubble-ellipses-outline" label="support" />
                    <WalletItem icon="card-outline" label="payments" />
                </View>

                <Text style={styles.textMediumHeading}>YOUR INFORMATION</Text>

                <View style={{ flexDirection: "row", alignItems: 'center', gap: 10, marginTop: 10 }}>
                    <View style={styles.circle}>
                        <Icon name="book-outline" size={18} color="#00000" />
                    </View>
                    <Text style={[styles.textMedium]}>Address Book</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: 'center', gap: 10, marginTop: 10 }}>
                    <View style={styles.circle}>
                        <Icon name="information" size={18} color="#00000" />
                    </View>
                    <Text style={[styles.textMedium]}>About Us</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: 'center', gap: 10, marginTop: 10 }}>
                    <View style={styles.circle}>
                        <Icon name="log-out-outline" size={18} color="#00000" />
                    </View>
                    <TouchableOpacity onPress={() => {
                            clearCart(),
                            logout(),
                            tokenStorage.clearAll(),
                            storage.clearAll(),
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'CustomerLogin' }]
                            });

                    }}>
                        <Text style={[styles.textMedium]}>Log Out</Text>
                    </TouchableOpacity>
                </View>
                <Text style={[styles.textMediumHeading, { marginTop: 20 }]}>PAST ORDERS</Text>
            </View>
        )
    }

    const renderOrders = ({ item, index }) => {
        return (
            <ProfileOrderItem item={item} index={index} />
        )
    }

    return (
        <View style={styles.container}>
            <View>
                <CustomHeader title="Profile" />
            </View>

            <FlatList
                data={orders}
                ListHeaderComponent={renderHeader}
                renderItem={renderOrders}
                keyExtractor={(item) => item?.orderId}
                contentContainerStyle={styles.scrollViewContent}
            />
        </View>
    )
}
export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    textHeader: {
        fontSize: 16,
        fontFamily: 'Okra-Bold'
    },
    textMedium: {
        fontSize: 14,
        fontFamily: 'Okra-Medium'
    },
    textMediumHeading: {
        fontSize: 14,
        fontFamily: 'Okra-Medium',
        opacity: 0.7
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 25, // makes it a circle
        backgroundColor: '#F2F3F8', // light grey background
        justifyContent: 'center',
        alignItems: 'center',
    },
    walletContainer: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Blinkit_Colors.backgroundSecondary,
        paddingVertical: 15,
        borderRadius: 15,
        marginVertical: 20
    },
    scrollViewContent: {
        padding: 10,
        paddingTop: 20,
        paddingBottom: 100
    },
})