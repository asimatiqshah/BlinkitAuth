import { Text, View } from "react-native";
import ViewCartBar from "../../components/ui/ViewCartBar";

const WithCart = (WrappedComponent) => {
    return (props) => {
        return (
            <>
                <WrappedComponent {...props} />
                <ViewCartBar />
            </>
        )
    }
}
export default WithCart;