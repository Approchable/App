import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NormalButton} from '../../components/Buttons';
import {NaviagteOutOfCreate} from '../../store/actions';
import {useDispatch} from 'react-redux';
import {HeaderText, RegularText, RegularBoldText} from '../../components/Texts';
import {NormalTextField} from '../../components/TextField';
import AppHeader from '../../components/Utility/AppHeader';
import CategoryItem from '../../components/CategoryItem';

export default function CreatePost1({navigation}) {

  const dispatch = useDispatch();
  const [headline, setHeadline] = useState(null);
  const [buttonActive, setButtonActive] = useState(false);
  const [selectedInterest, setSelectedInteres] = useState([]);

  const interests = [
    'adventure & exploration',
    'arts & culture',
    'career & business',
    'creativity',
    'entertainment',
    'food & drink',
    'health & fitness',
    'night out',
    'outdoors',
    'pets & animals',
    'religion & spirituality',
    'studying & co-work',
    'sports & recreation',
    'technology & science',
  ];

  const handlePressedCategories = () => {};

  const _checkHeadline = () => {
    if (
      (headline !== null || headline !== undefined || headline !== '') &&
      selectedInterest.length > 0
    ) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  };

  useEffect(() => {
    _checkHeadline();
  });

  const handleSelectingItems = item => {
    console.log('selectedInterestes', selectedInterest);
    if (selectedInterest.includes(item)) {
      //remove item from selectedInterestes
      const result = selectedInterest.filter(word => word !== item);

      setSelectedInteres(result);
    } else {
      //add item to selectedInterestes
      setSelectedInteres([...selectedInterest, item]);
    }

    _checkHeadline();
  };

  const width = (Dimensions.get('window').width - 36) / 3.5;

  return (
    <ScrollView style={styles.container}>
      <View style={{...styles.container}}>
        <View style={{marginHorizontal: 16, flex: 0.5, marginTop: 40}}>
          <HeaderText content="What do you want to do right now?" />
          <RegularBoldText content="Headline" />
          <NormalTextField
            placeholder="e.g. Visit the Satatue of Liberty (Required)"
            moreStyles={{marginTop: -28}}
            onChangeText={text => setHeadline(text)}
          />

          <RegularBoldText
            content="Which categories does this fall into?"
            moreStyles={{marginTop: 20}}
          />
          <RegularText
            content="This helps us connect you with the right people."
            moreStyles={{marginTop: -30, fontSize: 14}}
          />

          <View
            style={{flexWrap: 'wrap', flexDirection: 'row', marginLeft: -5}}>
            {interests.map((item, index) => (
              <CategoryItem
                content={item}
                width={width}
                onPress={() => handleSelectingItems(item)}
                moreStyles={{
                  borderRadius: 5,
                  height: 50,
                  margin: 5,
                  width: null,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: '#E5E5E5',
                }}
              />
            ))}
          </View>
        </View>

        <View
          style={{
            flex: 1,
            marginHorizontal: 16,
            justifyContent: 'flex-end',
            marginBottom: 20,
            marginTop: 40,
          }}>
          <NormalButton
            text="Next"
            onPress={() =>
              buttonActive
                ? navigation.navigate('CreatePost2', {
                    headline: headline,
                  })
                : null
            }
            inActive={buttonActive}
            hollow
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
