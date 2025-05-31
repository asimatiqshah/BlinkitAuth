import { Button, Text, View } from "react-native"

const CategoryRelProducts=()=>{
    return(
        <View style={{backgroundColor:'white',height:120,padding:10,width:'40%',margin:5}}>
            <Text>Onion(Eerulli)</Text>
            <Text>1kg</Text>
            <View>
                <Text>$41</Text>
                <Button title="1" />
            </View>
        </View>
    )
}
export default CategoryRelProducts;