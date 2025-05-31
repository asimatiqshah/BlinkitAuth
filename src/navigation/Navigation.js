import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../features/auth/SplashScreen';
import DeliveryLogin from '../features/auth/DeliveryLogin';
import CustomerLogin from '../features/auth/CustomerLogin';
import ProductDashboard from '../features/dashboard/ProductDashboard';
import DeliveryDashboard from '../features/dashboard/DeliveryDashboard';
import ProductCategories from '../features/category/ProductCategories';
import ViewCartBar from '../components/ui/ViewCartBar';
import { useState } from 'react';
import ProductCategoriesWithCart from '../features/category/ProductCategories';
import ProductOrder from '../features/order/ProductOrder';
import OrderSuccess from '../features/order/OrderSuccess';
import LiveTracking from '../components/map/LiveTracking';
import Profile from '../features/profile/Profile';
import DeliveryMap from '../components/delivery/DeliveryMap';


const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {Navigator, Screen} = Stack;
  // const [showCartBar, setShowCartBar] = useState(false);

  return (
    <NavigationContainer
      // onStateChange={(state)=>{
      //     // if(state){
      //     //   const currentScreen = 
      //     // }
      //     if(state){
      //       const currentScreen = state.routes[state.index].name;
      //       setShowCartBar(currentScreen !== 'SplashScreen');
      //     }
          
      // }}
    >
      <Navigator
        initialRouteName="SplashScreen"
        screenOptions={{headerShown: false}}>
        <Screen name="SplashScreen" component={SplashScreen} />
        <Screen name="ProductCategories" component={ProductCategoriesWithCart} />
        <Screen name="ProductOrder" component={ProductOrder} />
        <Screen name="LiveTracking" component={LiveTracking} />
        <Screen name="OrderSuccess" component={OrderSuccess} />
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
        <Screen
          options={{
            animation: 'fade',
          }}
          name="Profile"
          component={Profile}
        />
         <Screen
          options={{
            animation: 'fade',
          }}
          name="DeliveryMap"
          component={DeliveryMap}
        />
      </Navigator>
      {/* { showCartBar && <ViewCartBar /> } */}
    </NavigationContainer>
  );
};
export default Navigation;
