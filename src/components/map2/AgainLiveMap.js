import { Image, StyleSheet, Text, View } from "react-native";
import { Blinkit_Colors } from "../../utills/Constants";
import { screenHeight } from "../../utills/Scalling";
import MapView, { Marker, Polyline } from "react-native-maps";
import { camera } from "../map/mapUtils";
import { customMapStyle } from "../../utills/CustomMap";
import { useMapRefStore } from "../../state/mapStore";
import { getPoints } from "../../utills/getPoints";
import MapViewDirections from "react-native-maps-directions";
import { useEffect } from "react";

const AgainLiveMap = ({ deliveryLocation, pickupLocation, deliveryPersonLocation, hasPickedUp, hasAccepted, mapRef, setMapRef }) => {

    // console.log("i am here in AgainLiveMap");
    // // console.log(pickupLocation, deliveryLocation);
    // console.log(mapRef);


    console.log(deliveryPersonLocation);



    const GOOGLE_MAPS_APIKEY = 'AIzaSyApFRhZzEwplfzr1SZGoJ-JofIaonZJkZk';
    const defaultLocation = { latitude: 12.936739, longitude: 77.615947 };
    const originLocation = deliveryPersonLocation;

    useEffect(() => {
        if (pickupLocation && deliveryLocation && mapRef?.fitToCoordinates) {
            mapRef.fitToCoordinates(
                [pickupLocation, deliveryLocation],
                {
                    edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                    animated: true,
                }
            );
        }
    }, [pickupLocation, deliveryLocation]);

    return (
        <View style={styels.container}>
            <MapView
                ref={setMapRef}
                provider="google"
                camera={camera}
                showsUserLocation={true}
                userLocationCalloutEnabled={true}
                userLocationPriority="high"
                style={{ flex: 1 }}
            >
                {pickupLocation && deliveryLocation && (
                    <Polyline
                        coordinates={[
                            {
                                latitude: pickupLocation.latitude,        // Pickup: Central Business District, Mumbai
                                longitude: pickupLocation.longitude,
                            },
                            {
                                latitude: deliveryLocation.latitude,     // Delivery: Firdous Apartments, Mumbai
                                longitude: deliveryLocation.longitude,
                            },
                        ]}
                        strokeColor="black"
                        strokeWidth={3}
                    />

                )}



                {deliveryPersonLocation && (hasPickedUp || hasAccepted) && (
                    <MapViewDirections
                        origin={originLocation}
                        destination={hasAccepted ? pickupLocation : deliveryLocation}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeColor="#2871F2"
                        strokeWidth={5}
                        onError={(err) => console.log("Error loading directions:", err)}
                    />
                )}

                {deliveryLocation && (
                    <Marker
                        coordinate={{
                            latitude: deliveryLocation.latitude,         // Pickup: Central Business District, Mumbai
                            longitude: deliveryLocation.longitude,
                        }}
                    >
                        <Image
                            source={require('../../assets/icons/my_pin.png')}
                            style={{ width: 30, height: 30 }}
                            resizeMode="contain"
                        />
                    </Marker>
                )}

                {pickupLocation && (
                    <Marker
                        coordinate={{
                            latitude: pickupLocation.latitude,         // Pickup: Central Business District, Mumbai
                            longitude: pickupLocation.longitude,
                        }}
                    >
                        <Image
                            source={require('../../assets/icons/store.png')}
                            style={{ width: 30, height: 30 }}
                            resizeMode="contain"
                        />

                    </Marker>
                )}

                {deliveryPersonLocation && (

                    <Marker
                        coordinate={{
                            latitude: deliveryPersonLocation.latitude,         // Pickup: Central Business District, Mumbai
                            longitude: deliveryPersonLocation.longitude,
                        }}
                    >
                        <Image
                            source={require('../../assets/icons/delivery.png')}
                            style={{ width: 30, height: 30 }}
                            resizeMode="contain"
                        />

                    </Marker>

                )}

                {!hasPickedUp && deliveryLocation && pickupLocation && (
                    <Polyline
                    coordinates={[
                        { latitude: pickupLocation.latitude, longitude: pickupLocation.longitude },
                        { latitude: deliveryLocation.latitude, longitude: deliveryLocation.longitude },
                      ]}
                        strokeColor={Blinkit_Colors.text}
                        strokeWidth={2}
                    />
                )}


            </MapView>
        </View>
    )
}
export default AgainLiveMap;

const styels = StyleSheet.create({

    //screenHeight * 0.3 or 0.35   means 30% and 35%
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: screenHeight * 0.35,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Blinkit_Colors.border,
        elevation: 2
    }
})