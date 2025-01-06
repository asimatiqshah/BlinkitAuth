import {Image, StyleSheet, Text, View} from 'react-native';
import {imageData} from '../../utills/dummyData';
import React, {useMemo} from 'react';
import {screenWidth} from '../../utills/Scalling';
import AutoScroll from '@homielab/react-native-auto-scroll';

const ProductSlider = () => {
  //split array of products image into 4 sub arrays
  const subArraysRows = useMemo(() => {
    let result = [];
    for (let i = 0; i < imageData.length; i += 4) {
      //with the help of slice break into sub array
      let x = imageData.slice(i, i + 4);
      result.push(x);
    }
    //return result array to function
    return result;
  });

  return (
    <AutoScroll endPaddingWidth={0} >
      <View>
        {subArraysRows.map((item, index) => (
          <MemoisedRow row={item} key={index} />
        ))}
      </View>
    </AutoScroll>
  );
};
export default ProductSlider;

//inner component
const row = ({row}) => {
  //Remember => props row is an array
  return (
    <View style={Syles.row}>
      {row.map((item, index) => (
        <View style={Syles.innerRowContainer} key={index} >
          <Image style={Syles.singleImage} source={item} />
        </View>
      ))}
    </View>
  );
};

const MemoisedRow = React.memo(row);

const Syles = StyleSheet.create({
  innerRowContainer: {
    width: screenWidth * 0.26,
    height: screenWidth * 0.26,
    backgroundColor: '#e9f7f8',
    borderRadius: 25,
    marginBottom: 20,
  },
  singleImage: {
    width: '100%',
    height: '100%',
  },
  row:{
    flexDirection:'row',
  }
});
