import { useEffect, useState } from "react";
import { ActivityIndicator, Button, Image, ScrollView, StyleSheet, Text, View } from "react-native"
import CustomHeader from "../../components/ui/CustomHeader";
import Sidebar from "./Sidebar";
import { getAllCategories, productsByCategory } from "../../services/productService";
import CategoryRelProducts from "./CategoryRelProducts";
import { fonts_sizes } from "../../utills/Constants";
import StepperBtn from "../../components/ui/StepperBtn";
import { useAuthStore } from "../../state/authStore";
import WithCart from "../cart/WithCart";



const ProductCategories = () => {
    const [categories, setCategories] = useState();
    const [categoriesLoading, setCategoriesLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState();
    const [products, setProducts] = useState();
    const [productsLoading, setProductsLoading] = useState(false);


    //FETCHING DATA FROM API
    const fetchCategories = async () => {
        try {
            setCategoriesLoading(true);
            const dataApi = await getAllCategories();
            setCategories(dataApi);
            if (dataApi && dataApi.length > 0) {
                setSelectedCategory(dataApi[0]);
            }
        } catch (error) {
            console.log("error fetching categories", error);
        } finally {
            setCategoriesLoading(false);
        }
    }

    //FETCHING PRODUCTS RELATED TO CATEGORY
    const fetchProductRelCategory = async () => {
        try {
            setProductsLoading(true);
            //ISSUE WITH THE CATEGORY YOU ARE FETCHING ARE NULL IT HAS NO PRODUCTS []
            const data = await productsByCategory(selectedCategory);
            setProducts(data);
        } catch (error) {
            console.log("error fetching products", error);
        }
        finally {
            setProductsLoading(false);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    useEffect(() => {
        fetchProductRelCategory();
    }, [selectedCategory]);
    


    return (
        <View style={styles.mainContainer}>
            {/* CUSTOM HEADER HAVING BACK BUTTON FACILITY */}
            <CustomHeader title={selectedCategory?.name || 'Categories'} />
            {/* SIDEBAR */}
            <View style={styles.subContainer}>
                {
                    categoriesLoading ? (<ActivityIndicator size="small" color="#0000ff" />) : (
                        <Sidebar
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onCategoryPress={
                                (category) => {
                                    setSelectedCategory(category);
                                }
                            }
                        />
                    )
                }
                <View style={styles.productContainer}>
                    <ScrollView style={{ height: '100%' }}
                        contentContainerStyle={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "space-between", padding: 5 }}>
                        {
                            //1.checking product loaded
                            //2.checking product length and return to Handles Empty Lists
                            productsLoading ? (<ActivityIndicator size="small" color="#0000ff" />) : (
                                products?.length > 0 ? (
                                    products?.map((item, index) => {
                                        return (
                                            <View style={styles.product} key={index}>
                                                <View style={styles.prodImageContaner}>
                                                    <Image
                                                        style={styles.productImage}
                                                        source={{ uri: item.image }}
                                                    />
                                                </View>
                                                <Text style={styles.txtProdHeading}>{item.name}</Text>
                                                <Text style={styles.txtProdQuantity}>{item.quantity}</Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ flex: 1 }}>
                                                        <Text style={styles.txtPrice}>{`$${item.price}`}</Text>
                                                        <Text style={styles.txtDiscountPrice}>{`$${item.discountPrice}`}</Text>
                                                    </View>
                                                    <StepperBtn productId={item._id} name={item.name} productWeight={item.quantity} productPrice={item.price} image={item.image} />
                                                </View>
                                            </View>
                                        )
                                    })
                                ) : (
                                    <Text>No items available</Text>
                                )
                            )
                        }
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

// Wrap ProductCategories with WithCart HOC
const ProductCategoriesWithCart = WithCart(ProductCategories);

export default ProductCategoriesWithCart;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    subContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%'
    },
    productContainer: {
        // flexDirection: 'row',
        // flexWrap: "wrap",
        // justifyContent: "space-between",
        width: '100%',
        // padding: 8,
        flex: 1
    },
    product: {
        width: "48%",
        backgroundColor: "white",
        padding: 10,
        marginBottom: 10, // Adds spacing between rows
        borderRadius: 5, // Optional: Adds rounded corners for a better look
        borderColor: '#eee',
        borderWidth: 1,
    },
    productImage: {
        width: '100%',
        height: '100%'
    },
    prodImageContaner: {
        width: '100%',
        height: 80
    },
    txtProdHeading: {
        fontFamily: 'Okra-Bold',
        fontSize: 14,
        lineHeight: 16,
        marginTop: 10,
        marginBottom: 5
    },
    txtProdQuantity: {
        fontFamily: 'Okra-MediumLight',
        fontSize: fonts_sizes.small,
        color: 'green',
        marginBottom: 10
    },
    txtDiscountPrice: {
        fontFamily: 'Okra-MediumLight',
        fontSize: 14,
        color: 'grey',
        textDecorationLine: 'line-through'
    },
    txtPrice: {
        fontFamily: 'Okra-MediumLight',
        color: 'black',
        fontSize: fonts_sizes.small,
    }
})