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
import { ColorSet, ImageSet, screenWidth } from "../config/Constant"

const ChatHeader = (props) => {
    // const [isSendMsgEnabled, setIsSendMsgEnabled] = useState(false)
    const { isSendMsgEnabled, onBackButton, name } = props

    return (

        <View style={[styles.topBar]}>
            <View style={[styles.center]}>
                <TouchableOpacity onPress={onBackButton}
                >
                    <Image style={[styles.backButton]} source={ImageSet.back} />
                </TouchableOpacity>
                <Text style={[styles.regularText]}>
                    {name && name}
                </Text>
            </View>
            <View style={[styles.leftIcons, { justifyContent: isSendMsgEnabled ? 'flex-end' : 'space-between', }]}>
                {!isSendMsgEnabled
                    &&
                    <>
                        <TouchableOpacity //onPress={onBackButton}
                        >
                            <Image style={[styles.icon]} source={ImageSet.phone} />
                        </TouchableOpacity>
                        <TouchableOpacity //onPress={onBackButton}
                        >
                            <Image style={[styles.icon]} source={ImageSet.camera} />
                        </TouchableOpacity>
                    </>
                }
                <TouchableOpacity //onPress={onBackButton}
                >
                    <Image style={[styles.icon]} source={ImageSet.warning} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    topBar: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    center: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    spaceBetween: {
        justifyContent: 'space-between',
    },
    flexEnd: {
        alignSelf: 'flex-end',
    },
    centerJustify: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        width: screenWidth.width30,
    },
    regularText: {
        color: ColorSet.textBlack,
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 24,
        fontFamily: 'Poppins_400Regular',
        fontStyle: 'normal',
        marginLeft: 10,
    },
    backButton: {
        width: 45,
        height: 45,
        resizeMode: 'contain',
    },
    icon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
})


export default ChatHeader