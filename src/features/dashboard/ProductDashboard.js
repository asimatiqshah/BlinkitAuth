import { Animated as RNAnimated, StyleSheet, Text, TextInput, View } from "react-native";
import NoticeAnimation from "../../components/dashboard/NoticeAnimation.js";
import { useEffect, useRef } from "react";
import TriangleShape from "../../assets/svg/TriangleShape.js";
import Visuals from "./Visuals.js";
import LinearGradient from "react-native-linear-gradient";
import { CollapsibleContainer, CollapsibleHeaderContainer, withCollapsibleContext } from "@r0b0t3d/react-native-collapsible";
import AnimatedHeader from "./AnimatedHeader.js";
const ProductDashboard = () => {
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
                {/* NoticeAnimation children styling working here */}
                <CollapsibleContainer>
                    <CollapsibleHeaderContainer containerStyle={{backgroundColor:'transparent'}}>
                        <AnimatedHeader
                            showNotice={() => {
                                slideDown();
                                const timeoutID = setTimeout(() => {
                                    slideUp();
                                }, 4000);
                                return () => clearTimeout(timeoutID);
                            }}
                        />
                    </CollapsibleHeaderContainer>
                </CollapsibleContainer>
                {/* <Text>ProductDashboard</Text> */}
            
        </NoticeAnimation>
    )
}

export default withCollapsibleContext(ProductDashboard);


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
});