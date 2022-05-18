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

const ChatBox = (props) => {
    const { isSendMsgEnabled, onChangeText, isMessage, onClickSend, } = props
    const [inputHeight, setInputHeight] = useState(0)

    return (
        <View style={styles.bottomBar}>
            <View style={styles.inputView}>
                <TouchableOpacity
                    disabled={isSendMsgEnabled}
                    style={styles.flexEnd}>
                    <Image
                        style={
                            !isSendMsgEnabled
                                ? [styles.icon, styles.enableElement]
                                : [styles.icon, styles.disabledElement]
                        }
                        source={ImageSet.plus}
                    />
                </TouchableOpacity>
                <TextInput
                    value={isMessage}
                    multiline={true}
                    onChangeText={onChangeText}
                    onContentSizeChange={(event) => { setInputHeight(event.nativeEvent.contentSize.height) }}
                    placeholder={'Start typing'}
                    placeholderTextColor={ColorSet.gray}
                    editable={!isSendMsgEnabled}
                    style={[
                        styles.textInput,
                        {
                            height: Math.max(25, inputHeight),
                            width:
                                (isMessage == '' && screenWidth.width60) ||
                                screenWidth.width70,
                        },
                    ]}
                />
                {(isMessage == '' && (
                    <View style={styles.sendIconView}>
                        <TouchableOpacity
                            disabled={isSendMsgEnabled}
                            style={styles.flexEnd}>
                            <Image
                                style={
                                    !isSendMsgEnabled
                                        ? [styles.icon, styles.enableElement]
                                        : [styles.icon, styles.disabledElement]
                                }
                                source={ImageSet.mic}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={isSendMsgEnabled}
                            style={styles.flexEnd}>
                            <Image
                                style={
                                    !isSendMsgEnabled
                                        ? [styles.icon, styles.enableElement]
                                        : [styles.icon, styles.disabledElement]
                                }
                                source={ImageSet.send}
                            />
                        </TouchableOpacity>
                    </View>
                )) || (
                        <TouchableOpacity
                            disabled={isSendMsgEnabled}
                            onPress={onClickSend}
                            style={styles.flexEnd}>
                            <Image
                                style={
                                    !isSendMsgEnabled
                                        ? [styles.icon, styles.enableElement]
                                        : [styles.icon, styles.disabledElement]
                                }
                                source={ImageSet.send}
                            />
                        </TouchableOpacity>
                    )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomBar: {
        marginVertical: 20,
        alignItems: 'center',
    },
    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 8,
        backgroundColor: ColorSet.white,
        width: screenWidth.width95 - 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    disabledElement: {
        opacity: 0.5,
    },
    enableElement: {
        opacity: 1.0,
    },
    icon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
    flexEnd: {
        alignSelf: 'flex-end',
    },
    sendIconView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: screenWidth.width25,
        paddingHorizontal: 15,
        alignSelf: 'flex-end',
    },
    disabledElement: {
        opacity: 0.5,
    },
    enableElement: {
        opacity: 1.0,
    },
    textInput: {
        maxHeight: 100,
        paddingHorizontal: 10,
    },
})

export default ChatBox