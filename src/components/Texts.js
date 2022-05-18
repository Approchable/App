import { View, Text, StyleSheet } from 'react-native'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Regular,
  Poppins_700Bold,
  Poppins_700Normal,
} from '@expo-google-fonts/poppins'

const fetchFonts = () => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Regular,
    Poppins_700Normal,
    Poppins_700Bold,
  })
}

function HeaderText({ content, moreStyles }) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Regular,
    Poppins_700Normal,
    Poppins_700Bold,
  })
  if (fontsLoaded) {
    return <></>
  }
  return (
    <View>
      <Text
        style={{
          ...styles.heading,
          ...moreStyles,
          fontFamily: 'Poppins_500Regular',
        }}
      >
        {content}
      </Text>
    </View>
  )
}

function RegularText({ content, moreStyles }) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Regular,
    Poppins_700Normal,
    Poppins_700Bold,
  })
  if (fontsLoaded) {
    return <></>
  }
  return (
    <View>
      <Text
        style={{
          ...styles.regular,
          ...moreStyles,
          fontFamily: 'Poppins_400Regular',
        }}
      >
        {content}
      </Text>
    </View>
  )
}

function RegularBoldText({ content, moreStyles }) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Regular,
    Poppins_700Normal,
    Poppins_700Bold,
  })
  if (fontsLoaded) {
    return <></>
  }
  return (
    <View>
      <Text style={{ ...styles.regularBold, ...moreStyles }}>{content}</Text>
    </View>
  )
}

function SmallerText({ content, moreStyles }) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Regular,
    Poppins_700Normal,
    Poppins_700Bold,
  })
  if (fontsLoaded) {
    return <></>
  }
  return (
    <View>
      <Text
        style={{
          ...styles.small,
          ...moreStyles,
          fontFamily: 'Poppins_400Regular',
        }}
      >
        {content}
      </Text>
    </View>
  )
}

export { RegularText, HeaderText, SmallerText, RegularBoldText }

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 36,

    fontWeight: '700',
    textAlign: 'left',
    marginVertical: 5,
  },

  regular: {
    color: '#696969',
    textAlign: 'left',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 32,
    marginVertical: 4,
  },

  regularBold: {
    color: '#030E01',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 24,

    marginBottom: 32,
    marginVertical: 4,
    fontStyle: 'normal',
  },

  small: {
    color: '#696969',
    textAlign: 'left',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 32,
    marginVertical: 4,
  },
})
