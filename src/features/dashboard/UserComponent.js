import { Text, View } from "react-native"

const UserComponent = (props)=>{
    console.log(props.name);
    
    return(
        <View>
            <Text>Hello {props.name}!</Text>
        </View>
    )
}

export default UserComponent;