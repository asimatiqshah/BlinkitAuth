import { useEffect } from "react";
import { Text, View } from "react-native";
import { refetchUser } from "../../services/authServices";
import NoticeAnimation from "../../components/dashboard/NoticeAnimation";

const ProductDashboard = () => {
    //Height Explanation
    //////////////////////////

    //NOTICE_HEIGHT = -(NoticeHeight + 12);
    //where NoticeHeight is screenHeight * 0.7

    //eg: if NoticeHeight is 800 so 
    // NoticeHeight = 800 * 0.7;  // This would be 560 pixels. 70% percent of device
    // Result   NOTICE_HEIGHT = -(560 + 12);  // This would be -572 pixels.

    return (
        <NoticeAnimation>
            <>
                <View>
                    <Text>ProductDashboard</Text>
                </View>
            </>
        </NoticeAnimation>
    )
}
export default ProductDashboard;