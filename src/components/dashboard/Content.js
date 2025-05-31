import { Image, StyleSheet, Text, View } from "react-native";
import AdCarousal from "./AdCarousal";
import { adData, categories } from "../../utills/dummyData";
import { screenWidth } from "../../utills/Scalling";
import Carousel from "react-native-reanimated-carousel";
import { fonts_sizes, fonts_weights } from "../../utills/Constants";
import CategoryContainer from "./CategoryContainer";

const Content = () => {

    return (

        <View style={styles.container}>
            <Carousel
                autoPlay={true}
                style={{marginVertical:10}}
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
            {/* FOR Grocery and Kitchen */}
            <Text style={styles.large_heading}>Grocery and Kitchen</Text>
            <CategoryContainer dataCategories={categories} />
            {/* FOR Best Sellers */}
            <Text style={styles.large_heading}>Best Sellers</Text>
            <CategoryContainer dataCategories={categories} />
            {/* FOR Snacks & Drinks */}
            <Text style={styles.large_heading}>Snacks & Drinks</Text>
            <CategoryContainer dataCategories={categories} />
            {/* FOR Home & Lifestyle */}
            <Text style={styles.large_heading}>Home & Lifestyle</Text>
            <CategoryContainer dataCategories={categories} />
        </View>
    )
}
export default Content;
const styles = StyleSheet.create({
    img: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    large_heading: {
        fontSize: fonts_sizes.large,
        marginBottom: 5,
        fontFamily: 'Okra-Bold',
    },
    container: {
        paddingHorizontal: 10
    }
})