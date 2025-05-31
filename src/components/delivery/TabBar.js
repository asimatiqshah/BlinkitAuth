import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Blinkit_Colors } from "../../utills/Constants";

const TabBar=({selectedTab,onTabChange})=>{


    return(
        <View style={styles.tabContainer}>
            <TouchableOpacity
            onPress={()=>{
                onTabChange("available");
            }}
            style={[
                styles.tab,
                selectedTab == "available" && styles.activeTab
            ]}>
                <Text style={[
                    styles.tabText,
                    selectedTab == "available"
                    ? styles.activeTabText
                    : styles.InactiveTabText
                ]}>Available</Text>
            </TouchableOpacity>

             <TouchableOpacity
             onPress={()=>{
                onTabChange("delivered")
            }}
             style={[
                styles.tab,
                selectedTab == "delivered" && styles.activeTab
             ]}>
                <Text
                style={[
                    styles.tabText,
                    selectedTab == "delivered"
                    ? styles.activeTabText
                    : styles.InactiveTabText
                ]}>Delivered</Text>
            </TouchableOpacity>

        </View>
    )
}
export default TabBar;

const styles = StyleSheet.create({
    tabContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginBottom:10,
        backgroundColor: Blinkit_Colors.backgroundSecondary,
    },
    tab:{
        paddingVertical:10,
        borderRadius:23,
        borderWidth:3,
        borderColor:Blinkit_Colors.border,
        width:'38%',
        alignItems:'center',
        margin:10
    },
    tabText:{
        color:Blinkit_Colors.text,
        fontFamily: 'Okra-Medium',
    },
    activeTab:{
        backgroundColor:Blinkit_Colors.secondary,
        borderColor:Blinkit_Colors.secondary
    },
    activeTabText:{
        color:'#fff'
    },
    InactiveTabText:{
        color:Blinkit_Colors.disabled
    }
})