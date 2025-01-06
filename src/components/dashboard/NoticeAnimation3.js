import { useEffect, useRef } from "react";
import { Dimensions, Animated as RNAnimated, StyleSheet, Text, View } from "react-native";
import { NoticeHeight } from "../../utills/Scalling";

const noticeHeight = Dimensions.get('window').height;
const NOTICE_HEIGHT = -(noticeHeight + 12);
const NoticeAnimation = ({children}) => {
    // Set the initial value to -100
    const initialValue = useRef(new RNAnimated.Value(-noticeHeight)).current;

    const slideDown = () => {
        RNAnimated.timing(initialValue, {
            toValue: 0, // Target opacity is 1 (fully visible)
            duration: 2000, // Duration of the animation
            useNativeDriver: false, // Optional for performance improvement
        }).start();
    }

    const slideUp = () => {
        RNAnimated.timing(initialValue, {
            toValue: -noticeHeight, // Target opacity is 1 (fully visible)
            duration: 2000, // Duration of the animation
            useNativeDriver: false, // Optional for performance improvement
        }).start();
    }

    useEffect(() => {
        slideDown();
        const timeoutId = setTimeout(() => {
            slideUp();
        }, 5000);
        return () => clearInterval(timeoutId);
    }, []);


    return (
        <View>
            <RNAnimated.View style={[styles.noticeContainer,
            {
                transform: [
                    { translateY: initialValue }
                ]
            }
            ]}>
                <View>
                    <Text>GET 40% OFF ON ALL ORDERS</Text>
                </View>
                <Text>Don't be let to get this amazing offer.</Text>
            </RNAnimated.View>
            <RNAnimated.View style={{paddingTop:-50}}>
                {children}
            </RNAnimated.View>
        </View>
    )
}
export default NoticeAnimation;

const styles = StyleSheet.create({
    noticeContainer: {
        width: '100%',
        backgroundColor: 'red',
        position: 'absolute',
        top: 0,
        paddingVertical: 10,
    }
})