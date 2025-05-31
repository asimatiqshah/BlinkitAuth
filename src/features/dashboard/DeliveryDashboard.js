import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { useAuthStore } from "../../state/authStore";
import DeliveryHeader from "../../components/delivery/DeliveryHeader";
import TabBar from "../../components/delivery/TabBar";
import { useCallback, useEffect, useState } from "react";
import Geolocation from "@react-native-community/geolocation";
import { reverseGeocode } from "../../services/mapService";
import { fetchOrders } from "../../services/authServices";
import DeliveryOrderItem from "../../components/delivery/DeliveryOrderItem";
import { Blinkit_Colors } from "../../utills/Constants";
import withLiveOrder from "../../components/delivery/withLiveOrder";

const DeliveryDashboard = () => {

    //FLATLIST TUTORIAL
    //https://tinyurl.com/397wx5jf

    const { user, setUser } = useAuthStore();
    const [selectedTab, setSelectedTab] = useState('available');
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState([]);

    //NOTE: HERE I AM NOT GETTING EMULATOR SET LOCATION getCurrentPosition 
    // FOR GETTING EMULATOR SET LOCATION USED Geolocation.watchPosition because 
    // it continuously tracks the user's location and gives you real-time updates

    const updateUser = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position?.coords;
                reverseGeocode(latitude, longitude, setUser);
            },
            (error) => {
                console.log("Error getting location:", error);
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
            }
        )
    }

    const fetchData = async () => {
        setData([]);
        setLoading(true);
        setRefreshing(true);
        let result = await fetchOrders(selectedTab, user?._id, user?.branch);
        setData(result);
        setLoading(false);
        setRefreshing(false);
    }

    const renderItem = ({ item, index }) => {
        return (
            <DeliveryOrderItem index={index} item={item} />
        )
    }

    const onRefresh = async () => {
        await fetchData();
    };

    useEffect(() => {
        updateUser();
    }, []);

    useEffect(() => {
        fetchData();
    }, [selectedTab]);

    return (
        <View style={{ flex: 1 }}>
            <DeliveryHeader name={user?.name} email={user?.email} />
            <TabBar selectedTab={selectedTab} onTabChange={setSelectedTab} />

            {/* FLATLIST */}
            <FlatList
                data={data}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                ListEmptyComponent={() => {
                    if (loading) {
                        return (
                            <View>
                                <ActivityIndicator size="small" color={Blinkit_Colors.secondary} />
                            </View>
                        )
                    }

                    return (
                        <View>
                            <Text>No Orders Found Yet</Text>
                        </View>
                    )
                }}

                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                contentContainerStyle={styles.flatListContainer}
                
            />

        </View>
    )
}
export default withLiveOrder(DeliveryDashboard);


const styles = StyleSheet.create({
    itemContainer: {
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    itemText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#333',
    },
    flatListContainer:{
     flex:1,
     marginHorizontal:10
    }
});