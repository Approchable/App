import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import { ImageSet } from './config/Constant'
import React from 'react'

// Report UI that will link to the report page
export function ExploreReport(props) {
  const { objectToReport, moreStyles, handleModalOpen, setCurrentReportPost } =
    props
  const handleModalPress = () => {
    setCurrentReportPost(objectToReport)
    handleModalOpen()
  }
  return (
    <>
      <TouchableOpacity onPress={handleModalPress}>
        <Image
          style={{ ...styles.icon, ...moreStyles }}
          source={ImageSet.threeDots}
        />
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
})
