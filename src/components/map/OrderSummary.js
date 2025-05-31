import { Image, StyleSheet, Text, View } from "react-native"
import { Blinkit_Colors } from "../../utills/Constants";

const OrderSummary = ({ order }) => {

    // console.log("i am in orderSummary");
    
    return (

        <View>
            {
                order?.items.map((item, index) => (   
                    <View style={styles.flexRow} key={index}>
                        <View style={styles.imgContainer}>
                            <Image source={{uri:`${item?.item?.image}`}} style={styles.img} />
                        </View>
                        <View style={{ flexDirection: 'row', width: '80%', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={styles.txtHeading}>{item?.item?.name}</Text>
                                <Text style={styles.txtParagraph}>{item?.item?.quantity}</Text>
                            </View>
                            <View>
                                <Text style={styles.txtHeading}>$34</Text>
                                <Text style={styles.txtParagraph}>{item?.count}x</Text>
                            </View>
                        </View>
                    </View>
                ))
            }
        </View>


    )
}

export default OrderSummary;


const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: 10,
        padding: 10,
        marginTop: 10,
        alignItems: 'center',
        gap: 10,
        borderRadius: 10,
        elevation: 1
    },
    img: {
        width: 40,
        height: 40
    },
    imgContainer: {
        backgroundColor: Blinkit_Colors.backgroundSecondary,
        padding: 10,
        borderRadius: 15,
        width: '17%',
        justifyContent:'center',
        alignItems:'center'
    },
    txtHeading: {
        fontFamily: 'Okra-Bold',
        fontSize: 14
    },
    txtParagraph: {
        fontFamily: 'Okra-Medium',
        fontSize: 14
    }



});