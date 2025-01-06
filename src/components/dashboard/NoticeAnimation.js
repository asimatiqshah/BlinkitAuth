import { Image, Animated as RNAnimated, StyleSheet, Text, View } from "react-native";
import TriangleShape from "../../assets/svg/TriangleShape";

const NoticeAnimation = ({ noticePosition, children }) => {
    return (
        <View style={{position:'relative',flex:1}}>
            <RNAnimated.View style={[styles.noticeContainer, {
                transform: [
                    { translateY: noticePosition }
                ]
            }]}>
                <Text style={styles.heading}>It's raining near this location</Text>
                <Text style={styles.paragraph}>Our delivery partners may take longer to reach you</Text>
             {/* svg files */}
             <TriangleShape style={styles.borderTriangle} />
            </ RNAnimated.View>

            {/* giving flex 1 is importang here elso nothing showing  */}
            <View style={{flex:1}}>
                {children}
            </View>
        </View>
    )
}
export default NoticeAnimation;
const styles = StyleSheet.create({
    noticeContainer: {
        position: 'absolute',
        top: 0,
        zIndex: 999,
        backgroundColor: '#c5cfdf',
        width: '100%',
        padding: 10
    },
    heading: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    paragraph: {
        textAlign: 'center'
    },
    borderTriangle:{
        position:'absolute',
        bottom:-9,
    }


})