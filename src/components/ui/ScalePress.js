import { useRef } from "react";
import { Text, TouchableOpacity, View,Animated, Pressable } from "react-native"


const ScalePress=({onPress,children,style})=>{
    //Animated value with useRef
    const scale = useRef(new Animated.Value(1)).current;
    const onPressIn=()=>{
        Animated.spring(scale,{
            toValue:0.9,
            useNativeDriver: true,
        }).start();
    }
    const onPressOut=()=>{
        Animated.spring(scale,{
            toValue:1,
            useNativeDriver: true,
        }).start();
    }
    

    return(
        <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}
        style={{...style}}>
        <Animated.View style={{transform:[{scale}],width:'100%'}}>
            {children}
        </Animated.View>

        </Pressable>
    )
}
export default ScalePress;