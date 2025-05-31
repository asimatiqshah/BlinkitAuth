import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { screenHeight } from "../../utills/Scalling";
import { Blinkit_Colors } from "../../utills/Constants";
import { useMapRefStore } from "../../state/mapStore";
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { handleFitToPath } from "./mapUtils";
import MapViewComponent from "./MapViewComponent";

const LiveMap = ({ deliveryLocation, pickupLocation, deliveryPersonLocation, hasAccepted, hasPickedUp }) => {
    const { mapRef, setMapRef } = useMapRefStore();

    return (
        <View style={styles.container}>

            <MapViewComponent
                mapRef={mapRef}
                setMapRef={setMapRef}
                hasAccepted={hasAccepted}
                deliveryLocation={deliveryLocation}
                pickupLocation={pickupLocation}
                deliveryPersonLocation={deliveryPersonLocation}
                hasPickedUp={hasPickedUp}
            />

            <TouchableOpacity
                style={styles.fitButton}
                onPress={() => {
                    handleFitToPath(
                        mapRef,
                        deliveryLocation,
                        pickupLocation,
                        hasPickedUp,
                        hasAccepted,
                        deliveryPersonLocation,
                    );
                }}
            >
                <Icon name="target" size={14} color={Blinkit_Colors.text} />
            </TouchableOpacity>
        </View>
    )
}

export default LiveMap;

const styles = StyleSheet.create({
    container: {
        height: screenHeight * 0.35,
        width: '100%',
        borderRadius: 15,
        backgroundColor: '#fff',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Blinkit_Colors.border,
        position: 'relative',
    },
    fitButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        padding: 5,
        backgroundColor: '#fff',
        borderWidth: 0.8,
        borderColor: Blinkit_Colors.border,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowColor: 'black',
        elevation: 5,
        borderRadius: 35,
    },
});