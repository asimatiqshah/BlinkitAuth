import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../features/auth/SplashScreen';
import DeliveryLogin from '../features/auth/DeliveryLogin';
import CustomerLogin from '../features/auth/CustomerLogin';
import ProductDashboard from '../features/dashboard/ProductDashboard';
import DeliveryDashboard from '../features/dashboard/DeliveryDashboard';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {Navigator, Screen} = Stack;

  return (
    <NavigationContainer>
      <Navigator
        initialRouteName="SplashScreen"
        screenOptions={{headerShown: false}}>
        <Screen name="SplashScreen" component={SplashScreen} />
        <Screen
          options={{
            animation: 'fade',
          }}
          name="DeliveryLogin"
          component={DeliveryLogin}
        />
        <Screen
          options={{
            animation: 'fade',
          }}
          name="CustomerLogin"
          component={CustomerLogin}
        />
        <Screen
          options={{
            animation: 'fade',
          }}
          name="ProductDashboard"
          component={ProductDashboard}
        />
        <Screen
          options={{
            animation: 'fade',
          }}
          name="DeliveryDashboard"
          component={DeliveryDashboard}
        />
      </Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
