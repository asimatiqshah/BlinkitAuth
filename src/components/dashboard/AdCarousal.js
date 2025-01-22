import { Image, StyleSheet, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { screenWidth } from "../../utills/Scalling";

const AdCarousal = ({ adData }) => {
    console.log(screenWidth * 0.5);

    return (
        <View>
            <Carousel
				autoPlayInterval={3000}
                autoPlay={true}
				data={adData}
				height={screenWidth * 0.5}
                width={screenWidth}
				loop={true}
				pagingEnabled={true}
				snapEnabled={true}
                vertical={false}
                windowSize={3}
				style={{
					width: 360,
				}}
				mode="parallax"
				modeConfig={{
					parallaxScrollingScale: 0.9,
					parallaxScrollingOffset: 45,
				}}
				renderItem={({item})=>{
                    return(
                        // <Image
                        // style={styles.img}
                        //     source={item}
                        // />
                        <View style={{width:360,height:180,backgroundColor:'red'}}>
                            <Text>Image</Text>
                        </View>
                    )
                }}
			/>
        </View>
    )
}
export default AdCarousal;
const styles = StyleSheet.create({
    img:{
        width:'100%',
        height:'100%',
        borderRadius: 10,
    }
})