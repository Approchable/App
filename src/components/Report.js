import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {ImageSet} from './config/Constant';
import React from 'react';

// Report UI that will link to the report page
export  function ExploreReport(props) {
  const {objectToReport , moreStyles} = props;
  return (
    <TouchableOpacity
      onPress={() => {
        console.log(moreStyles);
      }}>
      <Image style={{...styles.icon , ...moreStyles}} source={ImageSet.threeDots} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
});