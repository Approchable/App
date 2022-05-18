import React, { useState } from "react"
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
import { ColorSet, ImageSet, screenHeight, screenWidth } from "../config/Constant"

const RequestHangout = (props) => {
    const { headline, description, source, name } = props
    return (
        <View>
            <View style={styles.requestTopContainer}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 5,
                }}>
                    <Text style={{
                        fontSize: 18,
                        lineHeight: 24,
                        fontWeight: '600',
                    }}>
                        {headline}
                    </Text>
                    <Image style={{
                        width: 20,
                        height: 20,
                        resizeMode: 'contain'
                    }} source={ImageSet.ArrowRight} />
                </View>
                <Text style={{
                    fontSize: 16,
                    lineHeight: 20,
                    fontWeight: '400',
                    color: ColorSet.dimGray,
                }}>
                    {description}
                </Text>
            </View>
            <View style={styles.requestMainContainer}>
                <Image
                    style={styles.userImage}
                    source={source}
                />
                <View>
                    <Text style={styles.userNameApproachableText}>
                        {name} is Approachable!
                    </Text>
                    <Text style={styles.approachableConnectText}>
                        Do you want to connect?
                    </Text>
                </View>
            </View>
            <View style={styles.acceptRejectBtnContainer}>
                <TouchableOpacity activeOpacity={0.5}>
                    <Image
                        style={[styles.iconButton]}
                        source={ImageSet.rejected}
                    />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5}>
                    <Image
                        style={[styles.iconButton]}
                        source={ImageSet.accepted}
                    />
                </TouchableOpacity>
            </View>
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
        paddingVertical: 20
    },
    requestMainContainer: {
        height: screenHeight.height10,
        backgroundColor: '#44BFBA33',
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        marginHorizontal: 20,
        marginBottom: 7,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
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
        lineHeight: 24,
        fontWeight: '400',
        color: ColorSet.dimGray
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
})

export default RequestHangout