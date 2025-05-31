import React, { useRef } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';

const Test = () => {
  const ref = useRef(null); // Create a ref for the ScrollView
  
  useScrollToTop(ref); // Attach the ref to useScrollToTop
  
  return (
    <ScrollView ref={ref} style={styles.container}>
      {Array.from({ length: 50 }).map((_, index) => (
        <Text key={index} style={styles.item}>
          Item {index + 1}
        </Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Test;
