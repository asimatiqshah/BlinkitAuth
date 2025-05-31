import { Image, StyleSheet, Text, View } from "react-native";
import { Blinkit_Colors, fonts_sizes } from "../../utills/Constants";
import StepperBtn from "../../components/ui/StepperBtn";

const OrderItem = ({item,prodID})=>{
    return(
        <View style={styles.flexRow}>
            <View style={styles.imgContainer}>
                <Image style={styles.img} source={{uri:item?.image}} />
            </View>
            <View style={{width:'55%'}}>
                <Text style={styles.textRegularHeading}>{item.name}</Text>
                <Text style={styles.textParaHeading}>{item.productWeight}</Text>
            </View>
            <View style={{width:'20%'}}>
                <StepperBtn productId={prodID} name={item.name} productWeight={item.quantity} productPrice={item.price} image={item.image} />
                <Text style={styles.textPrice}>${item.price * item.quantity}</Text>
            </View>
        </View>
    )
}
export default OrderItem;

const styles = StyleSheet.create({
    flexRow:{
        flexDirection:'row',
        alignItems:'center',
        gap:12,
        paddingHorizontal:10,
        paddingVertical:12,
        borderTopWidth:0.6,
        borderTopColor:Blinkit_Colors.border
    },
    img:{
        width:40,
        height:40
    },
    imgContainer:{
        backgroundColor:Blinkit_Colors.backgroundSecondary,
        padding:10,
        borderRadius:10,
        width:'17%',
        justifyContent:'center',
        alignItems:'center'
    },
    textRegularHeading: {
        fontSize: 13,
        fontFamily: 'Okra-Bold'
    },
    textParaHeading:{
        fontSize: 12,
        fontFamily: 'Okra-Regular'
    },
    textPrice:{
        fontSize: 12,
        fontFamily: 'Okra-Bold',
        textAlign:'right',
        marginTop:4
    }
});