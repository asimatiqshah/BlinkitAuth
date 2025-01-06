import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import {Blinkit_Colors} from '../../utills/Constants.js';
import {screenHeight, screenWidth} from '../../utills/Scalling';
import {useAuthStore} from '../../state/authStore.js';
import {useEffect} from 'react';
import {mmkvStorage, tokenStorage} from '../../state/storage.js';
import {useNavigation} from '@react-navigation/native';
import {jwtDecode} from 'jwt-decode';
import {refetchUser, refreshTokenHandler} from '../../services/authServices.js';

const SplashScreen = () => {
  const {user,setUser, currentOrder} = useAuthStore();
  const navigation = useNavigation();

  const tokenCheck = async() => {
    const accessToken = tokenStorage.getString('accessToken');
    const refreshToken = tokenStorage.getString('refreshToken');

    if (accessToken) {
      const decodeAccessToken = jwtDecode(accessToken);
      const decodeRefreshToken = jwtDecode(refreshToken);
      
      //Check Token Expiry
      // 1.current time (millisecond)
      // 2.extract token exp and convert it in (millisecond) Or Reverse it if you want to check in (seconds)
      // 3.check wheather token exp is less than or greater. if less which mean token expire.

      //we check in seconds
      //both values should be in seconds
      const currentTime = Date.now() / 1000;
      if (decodeRefreshToken?.exp < currentTime) {
        //go and get token again
        //reset and navigate
        navigation.reset({
          index: 0,
          routes: [{name: 'CustomerLogin'}],
        });
        Alert.alert('Session expired! Please login again');
        return false;
      }

      if (decodeAccessToken?.exp < currentTime) {
        try {
          //now refresh the token
          await refreshTokenHandler(refreshToken,navigation);
          await refetchUser(setUser);
        } catch (error) {
          Alert.alert('There was an error during access token!');
          return false;
        }
      }

      if(decodeAccessToken?.role == "Customer"){
        navigation.reset({
          index:0,
          routes:[{name: 'ProductDashboard'}]
        });
      }else {
        navigation.reset({
          index:0,
          routes:[{name: 'DeliveryDashboard'}]
        });
      }
      return true;
    }
    navigation.reset({
      index:0,
      routes:[{name:'CustomerLogin'}]
    });
    return false;
  };


  //SET UP FETCH USER FUNCTION IN USE-EFFECT
  useEffect(() => {
    //1. setup function
    //2. setup setTimeout
    //3. erase/stop timeout
    // tokenStorage.delete('accessToken');
    // tokenStorage.delete('refreshToken');
    const fetchUserLocation = () => {
      console.log('Geolocation Functionality Pending');
      tokenCheck();
    };

    const timeoutId = setTimeout(fetchUserLocation, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={Styles.container}>
      <Image
        source={require('../../assets/images/splash_logo.jpeg')}
        style={Styles.splashLogo}
      />
    </View>
  );
};
export default SplashScreen;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Blinkit_Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashLogo: {
    width: 200,
    height: 504,
    resizeMode: 'contain',
  },
});
