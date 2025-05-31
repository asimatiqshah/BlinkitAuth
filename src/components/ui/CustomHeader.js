import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { fonts_sizes } from "../../utills/Constants";
import { useNavigation } from "@react-navigation/native";
const CustomHeader = ({title}) => {
    const navigation = useNavigation();
    const goBack=()=>{
        if(navigation.canGoBack){
            navigation.goBack();
        }else{
            navigation.navigate('ProductDashboard');
        }
    }
    
    return (
        <View style={styles.flexRow}>
            <Pressable onPress={goBack}>
                <Icon name="chevron-back" size={18} color="#00000" />
            </Pressable>
                <Text style={styles.textHeader}>{title}</Text>
            <View>
                <Icon name="search" size={18} color="#00000" />
            </View>
        </View>
    )
}
export default CustomHeader;

const styles = StyleSheet.create({
    flexRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        height:60,
        backgroundColor:'white',
        padding:10,
        alignItems:'center',
        borderColor:'rgb(184, 184, 184)',
        borderBottomWidth:0.6
    },
    textHeader:{
        fontSize:fonts_sizes.medium,
        fontFamily:'Okra-Bold'
    }
})