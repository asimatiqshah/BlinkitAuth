import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { screenHeight, screenWidth } from '../../utills/Scalling';
import LottieView from 'lottie-react-native';

const Visuals = () => {
  return (
    <View style={{backgroundColor:'white',position:'absolute',width:'100%'}}>
      <Image source={require('../../assets/images/bg-home.png')} style={styles.bg_image} />
      <LottieView source={require('../../assets/animations/raining.json')}
      style={styles.lottie}
      autoPlay
      loop
      />
      <Image source={require('../../assets/images/cloud.png')} style={styles.cloud} />

    </View>
  );
};


export default Visuals;
var styles = StyleSheet.create({
  bg_image:{
    width:'100%',
    height:276,
    position:'absolute',
  },
  cloud:{
    width:screenWidth,
    position:'absolute',
    resizeMode:'stretch'
  },
  lottie:{
    width:'100%',
    height:300,
    transform:[{scaleY:1}]
  }
});
