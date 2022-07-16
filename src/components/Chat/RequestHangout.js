import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import {
  ColorSet,
  ImageSet,
  screenHeight,
  screenWidth,
} from '../config/Constant'

const RequestHangout = (props) => {
  const {
    headline,
    description,
    source,
    name,
    comment,
    screeningQuestion,
    screeningAnswer,
    accepted,
    rejected,
    onAccepted,
    onRejected,
  } = props
  return (
    <View>
      {}
      <View style={styles.requestTopContainer}>
        <View style={styles.topContainerMain}>
          <Text style={styles.headline}>{headline}</Text>
          <Image style={styles.icon} source={ImageSet.ArrowRight} />
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>
      {!comment && !screeningAnswer ? (
        <View style={styles.requestMainContainer}>
          {accepted && (
            <View style={styles.tick}>
              <Image style={styles.icon} source={ImageSet.tick} />
            </View>
          )}
          <Image style={styles.userImage} source={source} />
          <View>
            <Text style={styles.userNameApproachableText}>
              {name} is Approachable!
            </Text>
            <Text style={styles.approachableConnectText}>
              Do you want to connect?
            </Text>
          </View>
        </View>
      ) : (
        <View
          style={[
            {
              ...styles.requestMainContainerWithComment,
              backgroundColor: rejected
                ? ColorSet.chatLeftPopupGray
                : ColorSet.lightGreen,
            },
          ]}>
          {accepted && (
            <View style={styles.tick}>
              <Image style={styles.icon} source={ImageSet.tick} />
            </View>
          )}
          <View style = {{ flexDirection: 'row' , justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.userNameApproachableText}>
                {screeningQuestion
                  ? `${name} answered your question, and is approachable!`
                  : `${name} is Approachable!`}
              </Text>
              <Text style={styles.approachableConnectText}>
                {screeningQuestion
                  ? screeningQuestion
                  : 'Do you want to connect'}
              </Text>
            </View>
            {
              rejected == false && (
                <Image style={{ width: 20, height: 20 }} source={ImageSet.X} />
              )
            }
           
          </View>
          <View style={styles.rightMessageView}>
            <Image style={styles.userImage} source={source} />
            <View style={styles.rightMessageText}>
              <Text style={styles.messagesText}>
                {comment ? comment : screeningAnswer}
              </Text>
              <Text style={styles.dateLabelText}>{'12m'}</Text>
            </View>
          </View>
        </View>
      )}
      {!rejected ? (
        !accepted ? (
          <View style={styles.acceptRejectBtnContainer}>
            <TouchableOpacity onPress={onRejected} activeOpacity={0.5}>
              <Image style={[styles.iconButton]} source={ImageSet.rejected} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onAccepted} activeOpacity={0.5}>
              <Image style={[styles.iconButton]} source={ImageSet.accepted} />
            </TouchableOpacity>
          </View>
        ) : null
      ) : null}
    </View>
  )
}
const styles = StyleSheet.create({
  requestTopContainer: {
    borderColor: '#ECEEF2',
    borderWidth: 1,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    marginHorizontal: 20,
    marginBottom: 7,
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  tick: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  topContainerMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  headline: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
    color: ColorSet.dimGray,
  },
  requestMainContainer: {
    // height: screenHeight.height10,
    backgroundColor: '#44BFBA33',
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    marginHorizontal: 20,
    marginBottom: 7,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  requestMainContainerWithComment: {
    backgroundColor: '#44BFBA33',
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    marginHorizontal: 20,
    marginBottom: 7,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  userImage: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
    borderRadius: 150,
    marginRight: 10,
  },
  userNameApproachableText: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
    color: ColorSet.dimGray,
  },
  approachableConnectText: {
    color: ColorSet.textBlack,
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 24,
    fontFamily: 'Poppins_700Bold',
    fontStyle: 'normal',
  },
  acceptRejectBtnContainer: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  iconButton: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
  },
  rightMessageView: {
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    marginVertical: 5,
  },
  rightMessageText: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ColorSet.white,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    minWidth: screenWidth.width10,
    maxWidth: screenWidth.width60,
  },
  dateLabelText: {
    color: ColorSet.gray,
    fontSize: 10,
    lineHeight: 18,
    fontFamily: 'Poppins_400Regular',
    fontStyle: 'normal',
    alignSelf: 'flex-end',
    marginLeft: 10,
  },
  messagesText: {
    color: ColorSet.textBlack,
    fontSize: 12,
    lineHeight: 20,
    fontFamily: 'Poppins_400Regular',
    fontStyle: 'normal',
    minWidth: screenWidth.width5,
    maxWidth: screenWidth.width65,
  },
})

export default RequestHangout
