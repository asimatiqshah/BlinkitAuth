import { Button, Image, Animated as RNAnimated, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import NoticeAnimation from "../../components/dashboard/NoticeAnimation.js";
import { useEffect, useRef } from "react";
import TriangleShape from "../../assets/svg/TriangleShape.js";
import Visuals from "./Visuals.js";
import LinearGradient from "react-native-linear-gradient";
import { CollapsibleContainer, CollapsibleHeaderContainer, CollapsibleScrollView, StickyView, useCollapsibleContext, withCollapsibleContext } from "@r0b0t3d/react-native-collapsible";
import AnimatedHeader from "./AnimatedHeader.js";
import StickSearchBar from "./StickSearchBar.js";
import RollingBar from "react-native-rolling-bar";
import Content from "../../components/dashboard/Content.js";
import { fonts_sizes, fonts_weights } from "../../utills/Constants.js";
import { useScrollToTop } from "@react-navigation/native";
import Animated, { interpolate, useAnimatedStyle, withTiming } from "react-native-reanimated";
import Icon from 'react-native-vector-icons/dist/AntDesign';
import { useAuthStore } from "../../state/authStore.js";
import { mmkvStorage, storage, tokenStorage } from "../../state/storage.js";
import WithCart from "../cart/WithCart.js";
import withLiveStatus from "../../components/map/withLiveStatus.js";
const ProductDashboard = () => {
    const previousScroll = useRef(0);
    const { scrollY, expand } = useCollapsibleContext();
    const { cart,user } = useAuthStore();
    console.log(user);
    
        
    // const showScrollYStyle = useAnimatedStyle(() => {
    //     console.log("scrollY " + scrollY.value);
    //     console.log("previousScroll " + previousScroll.current);
    //     previousScroll.current = scrollY.value;
    //     return { opacity: 1 }
    // });

    const backToTopStyle = useAnimatedStyle(() => {
        const isScrollingScroll = scrollY.value < previousScroll.current && scrollY.value > 180;
        const opacity = withTiming(
            isScrollingScroll ? 1 : 0,
            { duration: 300 }
        );
        const translateY = withTiming(isScrollingScroll ? 0 : 10 ,{duration:300} );
        previousScroll.current = scrollY.value;
        return { 
            opacity,
            transform: [{ translateY }]
        }
    });

    const noticePosition = useRef(new RNAnimated.Value(-100)).current;
    //slideUp
    //slideDown

    const slideDown = () => {
        RNAnimated.timing(noticePosition, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true
        }).start();
    }
    const slideUp = () => {
        RNAnimated.timing(noticePosition, {
            toValue: -100,
            duration: 2000,
            useNativeDriver: true
        }).start();
    }
    useEffect(() => {
        slideDown();
        const timeoutID = setTimeout(() => {
            slideUp();
        }, 4000);
        return () => clearTimeout(timeoutID);
    }, [])

    return (
        <NoticeAnimation noticePosition={noticePosition}>
            <Visuals />
            <Animated.View style={[styles.backToTopButton, backToTopStyle]}>
                <TouchableOpacity
                    onPress={() => {
                        scrollY.value = 0;
                        expand();
                    }}
                    style={[{ flexDirection: 'row', alignItems: 'center', gap: 6 }]}>
                    <Icon name="upcircleo" size={16} color="#fff" />
                    <Text style={{ color: 'white' }}>Back To Top</Text>
                </TouchableOpacity>
            </Animated.View>

            {/* NoticeAnimation children styling working here */}
            <CollapsibleContainer style={{ flex: 1 }}>
                <CollapsibleHeaderContainer containerStyle={{ backgroundColor: 'transparent', width: '100%' }}>
                    {/* Consider As View Wrapped in Component */}
                    <AnimatedHeader
                        showNotice={() => {
                            slideDown();
                            const timeoutID = setTimeout(() => {
                                slideUp();
                            }, 4000);
                            return () => clearTimeout(timeoutID);
                        }}
                    />
                    {/* Consider As StickyView Wrapped in Component */}
                    <StickSearchBar />
                </CollapsibleHeaderContainer>

                <CollapsibleScrollView>
                    <Content />

                    <View style={{ backgroundColor: '#F8F8F8', padding: 20, height: 180 }}>
                        <Text style={styles.credit_heading}>
                            {`Pakistan\nlast minute app`}
                            <Image
                                style={styles.mango_img}
                                source={require('../../assets/images/mango.png')}
                            />
                        </Text>
                        <Text style={styles.credit_text}>
                            Developed By Syed Asim
                            <Image
                                style={styles.heart_img}
                                source={require('../../assets/images/heart.png')}
                            />
                        </Text>
                    </View>

                </CollapsibleScrollView>
            </CollapsibleContainer>
            {/* <Text>ProductDashboard</Text> */}

        </NoticeAnimation>
    )
}

export default withLiveStatus(WithCart(withCollapsibleContext(ProductDashboard)));
// export default WithCart(withCollapsibleContext(ProductDashboard));

var styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    mango_img: {
        width: 30,
        height: 30,
        opacity: 0.2
    },
    heart_img: {
        width: 15,
        height: 15,
        opacity: 0.2
    },
    credit_heading: {
        fontSize: 32,
        fontWeight: fonts_weights.extraBold,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.2,
        paddingVertical: 10
    },
    credit_text: {
        fontSize: fonts_sizes.small,
        fontWeight: fonts_weights.regular,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.2
    },
    backToTopButton: {
        backgroundColor: 'black',
        paddingHorizontal: 20,
        paddingVertical: 10,
        position: 'absolute',
        borderRadius: 200,
        top: 100,
        zIndex: 999,
        alignSelf: 'center',
    },
});