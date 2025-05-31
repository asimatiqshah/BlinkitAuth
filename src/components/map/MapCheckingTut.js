import Geolocation from "@react-native-community/geolocation";
import { getDistance } from "geolib";
import { useEffect, useState } from "react";
import { Alert, Button, PermissionsAndroid, StyleSheet, Text, View } from "react-native"
import MapView, { Marker, Polyline } from 'react-native-maps';

const MapCheckingTut = () => {
    // save the user location
    const [location, setLocation] = useState(null);
    const [source, setSource] = useState(null);
    const [destination, setDestination] = useState(null);
    const [isChoosingSource, setIsChoosingSource] = useState(false);
    const [isChoosingDestination, setIsChoosingDestination] = useState(false);

    const getUserCurrentLocation = () => {
        Geolocation.getCurrentPosition((position) => {
            console.log(position);
            setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        });
    }

    //handlePress
    const handlePress = (e) => {
        const Coordinates = e.nativeEvent.coordinate;
        console.log(Coordinates);
        if (isChoosingSource) {
            setSource(Coordinates);
            setIsChoosingSource(false);
        } else if (isChoosingDestination) {
            setDestination(Coordinates)
            setIsChoosingDestination(false);
        }
    }

    //showCoordinates
    const showCoordinates = () => {
        console.log(source, destination);
        if (source && destination) {

            //FOR CALCULATING DISTANCE
            const distance = getDistance(
                { latitude: source.latitude, longitude: source.longitude },
                { latitude: destination.latitude, longitude: destination.longitude }
            );
            Alert.alert(`Calculated distance between them ${distance} meters`)
        }else{
            Alert.alert(`Error please select source and destination`)
        }
    }

    const requestLocationPermission = async () => {
        try {

            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            console.log(granted);
            if (granted === 'granted') {
                console.log('You can use Geolocation');
                getUserCurrentLocation();
                return true;
            } else {
                console.log('You cannot use Geolocation');
                return false;
            }

        } catch (error) {
            return false;
        }
    }

    useEffect(() => {
        requestLocationPermission();
    }, [])

    return (
        <View style={styles.container}>
            {location && (
                <MapView
                    style={styles.map}
                    region={location}
                    showsUserLocation={true}
                    onPress={handlePress}
                // onRegionChangeComplete={(data) => console.log(data)}
                >
                    <Marker
                        coordinate={location}
                        title={"Testing"}
                        onPress={(data) => console.log(data.nativeEvent.coordinate)}
                    />

                    {source && (
                        <Marker
                            coordinate={source}
                            title={"Source"}
                            draggable={true}
                            pinColor="green"
                            onDragStart={() => console.log("i am draging")}
                            onDragEnd={(e) => {
                                console.log("not working");

                            }}
                        />
                    )}

                    {destination && (
                        <Marker
                            coordinate={destination}
                            title={"Destination"}
                            draggable={true}
                            pinColor="blue"
                            onDragEnd={(e) => {
                                console.log("not working");

                            }}
                        />
                    )}

                    {/* POLYLINE */}

                    {source && destination && (
                        <Polyline
                            coordinates={[source, destination]}
                            strokeColor="black"
                            strokeWidth={3}
                        />
                    )}

                </MapView>
            )}

            {/* BUTTONS */}
            <View style={styles.buttonContainer}>
                <View style={styles.buttonGroup}>

                    {
                        source ? (
                            <Button
                                title={"Clear..."}
                                onPress={() => setSource(null)}
                            />
                        ) : (
                            <Button
                                title={isChoosingSource ? 'Please Select Your Location' : 'Choose Source'}
                                onPress={() => setIsChoosingSource(true)}
                            />
                        )
                    }

                    {
                        destination ? (
                            <Button
                                title={"Clear..."}
                                onPress={() => setDestination(null)}
                            />
                        ) : (
                            <Button
                                title={isChoosingDestination ? 'Please Select Your Destination' : 'Choose Destination'}
                                onPress={() => setIsChoosingDestination(true)}
                            />
                        )
                    }


                </View>
                <Button title="Show Coordinates" onPress={showCoordinates} />
            </View>

        </View>
    )
}
export default MapCheckingTut;

//create our styling code:
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1, //the container will fill the whole screen.
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
});