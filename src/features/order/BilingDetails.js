import { StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { Blinkit_Colors } from "../../utills/Constants";

const ReportItem = ({ iconName, title, price }) => {
    return (
        <View style={[styles.flexRowBetween, { marginTop: 10 }]}>
            <View style={styles.flexRow}>
                <Icon name={iconName} size={16} />
                <Text>{title}</Text>
            </View>
            <Text>${price}</Text>
        </View>
    )
}


const BilingDetails = ({ totalCartItemsPrice }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textHeading}>BilingDetails</Text>
            <View style={styles.billConteiner}>
                <ReportItem iconName="article" title="Items Total" price={totalCartItemsPrice} />
                <ReportItem iconName="pedal-bike" title="Delivery Charge" price={29} />
                <ReportItem iconName="shopping-bag" title="Handling Charge" price={2} />
                <ReportItem iconName="cloudy-snowing" title="Surge Charge" price={3} />
            </View>
            <View style={[styles.flexRowBetween,{marginBottom:15,marginTop:15}]}>
                <Text style={styles.textHeading}>Grand Total</Text>
                <Text style={styles.textHeading}>${totalCartItemsPrice + 34}</Text>
            </View>
        </View>
    )
}
export default BilingDetails;


const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    flexRowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    container: {
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 15,
        borderRadius: 10
    },
    textHeading: {
        fontFamily: 'Okra-Bold',
        fontSize: 14
    },
    billConteiner:{
        padding:10,
        borderBottomWidth:0.7,
        borderBottomColor:Blinkit_Colors.border
    }
})