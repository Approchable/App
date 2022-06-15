import { useState } from 'react'
import { Text, View, TextInput, StyleSheet, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { BackButton } from '../../../components/BackButton'
import { NormalButton } from '../../../components/Buttons'

import { HeaderText } from '../../../components/Texts'

const width = (Dimensions.get('window').width - 36) / 3.5

export function AddIceBreaker({ backHandler, finishHandler, actionHandler }) {
  const [isSelected, setIsSelected] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState('')
  const [selectedValue, setSelectedValue] = useState('')

  const icebreakers = [
    { label: 'I’m known for...', value: true },
    { label: 'I will never shut up about...', value: false },
    { label: 'Never have I ever...', value: false },
    { label: 'I hope you...', value: false },
  ]

  const saveAndProceed = () => {
    actionHandler({ question: selectedLabel, answer: selectedValue })
    finishHandler()
  }

  return (
    <>
      <View style={styles.container}>
        {isSelected ? (
          <View style={styles.selectedView}>
            <View>
              <BackButton
                actionHandler={() => {
                  setIsSelected(false)
                }}
              />
              <View style={{ height: 15 }}></View>
              <View style={styles.writeUp}>
                <Text
                  style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
                  {selectedLabel}
                </Text>
                <View style={{ height: 10 }}></View>
                <TextInput
                  multiline={true}
                  placeholderStyle={{ color: 'white' }}
                  placeholderTextColor="#696969"
                  style={{ ...styles.textInput }}
                  placeholder="Type Here"
                  onChangeText={setSelectedValue}
                />
              </View>
            </View>
            <NormalButton
              text={'Finish'}
              onPress={saveAndProceed}
              inActive={true}
              hollow={true}
              moreStyles={{
                marginBottom: 20,
              }}
            />
          </View>
        ) : (
          <View>
            <BackButton actionHandler={backHandler} />
            <HeaderText
              content="Pick a Profile ice-breaker"
              moreStyles={{ fontSize: 27 }}
            />
            <View style={{ height: 10 }}></View>
            <Text style={styles.textStyle}>
              It’s the perfect opportunity to show a little more of your
              personality
            </Text>
            <View style={{ height: 20 }}></View>
            <View
              style={{
                width: '100%',
                height: 100,
                backgroundColor: 'white',
                borderStyle: 'dashed',
                borderColor: '#44BFBA',
                borderWidth: 1,
                borderRadius: 16,
                flex: 0,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setIsSelected(true)
                  setSelectedLabel('')
                }}>
                <Text style={{ color: '#44BFBA', fontSize: 16 }}>
                  Create you own
                </Text>
              </TouchableOpacity>
            </View>
            {icebreakers.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setIsSelected(true)
                    setSelectedLabel(item.label)
                  }}>
                  <View
                    style={{
                      width: '100%',
                      height: 100,
                      backgroundColor: '#F6F6F6',
                      borderRadius: 16,
                      flex: 0,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 20,
                    }}>
                    <Text style={{ color: '#44BFBA', fontSize: 16 }}>
                      {item.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  selectedView: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: Dimensions.get('screen').height * 0.8,
  },
  textStyle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#696969',
    marginBottom: 10,
  },
  pronounsRow: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },

  pronounsCol: {
    flex: 0,
    width: '48%',
    height: Dimensions.get('screen').height * 0.18,
    backgroundColor: '#44bfba1a',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  deletePhotos: {
    position: 'absolute',
    top: -10,
    right: -10,
  },

  writeUp: {
    width: '100%',
    backgroundColor: '#62E1DC',
    borderRadius: 16,
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    height: Dimensions.get('screen').height * 0.23,
  },
  textInput: {
    color: 'white',
    backgroundColor: 'transparent',
    height: 44,
    borderRadius: 8,
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    fontWeight: '600',
    width: '80%',
    textAlign: 'center',
  },
})
