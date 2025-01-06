import { useCollapsibleContext } from "@r0b0t3d/react-native-collapsible";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useAuthStore } from "../../state/authStore";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { fonts_sizes, fonts_weights } from "../../utills/Constants";
const AnimatedHeader = ({ showNotice }) => {

    //Fetching User From AuthStore
    const { user, setUser } = useAuthStore();
    const { scrollY } = useCollapsibleContext();

    return (
        <View style={styles.subContainer}>
            {/* Header Component Code Placed Here */}
            <TouchableOpacity>
                <Text style={styles.text}>Delivery In</Text>
                {/* Flex Row Gap - Two Column */}
                <View style={styles.flexRowGap}>
                    <Text style={styles.text_minutes}>10 minutes</Text>
                    <TouchableOpacity style={styles.noticeBtn} onPress={showNotice}>
                    <Icon name="flash" size={15} color="#FFC300" />
                        <Text style={[styles.text,{color:'black'}]}>Rain</Text>
                    </TouchableOpacity>
                </View>
                {/* Flex Row - Two Column */}
                <View style={styles.flexRow}>
                    <View>
                        <Text style={styles.text2}>Nowhere,Somewhere...</Text>
                    </View>
                    <Icon name="caret-down" size={20} color="#fff" />
                </View>
            </TouchableOpacity>

            <TouchableOpacity>
                <Icon name="user-circle-o" size={30} color="#fff" />
            </TouchableOpacity>
            {/* **** Header Component Code Placed Here**** */}
        </View>
    )
}

export default AnimatedHeader;

const styles = StyleSheet.create({
    text:{
        color:'#fff',
        fontSize:fonts_sizes.small,
        fontFamily:'Okra-Regular'
    },
    text2:{
        color:'#fff',
        fontSize:fonts_sizes.small,
        fontFamily:'Okra-Regular'
    },
    text_minutes:{
        color:'#fff',
        fontSize:fonts_sizes.extraLarge,
        fontWeight:fonts_weights.bold,
        fontFamily:'Okra-Bold'
    }
    ,
    flexRowGap: {
       flexDirection:'row',
       alignItems:'center',
       gap:5
    },
    flexRow:{
        flexDirection:'row',
        gap:3,
        width:'70%',
        alignItems:'center',
        justifyContent:'space-evenly',
    }
    ,
    subContainer:{
        flexDirection:'row',
        alignItems:'center',
        paddingTop:10,
        paddingHorizontal:10,
        justifyContent:'space-between'
    },
    noticeBtn:{
        backgroundColor:'#E8EAF5',
        borderRadius:100,
        paddingHorizontal:10,
        paddingVertical:4,
        flexDirection:'row',
        gap:2
    }
})