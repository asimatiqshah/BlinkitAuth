import { Dimensions, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuthStore } from "../../state/authStore";
import { useEffect, useMemo } from "react";
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { storage } from "../../state/storage";
import { useNavigation } from "@react-navigation/native";

const ViewCartBar = () => {
    const { cart } = useAuthStore();
    const widthC = useSharedValue(0);
    const opacityC = useSharedValue(0);
    const screenWidth = Dimensions.get("window").width;
    const navigation = useNavigation();

    let totalItems = useMemo(() => (
        Object.keys(cart).reduce((total, current) => {
            total += cart[current]?.quantity;
            return total;
        }, 0)),
        [cart]
    );

    let totalPrice = useMemo(() => (
        Object.keys(cart).reduce((total, current) => {
            total += Number(cart[current]?.price * cart[current]?.quantity);
            return total;
        }, 0)),
        [cart]
    );

    const animatedStyle = useAnimatedStyle(() => ({
        width: widthC.value,
    }));

    const animatedOpacityStyle = useAnimatedStyle(() => ({
        opacity: opacityC.value,
    }));

    const animatedTxtStyle = useAnimatedStyle(() => {
        const opacity = interpolate(widthC.value, [150, 250], [0, 1], Extrapolation.CLAMP);
        return { opacity };
    });

    useEffect(() => {
        if (totalItems >= 1) {
            // Step 1: Expand width
            widthC.value = withSpring(screenWidth * 0.9, {
                damping: 20,
                stiffness: 100,
                mass: 0.8,
                velocity: 2,
            });
            opacityC.value = withTiming(1, { duration: 300 });
        } else {
            // Shrink width and hide immediately by reducing opacity at the same time
            widthC.value = withSpring(0, {
                damping: 30, // Slightly increased to slow down the animation
                stiffness: 80, // Slightly decreased for a smoother, slower exit
                mass: 1,
            });
            opacityC.value = withTiming(0, { duration: 400 }); // Increased duration for slower fade
        }

    }, [totalItems]);

    return (
        <Animated.View style={[styles.container, animatedStyle, animatedOpacityStyle]}>
            <View style={{ height: 40, flex: 1, marginRight: 10, justifyContent: 'flex-start' }}>
                <Image
                    source={require('../../assets/icons/cart.png')}
                    style={{ width: "100%", height: '100%', resizeMode: 'contain' }}
                />
            </View>

            <Animated.View style={[animatedTxtStyle, { flex: 3 }]}>
                <Text style={{ fontFamily: 'Okra-Medium', color: 'white' }}>
                    {totalItems > 1 ? `${totalItems} Items` : `${totalItems} Item`}
                </Text>
                <Text style={{ fontFamily: 'Okra-Bold', fontSize: 16, color: 'white' }}>${totalPrice}</Text>
            </Animated.View>

            <View style={{ flex: 2 }}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => {
                    totalItems >= 1 ? navigation.navigate('ProductOrder') : null
                }}>
                    <Text style={[animatedTxtStyle, { fontFamily: 'Okra-Medium', color: 'white', textAlign: 'right' }]}>
                        View Cart
                    </Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

export default ViewCartBar;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'green',
        flexDirection: 'row',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 20,
        height: 60, // Default height (now handled by width & opacity)
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 20,
        borderRadius: 14,
    }
});
