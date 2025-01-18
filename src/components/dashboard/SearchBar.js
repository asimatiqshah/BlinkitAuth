import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import RollingBar from "react-native-rolling-bar";
import Icon from 'react-native-vector-icons/dist/Ionicons';

const SearchBar = () => {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8}>
            <Icon name="search-outline" size={20} color="#00000" />
            <RollingBar interval={1000} customStyle={styles.textContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Apple"
                    placeholderTextColor="#98989C"
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Mango"
                    placeholderTextColor="#98989C"
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Orange"
                    placeholderTextColor="#98989C"
                />
            </RollingBar>
            <View style={styles.divider} />
            <Icon style={{paddingLeft:8}} name="mic-circle" size={20} color="#00000" />
        </TouchableOpacity>
    )
}
export default SearchBar;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'green',
        marginHorizontal: 10,
        borderRadius: 10,
        borderWidth: 0.6,
        borderColor: '#808088',
        backgroundColor: '#F3F4F7',
        marginVertical:10
    },
    textInput: {

    },
    textContainer: {
        width: '90%',
        height: 50,
        paddingLeft: 10,
    },
    divider: {
        width: 1,
        height: 25,
        backgroundColor: '#ddd'
    }
})