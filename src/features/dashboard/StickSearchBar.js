import { StickyView, useCollapsibleContext } from "@r0b0t3d/react-native-collapsible";
import { Button, StyleSheet, Text, View } from "react-native";
import SearchBar from "../../components/dashboard/SearchBar";
import RollingBar from "react-native-rolling-bar";
import { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { interpolate, useAnimatedStyle } from "react-native-reanimated";

const StickSearchBar = () => {
    const {scrollY} = useCollapsibleContext();

    const backgroundColorChanges = useAnimatedStyle(()=>{
        const opacity = interpolate(
            scrollY.value,
            [1,80],
            [0,1]
        );
        return {
            backgroundColor:`rgba(255,255,255,${opacity})`
        };
    });

    return (
        <StickyView style={[backgroundColorChanges]}  >
                <SearchBar />      
        </StickyView>
    )
}
export default StickSearchBar;
const styles = StyleSheet.create({
    shadow:{
        width:'100%',
        height:15,
        borderBottomWidth:1,
        borderBottomColor:'#808088',
        backgroundColor:'rgba(255,255,255,1)'
    }
})