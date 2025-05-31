import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Blinkit_Colors } from "../../utills/Constants";
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { useAuthStore } from "../../state/authStore";
import { useNavigation } from "@react-navigation/native";

const DeliveryHeader = ({ name, email }) => {

    const {logout} = useAuthStore();
    const navigation = useNavigation();

    return (
        <View style={styles.flexRow}>
            <View style={{ flexDirection: 'row',width:'80%',alignItems:'center' }}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../assets/images/delivery_boy.png')}
                        style={styles.img}
                    />
                </View>
                <View style={{marginLeft:10}}>
                    <Text style={styles.txtHeading}>{name}</Text>
                    <Text style={styles.txtParagraph}>{email}</Text>
                </View>
            </View>
            <TouchableOpacity style={{justifyContent:'center'}}  onPress={()=>{
                logout();
                navigation.navigate('CustomerLogin');
            }}>
                <Icon name="logout" size={22} color="black" />
            </TouchableOpacity>
        </View>
    )
}
export default DeliveryHeader;

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
        backgroundColor: Blinkit_Colors.primary,
        justifyContent: 'space-between',
        padding: 10
    },
    imageContainer: {
        width: 54,
        height: 54,
        backgroundColor: Blinkit_Colors.backgroundSecondary,
        borderRadius: 100,
        overflow: 'hidden',
        padding: 4
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        bottom: -5
    },
     txtHeading: {
        fontFamily: 'Okra-Bold',
        fontSize: 14
    },
    txtParagraph: {
        fontFamily: 'Okra-Medium',
        fontSize: 14
    }
})