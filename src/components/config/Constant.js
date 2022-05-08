import { Dimensions  } from 'react-native'


export const screenHeight = {
    height5: Math.round((5 / 100) * Dimensions.get('window').height),
    height10: Math.round((10 / 100) * Dimensions.get('window').height),
    height15: Math.round((15 / 100) * Dimensions.get('window').height),
    height20: Math.round((20 / 100) * Dimensions.get('window').height),
    height25: Math.round((25 / 100) * Dimensions.get('window').height),
    height30: Math.round((30 / 100) * Dimensions.get('window').height),
    height35: Math.round((35 / 100) * Dimensions.get('window').height),
    height38: Math.round((38 / 100) * Dimensions.get('window').height),

    height40: Math.round((40 / 100) * Dimensions.get('window').height),
    height50: Math.round((50 / 100) * Dimensions.get('window').height),
    height60: Math.round((60 / 100) * Dimensions.get('window').height),
    height70: Math.round((70 / 100) * Dimensions.get('window').height),
    height80: Math.round((80 / 100) * Dimensions.get('window').height),
    height85: Math.round((85 / 100) * Dimensions.get('window').height),
    height90: Math.round((90 / 100) * Dimensions.get('window').height),
    height100: Math.round(Dimensions.get('window').height),
}

export const screenWidth = {
    width100: Math.round(Dimensions.get('window').width),
    width95: Math.round((95 / 100) * Dimensions.get('window').width),
    width90: Math.round((90 / 100) * Dimensions.get('window').width),
    width85: Math.round((85 / 100) * Dimensions.get('window').width),
    width60: Math.round((60 / 100) * Dimensions.get('window').width),
    width55: Math.round((55 / 100) * Dimensions.get('window').width),
    width50: Math.round((50 / 100) * Dimensions.get('window').width),
    width45: Math.round((45 / 100) * Dimensions.get('window').width),
    width40: Math.round((40 / 100) * Dimensions.get('window').width),
    width35: Math.round((35 / 100) * Dimensions.get('window').width),
    width30: Math.round((30 / 100) * Dimensions.get('window').width),

    width25: Math.round((25 / 100) * Dimensions.get('window').width),
    width20: Math.round((20 / 100) * Dimensions.get('window').width),
    width15: Math.round((15 / 100) * Dimensions.get('window').width),
    width12: Math.round((12 / 100) * Dimensions.get('window').width),
    width10: Math.round((10 / 100) * Dimensions.get('window').width),
    width5: Math.round((5 / 100) * Dimensions.get('window').width),

    width65: Math.round((65 / 100) * Dimensions.get('window').width),
    width70: Math.round((70 / 100) * Dimensions.get('window').width),
    width75: Math.round((75 / 100) * Dimensions.get('window').width),
    width80: Math.round((80 / 100) * Dimensions.get('window').width),
    width18: Math.round((18 / 100) * Dimensions.get('window').width),
}



export const Routes = {
    Chat: 'Chat',
    ChatRoom: 'ChatRoom',
}

export const ColorSet = {
    lightGray: '#F6F6F6',
    chatRightPopupGray:'#ECEEF2',
    chatLeftPopupGray:'#F6F6F6',
    chatPopupGray:'#ECEEF2',
    gray: '#989898',
    textBlack: '#030E01',
    white:'#fff',
}

export const ImageSet = {

    // --------- Icons --------- 
    back: require('../../assets/images/icons/back_icon.png'),
    phone: require('../../assets/images/icons/phone_icon.png'),
    camera: require('../../assets/images/icons/camera_icon.png'),
    warning: require('../../assets/images/icons/warning_icon.png'),
    plus: require('../../assets/images/icons/plus_icon.png'),
    mic: require('../../assets/images/icons/mic_icon.png'),
    send: require('../../assets/images/icons/send_icon.png'),
    threeDots: require('../../assets/images/icons/three_dots_icon.png'),
}

export const ASYNC_USER_STRING = 'user'