import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Blinkit_Colors, fonts_sizes } from "../../utills/Constants";
import { useEffect, useMemo, useRef } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const Sidebar = ({ categories, selectedCategory, onCategoryPress }) => {
    
    const ScrollViewRef = useRef(null);
    const indicatorPosition = useSharedValue(0);
    // const animatedValues = useMemo(categories?.map(()=>useSharedValue(0)),[categories]);
    const animatedValues = useRef(categories?.map(() => useSharedValue(0)) ?? []).current;
    
    
    useEffect(()=>{

        let targetIndex = -1;

        //FIND OUT THE CURRENT TAB/ITEM INDEX WHICH IS SHOWING 
        categories?.forEach((category,index) => {
            const isSelected = selectedCategory?._id === category?._id;
            if(isSelected) targetIndex = index
        });

        if(targetIndex !== -1){
            indicatorPosition.value = withTiming(targetIndex * 120,{duration:500})
        }
        
    },[selectedCategory])

    const indicatorStyle = useAnimatedStyle(()=>({
        transform:[{translateY:indicatorPosition.value}]
    }))

    return (
        <View style={styles.sidebar}>
            <ScrollView
            contentContainerStyle={{paddingBottom:200}}
            showsVerticalScrollIndicator={false}
            >
                <Animated.View style={[styles.indicator,indicatorStyle]} />
                <View style={{flex:1}}>
                    {
                        categories?.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.categoryButton}
                                    onPress={()=>onCategoryPress(item)}
                                >
                                    <View style={styles.imageContainer}>
                                        <Image
                                            style={styles.image}
                                            source={{ uri: item.image }}
                                        />
                                    </View>
                                    <Text style={styles.txt}>{item.name}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </View>
    )
}
export default Sidebar;
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    imageContainer: {
        width: '100%',
        height: 60,
        backgroundColor: '#e2e2e2',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        padding: 8,
        marginBottom:10,
    },
    sidebar: {
        width: '24%',
        backgroundColor: '#f0f0f0', // Example background color
        borderRightWidth: 1, // Width of the border
        borderRightColor: '#ccc', // Color of the border
    },
    txt: {
        textAlign: 'center',
        fontFamily:'Okra-MediumLight',
        fontSize:fonts_sizes.small
    },
    categoryButton: {
        padding: 10,
        height:120
    },
    indicator:{
        position:'absolute',
        top:7,
        right:0,
        width:4,
        height:60,
        alignSelf:'center',
        backgroundColor:Blinkit_Colors.secondary,
        borderTopLeftRadius:15,
        borderBottomLeftRadius:15
    }


})