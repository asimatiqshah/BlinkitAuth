import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { Blinkit_Colors } from "../../utills/Constants";

const ArrowButton = ({ loading, title, price, onPress }) => {
    return (
        <TouchableOpacity
        disabled={loading}
        onPress={onPress}
        style={[styles.btn,{justifyContent:price !== 0 ? 'space-between': 'center'}]}>
            <View>
                <Text style={{fontFamily: 'Okra-Bold'}}>${price + 34}.0</Text>
                <Text style={styles.textTotal}>TOTAL</Text>
            </View>
            <View style={styles.flexRow}>
                <Text style={[styles.textTitle,{ paddingRight : loading ? 3 : 0 }]}>{title}</Text>
                {
                loading?
                (
                    <ActivityIndicator size="small" color="#0000ff" />
                )
                :
                (
                    <Icon name="arrow-right" size={28} />
                )
                }
            </View>
        </TouchableOpacity>
    )
}

export default ArrowButton;

const styles = StyleSheet.create({

    textTotal: {
        fontSize: 12,
        fontFamily: 'Okra-Regular'
    },
    
    textTitle: {
        fontSize: 15,
        fontFamily: 'Okra-Bold',
    },
    flexRow:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    btn:{
        flexDirection:'row',
        backgroundColor:Blinkit_Colors.primary,
        borderRadius:12,
        padding:10,
        alignItems:'center',
        // paddingRight:0
    }
})