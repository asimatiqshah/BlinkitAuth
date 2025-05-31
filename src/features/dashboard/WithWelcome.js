import { Text, View } from "react-native";

const WithWelcome = (WrappedComponent)=>{
    // THIS IS OUR HOC(Higher Order Component which take Component as an Argument)
    // WrapperComponent === UserComponnet   --> in this particular case
    return (props)=> {        
        return(
            <View style={{flex:1,backgroundColor:'white'}}>
                <Text>Welcome to the app!</Text>
                <WrappedComponent {...props} />
            </View>
        )
    }
}
export default WithWelcome;