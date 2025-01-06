// import {
//     CollapsibleContainer,
//     CollapsibleFlatList,
//     CollapsibleScrollView,
//   } from '@r0b0t3d/react-native-collapsible';
import { CollapsibleContainer, CollapsibleHeaderContainer, CollapsibleScrollView, StickyView, useCollapsibleContext, withCollapsibleContext } from '@r0b0t3d/react-native-collapsible';
import { useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

const BasicExample = () => {

    const {
        collapse,   // <-- Collapse header
        expand,     // <-- Expand header
        scrollY,    // <-- Animated scroll position. In case you need to do some animation in your header or somewhere else
    } = useCollapsibleContext();

    //checking
    const showVal = () => {
        console.log(scrollY.value);
    }
    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <CollapsibleContainer>
                <CollapsibleHeaderContainer>
                    <View>
                        <TextInput>Scrolling</TextInput>
                        <TextInput>Scrolling</TextInput>
                        <TextInput>Scrolling</TextInput>
                        <TextInput>Scrolling</TextInput>
                    </View>
                    <View style={{ backgroundColor: 'red' }}>
                        <TextInput>Expand/Collapse</TextInput>
                    </View>
                    <StickyView>
                        <View style={{ backgroundColor: 'green' }}>
                            <TextInput>Alan Walker</TextInput>
                        </View>
                    </StickyView>
                </CollapsibleHeaderContainer>
                <CollapsibleScrollView>
                    <View style={styles.box}>
                        <TextInput>Hey! It's work</TextInput>
                    </View>
                    <View style={styles.box}>
                        <TextInput>Hey! It's work</TextInput>
                    </View>
                    <View style={styles.box}>
                        <TextInput>Hey! It's work</TextInput>
                    </View>
                    <View>
                        <Button title='Press Me' onPress={showVal} />
                    </View>
                    <View style={styles.box}>
                        <TextInput>Hey! It's work</TextInput>
                        <Button title='Press Me' onPress={showVal} />
                    </View>
                    <View style={styles.box}>
                        <TextInput>Hey! It's work</TextInput>
                        <Button title='Press Me' onPress={showVal} />
                    </View>
                    <View style={styles.box}>
                        <TextInput>Hey! It's work</TextInput>
                    </View>
                    <View style={styles.box}>
                        <TextInput>Hey! It's work</TextInput>
                    </View>
                    <View style={styles.box}>
                        <TextInput>Hey! It's work</TextInput>
                    </View>
                    <View style={styles.box}>
                        <TextInput>Hey! It's work</TextInput>
                    </View>
                    <View style={styles.box}>
                        <TextInput>Hey! It's work</TextInput>
                    </View>
                    <View style={styles.box}>
                        <TextInput>Hey! It's work</TextInput>
                    </View>
                    <View style={styles.box}>
                        <TextInput>Hey! It's work</TextInput>
                        <Button title='Press Me' onPress={showVal} />
                    </View>
                    <View style={styles.box}>
                        <TextInput>Hey! It's work</TextInput>
                    </View>
                    <View style={styles.box}>
                        <TextInput>Hey! It's work</TextInput>
                    </View>
                    <View style={styles.box}>
                        <TextInput>Hey! It's work</TextInput>
                    </View>
                    <View style={styles.box}>
                        <TextInput>Hey! It's work</TextInput>
                        <Button title='Press Me' onPress={showVal} />
                    </View>
                    <View style={styles.box}>
                        <TextInput>Hey! It's work</TextInput>
                    </View>
                    <View style={styles.box}>
                        <TextInput>Hey! It's work</TextInput>
                    </View>
                    <View style={styles.box}>
                        <TextInput>Hey! It's work</TextInput>
                    </View>
                </CollapsibleScrollView>
            </CollapsibleContainer>
        </View>
    )
}
export default withCollapsibleContext(BasicExample);

const styles = StyleSheet.create({
    box: {
        borderWidth: 2,          // Adds border width
        borderColor: 'blue',
        marginVertical: 10,
        height: 50
    }
})