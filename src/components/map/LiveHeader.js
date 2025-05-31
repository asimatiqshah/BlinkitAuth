import { Pressable, StyleSheet, Text, View } from "react-native"
import Icon from 'react-native-vector-icons/dist/Entypo';
import { fonts_sizes } from "../../utills/Constants";
import { useAuthStore } from "../../state/authStore";
import { useNavigation } from "@react-navigation/native";

const LiveHeader = ({ type, title, secondTitle }) => {

    const { currentOrder, setCurrentOrder } = useAuthStore();

    const navigation = useNavigation();

    const isCustomer = type == "Customer";
    return (
        <View style={styles.headerContainer}>
            <Pressable
            onPress={()=>{
                if(isCustomer){
                    navigation.navigate('ProductDashboard');
                    if(currentOrder?.status == "delivered"){
                        setCurrentOrder(null);
                    }
                    return false;
                }
                navigation.navigate('DeliveryDashboard');
                
            }}
            style={{ position: 'absolute', left: 15 }}>
                <Icon name="chevron-small-left" size={28} color="#fff" />
            </Pressable>
            <Text style={styles.txtHeading}>{title}</Text>
            <Text style={styles.txtHeadingBig}>{secondTitle}</Text>
        </View>
    )
}
export default LiveHeader;

const styles = StyleSheet.create({
    headerContainer: {
        justifyContent: "center",
        alignItems: 'center',
        paddingTop:10
    },
    txtHeading: {
        fontFamily: 'Okra-Light',
        fontSize: 14,
        color:'white'
    },
    txtHeadingBig: {
        fontFamily: 'Okra-Bold',
        fontSize: 18,
        color:'white'
    }

});