import { Text, View } from "react-native";
import Icon from 'react-native-vector-icons/dist/Ionicons';
const WalletItem=({icon,label})=>{
    
    return(
        <View style={{alignItems:'center'}}>
            <Icon name={icon} size={18} color="#00000" />
            <Text>{label}</Text>
        </View>
    )
}
export default WalletItem;
