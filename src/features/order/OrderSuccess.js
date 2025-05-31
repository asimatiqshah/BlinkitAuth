import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { screenWidth } from '../../utills/Scalling';
import { Blinkit_Colors } from '../../utills/Constants';
import { useAuthStore } from '../../state/authStore';
import { useNavigation } from '@react-navigation/native';

const OrderSuccess = () => {
  const { user,currentOrder,setCurrentOrder } = useAuthStore();
  const navigation = useNavigation();

  // const fetchOrderDetails = async () => {
  //   console.log("i am here in orderSucess caling orderId");
  //   const data = await getOrderById(currentOrder?._id);
  //   setCurrentOrder(data);
  // }

  // useEffect(()=>{
  //   fetchOrderDetails();
  // },[])


  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/animations/confirm.json')}
        autoPlay
        duration={2000}
        loop={false}
        speed={1}
        style={styles.lottieView}
        enableMergePathsAndroidForKitKatAndAbove
        hardwareAccelerationAndroid
      />
      <Text
        style={styles.orderPlaceText}>
        ORDER PLACED
      </Text>
      <View style={styles.deliveryContainer}>
        <Text
          style={styles.deliveryText}>
          Delivering to Home
        </Text>
        <Text style={styles.addressText}>
          {user?.address || 'Somewhere, Knowhere'}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('ProductDashboard')}>
          <Text>Go To Dashboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  lottieView: {
    width: screenWidth * 0.6,
    height: 150,
  },
  deliveryContainer: {
    borderBottomWidth: 2,
    paddingBottom: 4,
    marginBottom: 5,
    borderColor: Blinkit_Colors.secondary,
    fontFamily: 'Okra-Bold',
  },
  deliveryText: {
    marginTop: 15,
    borderColor: Blinkit_Colors.secondary,
    fontFamily: 'Okra-Bold',
    textAlign: 'center',
    fontSize: 16
  },
  addressText: {
    opacity: 0.8,
    width: '80%',
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'Okra-medium',
    justifyContent: 'center'
  },
});

export default OrderSuccess;
