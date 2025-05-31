import { Image, StyleSheet, Text, View } from "react-native"
import { Blinkit_Colors, fonts_sizes } from "../../utills/Constants";
import { useAuthStore } from "../../state/authStore";
import { useMemo } from "react";
import OrderItem from "./OrderItem";

const OrderList = () => {
        const { cart } = useAuthStore();
        //Object.keys ---> we are getting object keys name in an array
        let totalItems = useMemo(()=>(
            Object.keys(cart).reduce((total,current)=>{
                total += cart[current]?.quantity; 
                return total;
            },0)
        ),[cart]);
        
    return (
        <View style={styles.container}>
            <View style={styles.flexRow}>
                <View style={styles.imgContainer}>
                    <Image source={require('../../assets/icons/clock.png')} style={styles.img} />
                </View>
                <View>
                    <Text style={styles.textHeader}>Delivery in 12 Minutes</Text>
                    <Text style={{opacity:0.5,fontFamily:'Okra-Regular'}}>Shipment of {totalItems || 0} item{totalItems > 1 ? 's':null}</Text>
                </View>
            </View>
            {
                Object.keys(cart).map((item,index)=>(
                    <OrderItem key={item} item={cart[item]} prodID={item} />
                ))
            }
        </View>
    )
}

export default OrderList;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 15,
        marginBottom: 15
    },
    flexRow:{
        flexDirection:'row',
        alignItems:'center',
        gap:12,
        paddingHorizontal:10,
        paddingVertical:12
    },
    textHeader: {
        fontSize: 15,
        fontFamily: 'Okra-Bold'
    },
    imgContainer:{
        backgroundColor:Blinkit_Colors.backgroundSecondary,
        borderRadius:10,
        padding:10
    },
    img:{
        width:40,
        height:40
    }
})