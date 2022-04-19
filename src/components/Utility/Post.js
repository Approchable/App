import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function Post({userName, title, description}) {
  return (
    <View style={styles.PostView}>
      <PostUserName userName={userName} />
      <PostTitle title={title} />
      <PostDescription description={description} />
      <View
        style={{
          borderBottomColor: '#696969',
          borderBottomWidth: 0.3,
        }}
      />
    </View>
  );
}

function PostDescription({description}) {
  return (
    <View style={styles.PostDescriptionView}>
      <Text style={styles.PostDescriptionText}>{description}</Text>
    </View>
  );
}
function PostTitle({title}) {
  return (
    <View style={styles.PostTitleView}>
      <Text style={styles.PostTitleText}>{title}</Text>
    </View>
  );
}
function PostUserName({userName}) {
  return (
    <View style={styles.PostUserNameView}>
      <Text style={styles.PostUserNameText}>@{userName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  PostView: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 8,
  },
  PostUserNameText: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 24,
    color: '#030E01',
    fontFamily: 'Poppins',
  },
  PostUserNameView: {},
  PostTitleView: {},
  PostTitleText: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 24,
    color: '#030E01',
    fontFamily: 'Poppins',
  },
  PostDescriptionView: {},
  PostDescriptionText: {
    fontSize: 14,
    lineHeight: 24,
    color: '#030E01',
    fontFamily: 'Poppins',
  },
});
