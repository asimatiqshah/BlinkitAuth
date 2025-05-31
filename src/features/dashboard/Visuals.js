import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { screenHeight, screenWidth } from '../../utills/Scalling';
import LottieView from 'lottie-react-native';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { useCollapsibleContext } from '@r0b0t3d/react-native-collapsible';

const Visuals = () => {

  //Animated Vlaue 
  //useAnimatedStyle
  //interpolate
  // return final css property
  //Animated.View
  // Add property in Animated.View

  const { scrollY } = useCollapsibleContext();
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0,80],
      [1,0]
    );
    return {opacity};
  });

  return (
    
    <Animated.View style={[styles.container,headerAnimatedStyle]}>
      <Image source={require('../../assets/images/bg-home-new.png')} style={styles.bg_image} />
      <LottieView source={require('../../assets/animations/raining.json')}
        style={styles.lottie}
        autoPlay
        loop
      />
    </Animated.View>
  );
};


export default Visuals;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%'
  },
  bg_image: {
    width: '100%',
    height: 180,
    position: 'absolute',
  },
  cloud: {
    width: screenWidth,
    position: 'absolute',
    resizeMode: 'stretch'
  },
  lottie: {
    width: '100%',
    height: 300,
    transform: [{ scaleY: 1 }]
  }
});
