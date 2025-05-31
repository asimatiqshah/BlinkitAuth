import { Text, View } from "react-native"
import MapView, { Marker, Polyline } from "react-native-maps";
import { customMapStyle } from "../../utills/CustomMap";
import { camera } from "./mapUtils";
import { getPoints } from "../../utills/getPoints";
import { Blinkit_Colors } from "../../utills/Constants";
import MapViewDirections from "react-native-maps-directions";

const MapViewComponent = ({ mapRef, setMapRef, hasAccepted, deliveryLocation, pickupLocation, deliveryPersonLocation, hasPickedUp }) => {

    console.log("In MapViewCompooent");
    console.log(deliveryPersonLocation);
    

    const GOOGLE_MAPS_APIKEY = 'AIzaSyApFRhZzEwplfzr1SZGoJ-JofIaonZJkZk';
    const defaultLocation = { latitude: 12.936739, longitude: 77.615947 };
    const originLocation = deliveryPersonLocation || defaultLocation;

    return (
        <MapView
            ref={setMapRef}
            style={{ flex: 1 }}
            provider="google"
            camera={camera}
            customMapStyle={customMapStyle}
            showsUserLocation={true}
            userLocationCalloutEnabled={true}
            userLocationPriority="high"
            showsTraffic={false}
            pitchEnabled={false}
            followsUserLocation={true}
            showsCompass={true}
            showsBuildings={false}
            showsIndoors={false}
            showsScale={false}
            showsIndoorLevelPicker={false}
        >

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
                    image={require('../../assets/icons/my_pin.png')}
                    coordinate={deliveryLocation}
                    style={{ height: 20, width: 20 }}
                />
            )}

            {pickupLocation && (
                <Marker
                    image={require('../../assets/icons/store.png')}
                    coordinate={pickupLocation}
                    style={{ height: 20, width: 20 }}
                />
            )}

            {deliveryPersonLocation && (
                <Marker
                    image={require('../../assets/icons/delivery.png')}
                    coordinate={deliveryPersonLocation}
                    style={{
                        position: 'absolute',
                        zIndex: 99,
                        height: 20,
                        width: 20,
                    }}
                />
            )}


            {!hasPickedUp && deliveryLocation && pickupLocation && (
                <Polyline
                    coordinates={getPoints([pickupLocation, deliveryLocation])}
                    strokeColor={Blinkit_Colors.text}
                    strokeWidth={2}
                    geodesic={true}
                    lineDashPattern={[12, 10]}
                />
            )}


        </MapView>
    )
}
export default MapViewComponent;