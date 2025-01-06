import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Animated, StyleSheet, Dimensions } from 'react-native';

// Get screen height
const { height } = Dimensions.get('window');

const NoticePopup = () => {
  const [showOffer, setShowOffer] = useState(false); // To toggle visibility of the offer
  const slideAnim = useRef(new Animated.Value(-height)).current; // Start off-screen (above the view)

  // Function to slide the offer down (to position 0)
  const slideDown = () => {
    setShowOffer(true);
    Animated.timing(slideAnim, {
      toValue: 0, // Slide to the top of the screen (position 0)
      duration: 2000, // Duration of the animation (in milliseconds)
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  };

  // Function to slide the offer up (to position -height)
  const slideUp = () => {
    Animated.timing(slideAnim, {
      toValue: -height, // Slide back off-screen (using negative screen height)
      duration: 2000, // Duration of the animation (in milliseconds)
      useNativeDriver: true, // Use native driver for better performance
    }).start(() => {
      setShowOffer(false); // Hide the offer after the animation completes
    });
  };

  // Automatically trigger the slide down after a small delay (e.g., 2 seconds)
  useEffect(() => {
    slideDown();
    // Optional: Automatically hide the offer after 5 seconds
    const autoHideTimeout = setTimeout(() => {
      slideUp(); // Slide the offer up after 5 seconds
    }, 5000); // Delay of 5 seconds to hide the offer

    // Cleanup timeouts when the component unmounts
    return () => {
      clearTimeout(autoHideTimeout);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.discountContainer, { transform: [{ translateY: slideAnim }] }]}
      >
        {showOffer && (
          <View style={styles.offer}>
            <Text style={styles.offerText}>Special Discount! Get 20% Off</Text>
            <Button title="Hide Offer" onPress={slideUp} />
          </View>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 9999,
  },
  offer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'orange',
    borderRadius: 5,
  },
  offerText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NoticePopup;
