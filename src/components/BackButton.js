import { View, Image, StyleSheet, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export function BackButton({ actionHandler, size , moreStyles}) {
  size = size || 44
  return (
    <>
      <TouchableOpacity
        onPress={actionHandler}
        style={[styles.back, { width: size, height: size , ...moreStyles }]}>
        <Image source={require('../assets/images/assets/backIcon.png')} />
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  back: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ECEEF2',
    borderRadius: 8,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
})
