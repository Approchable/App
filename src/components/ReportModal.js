import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native'

import { useDispatch } from 'react-redux'
import { sendReport } from '..//store//Report//Report'
import { ImageSet } from './config/Constant'
import { NormalButton } from './Buttons'
import { NormalTextField } from './TextField'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ModalWrapper from './Shared/ModalWrapper'
import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const ReportModal = ({ visible, onCancel, currentReportPost }) => {
  const [currentStep, setCurrentStep] = useState('STEP_ONE')
  const [additonalReason, setAdditionalReason] = useState('')
  const [currentReportReason, setCurrentReportReason] = useState(7)
  const dispatch = useDispatch()
  const goToStepTwo = () => {
    setCurrentStep('STEP_TWO')
  }
  const goToStepThree = (idx) => {
    setCurrentReportReason(idx)
    setCurrentStep('STEP_THREE')
  }
  const handleCancel = () => {
    onCancel()
    setCurrentStep('STEP_ONE')
  }
  const onSubmit = () => {
    handleSendReport()
    alertOptions()
    handleCancel()
  }
  const handleSendReport = async() => {
    const user = await AsyncStorage.getItem('user')
    const userId = JSON.parse(user).id
    let report = {
      reportReason: reportReasons[currentReportReason],
      additionalReportReason: additonalReason,
      reportID: uuid.v4().toString(),
      postId: currentReportPost?.postId,
      nameOfReporter: currentReportPost?.userName,
      userId: userId,
      timeOfReport: new Date().toLocaleString(),
    }
    dispatch(sendReport(report))
  }
  const alertOptions = () => Alert.alert('Your report has been sent!')
  const StepOne = () => {
    return (
      <TouchableOpacity onPress={goToStepTwo} style={styles.reportButton}>
        <Image
          style={{ width: 25, height: 25, marginRight: 10 }}
          source={ImageSet.warning}
        />
        <Text style={styles.options}>Report</Text>
      </TouchableOpacity>
    )
  }
  const StepTwo = () => {
    return (
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
          {reportReasons.map((reason, idx) => (
            <TouchableOpacity
              style={styles.reportButton}
              onPress={() => {
                goToStepThree(idx)
              }}
              key={idx}
            >
              <Text style={styles.options}>{reason}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </>
    )
  }
  const StepThree = () => {
    return (
      <KeyboardAwareScrollView extraHeight={60}>
        <View style={{ ...styles.titleDesc, marginTop: 20, flex: 1 }}>
          <Text style={styles.reportText}>Reason for the report</Text>
          <Text style={styles.reportDescription}>
            Is there anything else we should know to help us understand the
            problem?
          </Text>
          <NormalTextField
            placeholder="Optional"
            autoFocus={false}

            onChangeText={text=>setAdditionalReason(text)}
          />
          <NormalButton
            text={'Send Report'}
            onPress={onSubmit}
            hollow={true}
            moreStyles={{
              marginVertical: 20,
            }}
          />
          <View style={{ marginVertical: 50 }} />
        </View>
      </KeyboardAwareScrollView>
    )
  }
  return (
    <ModalWrapper visible={visible} transparent animationType="slide">
      {currentStep == 'STEP_ONE' && <StepOne  />}
      {currentStep == 'STEP_TWO' && <StepTwo  />}
      {currentStep == 'STEP_THREE' && <StepThree/>}
    </ModalWrapper>
  )
}

const styles = StyleSheet.create({
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
export default ReportModal
