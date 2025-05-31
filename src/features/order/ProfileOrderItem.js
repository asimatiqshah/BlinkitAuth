import { StyleSheet, Text, View } from "react-native"

const ProfileOrderItem = ({ item, index }) => {
    console.log(index);

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, alignItems: 'flex-end' }}>
                <Text style={styles.textNormal}>#{item.orderId}</Text>
                <Text style={styles.textNormal}>{item.status}</Text>
            </View>
            <View style={{justifyContent: 'space-between', paddingHorizontal: 10, marginTop: 15 }}>
                {
                    item.items.map((i, idx) => {
                        return (
                            <View key={idx}>
                                <Text style={styles.textNormal}>
                                    {i.count}x {i.item.name}
                                </Text>
                            </View>
                        )
                    })
                }
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.textHeader}>${item.totalPrice}</Text>
                    <Text style={styles.textParagraphSmall}>{item.createdAt}</Text>
                </View>
            </View>
        </View>
    )
}
export default ProfileOrderItem;

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 0.7,
        paddingVertical: 15,
        opacity: 0.9,
        borderTopWidth: 0.7,
        marginTop: 15,
    },
    textParagraphSmall: {
        fontSize: 14,
        fontFamily: 'Okra-Medium'
    },
    textHeader: {
        fontSize: 16,
        fontFamily: 'Okra-Bold'
    },
    textNormal: {
        fontSize: 14,
        fontFamily: 'Okra-Medium'
    },
    textMediumHeading: {
        fontSize: 14,
        fontFamily: 'Okra-Medium',
        opacity: 0.7
    }
})