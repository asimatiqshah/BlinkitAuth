import {
  Animated,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ProductSlider from '../../components/login/ProductSlider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {screenHeight} from '../../utills/Scalling';
import {
  Blinkit_Colors,
  fonts_sizes,
  fonts_weights,
} from '../../utills/Constants';
import {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import { customerLoginHandler } from '../../services/authServices';
const CustomerLogin = () => {
  const [phoneNumber,setPhoneNumber] = useState();
  const navigation = useNavigation();

  //handleAuth
  const handleAuth = async() => {
    Keyboard.dismiss();
    //cutomer login
    await customerLoginHandler(phoneNumber);
    //reset and navigate
    navigation.reset({
      index:0,
      routes:[{name:'ProductDashboard'}]
    });
  };

  const translateY = useRef(new Animated.Value(0)).current;
  const keyboardDidShowEvent = () => {
    Animated.timing(translateY, {
      toValue: -50, // Move up
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  const keyboardDidHideEvent = () => {
    Animated.timing(translateY, {
      toValue: 0, // Move up
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShowEvent,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHideEvent,
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [translateY]);

  return (
    <View style={{position: 'relative', flex: 1}}>
      <ProductSlider />
      <Animated.View style={[Styles.container, {transform: [{translateY}]}]}>
        <Image
          style={Styles.logoImage}
          source={require('../../assets/images/logo.png')}
        />
        <Text style={Styles.large_heading}>India Last Minute App</Text>
        <Text style={Styles.sug_heading}>Login or Signup</Text>
        <TextInput style={Styles.input} placeholder="Enter Your Phone" onChangeText={(val)=>setPhoneNumber(val)} />
        <TouchableOpacity style={Styles.btn_login} onPress={handleAuth}>
          <Text style={Styles.btn_text}>Continue</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
export default CustomerLogin;

const Styles = StyleSheet.create({
  logoImage: {
    width: 60,
    height: 60,
    borderRadius: 20,
  },
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    height: screenHeight * 0.4,
    position: 'absolute',
    bottom: 0,
    paddingVertical: 20,
  },
  input: {
    height: 50,
    width: '80%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    color: 'black',
  },
  large_heading: {
    fontSize: fonts_sizes.extraLarge,
    fontWeight: fonts_weights.extraBold,
  },
  sug_heading: {
    fontWeight: fonts_weights.regular,
    fontSize: fonts_sizes.medium,
  },
  btn_login: {
    backgroundColor: Blinkit_Colors.secondary,
    width: '80%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_text: {
    fontSize: fonts_sizes.medium,
    fontWeight: fonts_weights.regular,
    color: 'white',
  },
});
