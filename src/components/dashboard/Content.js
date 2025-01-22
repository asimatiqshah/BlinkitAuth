import { Image, StyleSheet, Text, View } from "react-native";
import AdCarousal from "./AdCarousal";
import { adData } from "../../utills/dummyData";
import { screenWidth } from "../../utills/Scalling";
import Carousel from "react-native-reanimated-carousel";

const Content = () => {
    return (

        <View>
            <Carousel
                autoPlay={true}
                autoPlayInterval={6000}
                data={adData}
                height={screenWidth * 0.5}
                loop={true}
                pagingEnabled={true}
                snapEnabled={true}
                width={360}
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 50,
                }}
                renderItem={({ item }) => {
                    return (
                        <Image
                            style={styles.img}
                            source={item}
                        />
                    )
                }}
            />
        </View>
    )
}
export default Content;
const styles = StyleSheet.create({
    img: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    }
})