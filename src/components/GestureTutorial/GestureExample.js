import { Dimensions, StyleSheet, Text, View, Image } from "react-native";
import { Gesture, GestureDetector, PanGestureHandler } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from "react-native-reanimated";
const height = Dimensions.get('window').height;
const GestureExample = () => {
    const y = useSharedValue(0);
    const offsetY = useSharedValue(0);

    const pan = Gesture.Pan()
        .onStart((e) => {
            y.value = offsetY.value;
        })
        .onUpdate((e) => {
            if(e.translationY < 0){
                y.value = e.translationY;
                console.log(y.value);
            }else if(e.translationY > 0){
                y.value = offsetY.value;
                console.log(y.value);
            }
           
        })
        .onEnd((e) => {
            if (e.absoluteY < 320) {
                y.value = withTiming(-540, { easing: Easing.linear });
                offsetY.value = y.value;
            } else {
                y.value = withTiming(0, { easing: Easing.linear });
            }
        });

    const animatedContainerStyle = useAnimatedStyle(() => ({
        transform: [{
            translateY: y.value
        }]
    }));


    return (
        <>
            <Image
                style={{ width: '100%', height: '100%', resizeMode: 'center', ...StyleSheet.absoluteFill }}
                source={require('../../assets/images/apple.png')}
            />
            <Animated.View style={[styles.container, animatedContainerStyle]}>
                {/* consider as pan gesture */}
                <GestureDetector gesture={pan}>
                    <Animated.View style={{
                        position: 'absolute',
                        width: '100%',
                        height: 100,
                        backgroundColor: 'red',
                        bottom: 0
                    }} />
                </GestureDetector>
            </Animated.View>
        </>

    )
}
export default GestureExample;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue'
    }
})