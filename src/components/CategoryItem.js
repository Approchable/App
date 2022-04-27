import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Animated,
} from 'react-native';

import {useCallback, useState, useContext, useEffect} from 'react';
import {CategorieContext} from '../..//src/context/CategorieContext';
function CategoryItem({content, position, onPress, width, moreStyles}) {
  const [categories, setCategories] = useContext(CategorieContext);
  const [enabled, setEnabled] = useState(false);
  const [size, onLayout] = useComponentSize();

  // hollow ? '#44BFBA' : 'white',
  const onPressHandler = () => {
    onPress() 
    setEnabled(!enabled);
  };

  const handleCategories = () => {
    if (enabled) {
      if (!categories.includes(content)) {
        setCategories([...categories, content]);
      }
    } else {
      setCategories(categories.filter(item => item !== content));
    }
  };

  useEffect(() => {
    handleCategories();
  }, [enabled]);
  return (
    <TouchableOpacity
      onPress={() => {
        onPressHandler();
      }}>
      <View
        style={
          enabled
            ? {
                ...styles.selectedContainer,
                width: width,
                height: width,
                ...moreStyles,
              }
            : {
                ...styles.unSelectedContainer,
                width: width,
                height: width,
                ...moreStyles,
              }
        }
        onLayout={onLayout}>
        <Text style={styles.unselectedText}> {content} </Text>
      </View>
    </TouchableOpacity>
  );
}

const useComponentSize = () => {
  const [size, setSize] = useState(null);

  const onLayout = useCallback(event => {
    const {width, height} = event.nativeEvent.layout;
    setSize({width, height});
  }, []);

  return [size, onLayout];
};

const styles = StyleSheet.create({
  selectedContainer: {
    height: 100,
    width: 100,
    backgroundColor: 'rgba(68, 191, 186, 0.3)',
    justifyContent: 'center',
    margin: 8,
    borderRadius: 60,
  },
  unSelectedContainer: {
    height: 100,
    width: 100,
    backgroundColor: '#ECEEF2',

    justifyContent: 'center',
    margin: 8,
    borderRadius: 60,
  },
  selected: {},
  selectedText: {
    color: 'rgba(3, 14, 1, 1)',
    textAlign: 'center',
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 24,
    fontFamily: 'Poppins_400Regular',
  },
  unselectedText: {
    color: 'rgba(105, 105, 105, 1)',
    textAlign: 'center',
    color: '#696969',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 24,
    fontFamily: 'Poppins_400Regular',
  },
});
export default CategoryItem;
