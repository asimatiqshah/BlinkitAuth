import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Blinkit_Colors } from "../../utills/Constants";
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { useNavigation } from "@react-navigation/native";

const DeliveryOrderItem = ({ item, index }) => {
    const Navigation = useNavigation();

    let getStatusColor = (status)=>{
       switch (status) {
        case 'available':
            return '#28a745';
        case 'confirmed':
            return '#007bff';
        case 'delivered':
            return '#17a2b8';
        case 'cancelled':
            return '#dc3545';
        default:
            return '#6c757d';
       }
    }

    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={styles.txtHeadingOrderId}>#{item.orderId}</Text>
                <Text style={{color:getStatusColor(item.status)}}>{item.status}</Text>
            </View>
            <View>
                {
                    item.items.map((i, idx) => {
                        return (
                            <View key={idx}>
                                <Text style={styles.txtParagraph} >
                                    {i.count}x {i.item.name}
                                </Text>
                            </View>
                        )
                    })
                }
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text style={[styles.txtParagraph,{width:'80%'}]}>{item.deliveryLocation.address}</Text>
                <TouchableOpacity onPress={()=>Navigation.navigate('DeliveryMap',{
                    ...item
                })}>
                    <Icon name="arrow-circle-right" size={26} color={Blinkit_Colors.primary} />
                </TouchableOpacity>
            </View>
            <Text style={styles.txtParagraph}>{item.createdAt}</Text>
            
        </View>
    )
}

export default DeliveryOrderItem;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 10,
        borderColor: Blinkit_Colors.border
    },
    txtHeadingOrderId: {
        fontFamily: 'Okra-Bold',
        fontSize: 14
    },
    txtParagraph: {
        fontFamily: 'Okra-Medium',
        fontSize: 14,
        paddingVertical:8
    },

})