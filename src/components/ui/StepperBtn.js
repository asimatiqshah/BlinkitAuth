import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuthStore } from "../../state/authStore";

const StepperBtn = ({ productId,name,productWeight,productPrice,image }) => {
    const { cart, addProduct,removeProduct } = useAuthStore();
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={()=> removeProduct(productId)}>
                <Image
                    source={require('../../assets/images/minus-small.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>
            <Text style={styles.countText}>{ cart[productId]?.quantity || 0}</Text>
            <TouchableOpacity style={styles.button} onPress={() => addProduct(productId,name,productWeight,productPrice,image)}>
                <Image
                    source={require('../../assets/images/plus-small.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>
        </View>
    );
};

export default StepperBtn;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1.5,
        backgroundColor: 'green',
        justifyContent: 'space-around',
        borderRadius: 5,
    },
    button: {
        flex: 1,
        height: 20,
    },
    icon: {
        width: '90%',
        height: '90%',
    },
    countText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        color: 'white',
    }
});
