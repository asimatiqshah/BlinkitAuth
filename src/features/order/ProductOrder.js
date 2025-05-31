import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native"
import CustomHeader from "../../components/ui/CustomHeader";
import { Blinkit_Colors } from "../../utills/Constants";
import OrderList from "./OrderList";
import Icon from 'react-native-vector-icons/dist/Ionicons';
import BilingDetails from "./BilingDetails";
import { useAuthStore } from "../../state/authStore";
import { useMemo, useState } from "react";
import ArrowButton from "../../components/ui/ArrowButton";
import { createOrder } from "../../services/orderService";
import { useNavigation } from "@react-navigation/native";

const ProductOrder = () => {

    const { cart, user,currentOrder,setCurrentOrder,clearCart } = useAuthStore();
    const [loading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    

    let totalCartItemsPrice = useMemo(() => (
        Object.keys(cart).reduce((total, current) => {
            total += Number(cart[current]?.price) * Number(cart[current]?.quantity);
            return total;
        }, 0)
    ), [cart]);

    const handlePlaceHolder = async () => {
        
        //IF YOU SUCESSFULLY MOVE TO NEXT SCREEN (ORDER SUCCESS) SO CART WILL BE EMPTY AFTER CONFIRMING ORDER BUT YOU AGAIN ORDER IT SO THIS ALERT WILL SHOW
        // if(currentOrder !== null){
        //     Alert.alert("Let your first order to be delivered")
        //     return false;
        // }

        //CREATING DATA FOR ORDER
        const formattedData = Object.keys(cart).reduce((total,current)=>{
            let newObj = {
                id:current,
                item:current,
                count:cart[current]?.quantity

        }
            total.push(newObj);
            return total
        },[]);

        if(formattedData.length == 0){
            Alert.alert("Add atleast one order")
            return false;
        }

        setIsLoading(true);
        const data = await createOrder(formattedData,totalCartItemsPrice);

        if(data !== null){
            setCurrentOrder(data);
            clearCart();
            navigation.navigate('OrderSuccess',{...data})
        }else{
            Alert.alert("There was an error")
            return false;
        }
            
    }

    
const generateBoxShadowStyle = (
    xOffset,
    yOffset,
    shadowColorIos,
    shadowOpacity,
    shadowRadius,
    elevation,
    shadowColorAndroid,
  ) => {
    if (Platform.OS === 'ios') {
      styles.boxShadow = {
        shadowColor: shadowColorIos,
        shadowOffset: {width: xOffset, height: yOffset},
        shadowOpacity,
        shadowRadius,
      };
    } else if (Platform.OS === 'android') {
      styles.boxShadow = {
        elevation,
        shadowColor: shadowColorAndroid,
      };
    }
  };

  generateBoxShadowStyle(-4, 6, '#000', 0.8, 10, 12, '#000');



    return (
        <View style={styles.container}>
            {/* CUSTOM HEADER HAVING BACK BUTTON FACILITY */}
            <CustomHeader title={'Checkout'} />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <OrderList />
                {/* FOR COUPON */}
                <View style={styles.flexRowBetween}>
                    <View style={styles.flexRow}>
                        <Image source={require('../../assets/icons/coupon.png')} style={{ width: 25, height: 25 }} />
                        <Text style={styles.textHeading}>Use Coupons</Text>
                    </View>
                    <Icon name="chevron-forward-sharp" size={20} />
                </View>
                {/* Biling Details */}
                <BilingDetails totalCartItemsPrice={totalCartItemsPrice} />
                {/* Cancelation Policy */}
                <View style={styles.flexRowBetween}>
                    <View>
                        <Text style={styles.textHeading}>Cancelation Policy</Text>
                        <Text style={[styles.textParagraph, { marginTop: 10 }]}>
                            Orders cannot be canceled once packed for delivery. In case of unexpected delays, a refund will be provided, if applicable
                        </Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.cartContainer}>
                <View style={[styles.absoluteContainer,styles.boxShadow]}>
                    <View style={styles.addressContainer}>
                        <View style={[styles.flexRow, { justifyContent: 'flex-start' }]}>
                            <Image source={require('../../assets/icons/home.png')}
                                style={{ width: 20, height: 20 }}
                            />
                            <View style={{ width: '75%' }}>
                                <Text style={styles.textHeading}>Delivering Back To Home</Text>
                                <Text style={styles.textParagraph}>{user?.address}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:20}}> 
                        {/* Pay Cash On Delivery */}
                        <View style={{ width: '40%' }}>
                            <Text style={styles.textHeading}>PAY USING</Text>
                            <Text style={styles.textParagraph}>Cash On Delivery</Text>
                        </View>
                        <View style={{ width: '60%' }}>
                            <ArrowButton
                                loading={loading}
                                title="Place Order"
                                price={totalCartItemsPrice}
                                onPress={handlePlaceHolder}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ProductOrder;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    scrollContainer: {
        backgroundColor: Blinkit_Colors.backgroundSecondary,
        padding: 10,
        paddingBottom: 250
    },
    flexRowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    textHeading: {
        fontFamily: 'Okra-Bold',
        fontSize: 14
    },
    textParagraph: {
        fontFamily: 'Okra-Regular',
        fontSize: 13
    },
    cartContainer: {
        flexDirection: 'row'
    },
    absoluteContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderRadius:10
    },
    addressContainer: {
        borderBottomColor: Blinkit_Colors.border,
        borderBottomWidth: 0.7,
        padding: 20,
    },

})