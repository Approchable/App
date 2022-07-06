import { Dimensions } from 'react-native'

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
  defaultTheme: '#44BFBA',
  lightGray: '#F6F6F6',
  chatRightPopupGray: '#ECEEF2',
  chatLeftPopupGray: '#F6F6F6',
  chatPopupGray: '#ECEEF2',
  gray: '#989898',
  dimGray: '#696969',
  textBlack: '#030E01',
  white: '#fff',
}

export const ImageSet = {
  defaultProfileImage:
    'https://firebasestorage.googleapis.com/v0/b/approachablebackend.appspot.com/o/images%2Fdefault_profile_image.png?alt=media&token=2e6a9e79-a6bf-4580-986b-dc8d30aab4df',

  // --------- Icons ---------
  back: require('../../assets/images/icons/back_icon.png'),
  phone: require('../../assets/images/icons/phone_icon.png'),
  camera: require('../../assets/images/icons/camera_icon.png'),
  warning: require('../../assets/images/icons/warning_icon.png'),
  plus: require('../../assets/images/icons/plus_icon.png'),
  mic: require('../../assets/images/icons/mic_icon.png'),
  send: require('../../assets/images/icons/send_icon.png'),
  threeDots: require('../../assets/images/icons/three_dots_icon.png'),
  search: require('../../assets/images/icons/search.png'),
  dot: require('../../assets/images/icons/dot.png'),
  profile: require('../../assets/images/icons/profile.jpg'),
  noMessage: require('../../assets/images/icons/no-message.png'),
  filter: require('../../assets/images/icons/filter-icon.png'),
  accepted: require('../../assets/images/icons/accepted.png'),
  rejected: require('../../assets/images/icons/rejected.png'),
  ArrowRight: require('../../assets/images/icons/ArrowRight.png'),
  tick: require('../../assets/images/icons/tick.png'),
  location: require('../../assets/images/assets/send.png'),
  X: require('../../assets/images/icons/X.png'),
  rightCaret: require('../../assets/images/icons/CaretRight.png'),
  redirect: require('../../assets/images/icons/redirect.png'),
  logo:require('../../assets/images/icons/logo.png'),
}

export const TabType = {
  connections: 'connections',
  requests: 'requests',
  active: 'active',
  inActive: 'inActive',
}

export const RequestStatus = {
  pending: 'pending',
  opened: 'opened',
  accepted: 'accepted',
  rejected: 'rejected',
  completed: 'completed',
}

export const MessageTypeStatus = {
  systemStartChat: 'system_start_chat',
  systemRequestAccept: 'system_request_accept',
  user: 'user',
}
export const googleApiKey = 'AIzaSyDNEZdKGtGmuL6jFRd4w4rK_JN1HeS4FYs'
