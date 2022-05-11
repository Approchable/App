import React, { useState } from 'react'
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Alert
} from 'react-native'
import { ImageSet } from './config/Constant'
import { NormalButton } from './Buttons'
import { NormalTextField } from './TextField'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const reportReasons = [
  'This is spam',
  'I just don’t like it or find it offensive',
  'Its pretending to be someone else',
  'Nudity or sexual activity',
  'Hate speech or symbols',
  'Violence or dangerous organizations',
  'Bullying or harassment',
  'Other',
]

function ReportModal({ visible, onCancel }) {
  const [currentStep, setCurrentStep]=useState('STEP_ONE')
  const [reason, setReason] = useState(null)
  const onSubmit=()=>{
    alertOptions()
    handleCancel()
  }
  const goToStepTwo=()=>{
    setCurrentStep('STEP_TWO')
}
const goToStepThree=()=>{
  setCurrentStep('STEP_THREE')
}
const handleCancel=()=>{
  onCancel()
  setCurrentStep('STEP_ONE')
}
const alertOptions = () =>
Alert.alert('Your report has been sent!')
  return (
    <SafeAreaView>
    <Modal visible={visible} transparent animationType="slide">
      
      <View
        style={{
          ...styles.modal,
        }}
      >
        <ModalBarTop />

        {currentStep=='STEP_ONE'&&<StepOne goToStepTwo={goToStepTwo}/>}
       {currentStep=='STEP_TWO'&& <StepTwo goToStepThree={goToStepThree}/>}
       {currentStep=='STEP_THREE'&&<StepThree onSubmit={onSubmit}setReason={setReason}/>}
      </View>

      <TouchableWithoutFeedback onPress={handleCancel}>
        <View style={styles.modalBG} />
      </TouchableWithoutFeedback>

    </Modal>
    </SafeAreaView>
  )
}
const StepOne=({goToStepTwo})=>{

  return(
    <TouchableOpacity onPress={goToStepTwo}
    style={styles.reportButton}
  >
    <Image
      style={{ width: 25, height: 25, marginRight: 10 }}
      source={ImageSet.warning}
    />
    <Text style={styles.options}>Report</Text>
  </TouchableOpacity>
  )
}
const StepTwo=({goToStepThree})=>{
  return(
    <>
  <View style={styles.titleDesc}>
          <Text style={styles.reportText}>Report</Text>
          <Text style={styles.reportDescription}>
            Select a reason for reporting this account. Your report is
            anonymous. If someone is in immediate danger, call the local
            emergency services - don’t wait.
          </Text>
        </View>

        <ScrollView>
          {reportReasons.map((reason,idx) => (
            <TouchableOpacity style={styles.reportButton} onPress={goToStepThree} key={idx}>
              <Text style={styles.options}>{reason}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
    </>
  )
}
const StepThree=({onSubmit,setReason})=>{
  return(
<KeyboardAwareScrollView extraHeight={60}>
    <View style={{...styles.titleDesc,marginTop:20,flex: 1}}>
    <Text style={styles.reportText}>Reason for the report</Text>
    <Text style={styles.reportDescription}>
      Is there anything else we should know to help us understand the
      problem?
    </Text>
  
    <NormalTextField
      placeholder="Optional"
      onChangeText={(text) => setReason(text)}
    />
     
   <NormalButton
      text={'Send Report'}
      onPress={onSubmit}
      hollow={true}
      moreStyles={{
        marginVertical: 20,
      }}
    />
      <View style={{marginVertical: 50}}/>
  </View>

  </KeyboardAwareScrollView>

  )
}
const ModalBarTop = () => {
  return (
    <View
      style={{
        backgroundColor: '#ECEEF2',
        height: 4,
        width: 70,
        borderRadius: 13,
        alignSelf: 'center',
        marginTop: 10,
      }}
    ></View>
  )
}

export default ReportModal
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  modal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    zIndex: 1000,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 16,
    paddingBottom: 30,
  },
  modalBG: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    height: 900, // change this to height of screen later
  },
  reportButton: {
    paddingHorizontal: 20,
    marginHorizontal: 16,
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    padding: 15,
    borderRadius: 8,
  },
  options: {
    color: '#696969',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 22,
  },
  reportText: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 10,
  },
  reportDescription: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 24,
    color: '#696969',
    marginBottom: 15,
  },
  titleDesc: {
    marginHorizontal: 16,
  },
})
