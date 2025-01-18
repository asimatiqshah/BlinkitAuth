// Importing necessary components from React Native
import * as React from 'react'; // React itself
import { StyleSheet, View, Text, Image } from 'react-native'; // Components for UI layout, styling, and text
import RollingBar from 'react-native-rolling-bar'; // Third-party component for rolling animation

// Main component renamed to RollingBarExample
const RollingBarExample = () => {
    return (
        // This is the container view that holds all UI components
        <View style={{flex:1,alignItems:'center'}}>
            {/* RollingBar is a custom component with animation */}
            <RollingBar interval={1000}>
                <Text style={{backgroundColor:'red'}}>Banana</Text>
               <Text>Network Image</Text>
               <Text>Apple Juice</Text>
            </RollingBar>
        </View>
    );
}

// Style definitions for the app
const styles = StyleSheet.create({
    // Main container to center the content
    container: {
        flex: 1, // Make the container take up the full screen
        alignItems: 'center', // Center all items horizontally
        justifyContent: 'center', // Center all items vertically
    },
    // Style for the section title text
    sectionTitle: {
        fontSize: 24, // Font size of the title
        fontWeight: '600', // Medium weight for the title text
        color: '#444', // Dark grey color for the text
    },
});

// Exporting the RollingBarExample component at the bottom
export default RollingBarExample;
