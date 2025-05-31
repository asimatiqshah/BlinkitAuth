import { apiAxios } from "./apiinterceptor"

export const createOrder = async(items,totalPrice)=>{

    try {
        const response = await apiAxios.post('/order',{
            items:items ,
            branch: "674729cf98218cf967e4d9c4",
            totalPrice: totalPrice
          });
          
        return response.data

    } catch (error) {
        console.log("Error in creating order",error.response);
        return null;
    }
}

export const getOrderById = async (orderId)=>{
    try {
        const response = await apiAxios.get(`/order/${orderId}`);
        return response.data
        
    } catch (error) {
        console.log("Error in Getting Order By ID",error.response);
        return null;
    }
}

export const fetchCustomerOrders = async (userId)=>{
    try {
        const response = await apiAxios(`/order?customerId=${userId}`);
        return response.data;
    } catch (error) {
        console.log("Fetch Customer Order Error",error);
        return null;
    }
}

export const fetchOrders = async ({ status, userId, branchId }) => {
    try {
        let uri = status === 'available'
            ? `/order?status=${status}&branchId=${branchId}`
            : `/order?branchId=${branchId}&deliveryPartnerId=${userId}&status=${status}`;

        const response = await apiAxios.get(uri);
        return response.data;
    } catch (error) {
        console.error('Fetch Delivery Order Error:', error);
        return null;
    }
};


export const confirmOrder = async (id, location) => {
    try {
        console.log("i am in OrderService");
        
        const response = await apiAxios.post(`/order/${id}/confirm`, {
            deliveryPersonLocation: location,
        });
        return response.data;
    } catch (error) {
        console.log("confirmOrder Error", error);
        return null;
    }
};

export const sendLiveOrderUpdates = async (id, location, status) => {
    try {
        const response = await apiAxios.patch(`/order/${id}/status`, {
            deliveryPersonLocation: location,
            status
        });
        return response.data;
    } catch (error) {
        console.log("sendLiveOrderUpdates Error", error);
        return null;
    }
};