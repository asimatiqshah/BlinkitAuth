export const handleFitToPath = (
    mapRef, 
    deliveryLocation, 
    pickupLocation, 
    hasPickedUp, 
    hasAccepted, 
    deliveryPersonLocation
  ) => {
    if (mapRef && deliveryLocation && pickupLocation) {
      mapRef.fitToCoordinates(
        [
          hasAccepted ? deliveryPersonLocation : deliveryLocation,
          hasPickedUp ? deliveryPersonLocation : pickupLocation
        ], 
        {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true
        }
      );
    }
  };

  export const camera = {
    center: {
        latitude: 12.936739,  // Example latitude
        longitude: 77.615947, // Example longitude
    },
    pitch: 0,
    heading: 0,
    altitude: 1000, // Adjust the altitude if needed
    zoom: 15,  // Increase this value for a higher zoom level (default is 10)
};
  
  