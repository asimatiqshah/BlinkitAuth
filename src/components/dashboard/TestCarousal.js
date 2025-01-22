import { window } from "@/constants/sizes";
import { renderItem } from "@/utils/render-item";
import * as React from "react";
import { Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

const defaultDataWith6Colors = [
    "#B0604D",
    "#899F9C",
    "#B3C680",
    "#5C6265",
    "#F5D399",
    "#F1F1F1",
];

function TestCarousal() {
    const progress = useSharedValue(0);

    return (
        <View>
            <Carousel
            autoPlay={true}
                autoPlayInterval={2000}
                data={defaultDataWith6Colors}
                height={258}
                loop={true}
                pagingEnabled={true}
                snapEnabled={true}
                width={430}
                style={{
                    width: 430,
                }}
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 50,
                }}
                renderItem={() => {
                    return (
                        // <Image
                        // style={styles.img}
                        //     source={item}
                        // />
                        <View style={{ width: 360, height: 180, backgroundColor: 'red' }}>
                            <Text>Image</Text>
                        </View>
                    )
                }}
            />
        </View>
    );
}

export default TestCarousal;
