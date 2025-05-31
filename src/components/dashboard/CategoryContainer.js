import { Image, StyleSheet, Text, View } from "react-native";
import { fonts_sizes } from "../../utills/Constants";
import ScalePress from "../ui/ScalePress";
import { useNavigation } from "@react-navigation/native";

const CategoryContainer = ({ dataCategories }) => {
    console.log(dataCategories);
    const navigation = useNavigation();

    const renderItem = (data) => {
        return (
            <>
                {
                    data.map((item, index) => {
                        return (
                                <ScalePress onPress={()=>navigation.navigate('ProductCategories')} style={styles.item} key={index}>
                                    <View style={styles.imageContainer} >
                                        <Image
                                            style={styles.image}
                                            source={item.image}
                                        />
                                    </View>
                                    <Text style={styles.text}>{item.name}</Text>
                                </ScalePress>
                        )
                    })
                }
            </>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.row_que}>{renderItem(dataCategories.slice(0, 4))}</View>
            <View style={styles.row_que}>{renderItem(dataCategories.slice(4, 8))}</View>
        </View>
    )
}
export default CategoryContainer;
const styles = StyleSheet.create({
    // image: {
    //     width: '100%',
    //     height: '100%',
    //     resizeMode: 'contain'
    // },
    // item: {
    //     width: '22%',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     // marginBottom:25
    // },
    // row_que: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'flex-start', // Align all items to the same baseline
    //     marginBottom: 25,
    // },
    // imageContainer: {
    //     width: '100%',
    //     height: 80, // Fixed height
    //     padding: 6,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: 'red',
    //     marginBottom: 8,
    // },
    // text: {
    //     fontSize: fonts_sizes.small,
    //     textAlign: 'center'
    // },
    // container: {
    //     // marginVertical:15
    // }

    image:{
        width:'100%',
        height:'100%',
        resizeMode:'contain'
    },
    text:{
        fontSize: fonts_sizes.small,
        textAlign:'center'
    },
    imageContainer:{
        width:'100%',
        height:80,
        padding:6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#E5F3F3',
        // marginBottom: 8,
        marginRight:20
    },
    item:{
        width:'22%',
        justifyContent:'center',
        alignItems:'center',
    },
    row_que:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-start',
        marginBottom: 0,
    },
      container: {
        marginVertical:10
    }

})