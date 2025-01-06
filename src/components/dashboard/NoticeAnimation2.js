import { Animated as RNAnimated, StyleSheet, Text, View } from "react-native"
import { NoticeHeight } from "../../utills/Scalling";

//MAKE A COPY OF GLOBAL HEIGHT
const NOTICE_HEIGHT = -(NoticeHeight + 12);

const NoticeAnimation2 = ({ noticePosition, children }) => {
    return (
        <View style={styles.container}>
            <RNAnimated.View>

            </RNAnimated.View>
            <RNAnimated.View>
                {children}
            </RNAnimated.View>
        </View>
    )
}
export default NoticeAnimation2;

const styles = StyleSheet.create({
    noticeContainer: {
        width: '100%',
        position: 'absolute',
        zIndex: 999
    },
    contentContainer: {
        flex: 1,
        width: '100%'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})