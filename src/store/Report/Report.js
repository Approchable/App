import { sendReportToFireStore } from '../../../FirebaseFireStore'

const SEND_REPORT_LOADING = 'SET_REPORT_LOADING'
const SEND_REPORT_SUCCESS = 'SET_REPORT_SUCCESS'
const SEND_REPORT_FAILURE = 'SET_REPORT_FAILURE'

export const sendReport = (report) => {
  return async (dispatch) => {
    dispatch({ type: SEND_REPORT_LOADING, payload: { isLoading: true } })
    // do some computation to correct the report object sent to firebase

    // send the report to firebase
    const reportId = await sendReportToFireStore(report)
    if (reportId) {
      dispatch({
        type: SEND_REPORT_SUCCESS,
        payload: { isLoading: false, reportId },
      })
      return
    }
    dispatch({
      type: SEND_REPORT_FAILURE,
      payload: {
        isLoading: false,
        errorMessage: 'Error sending report to firebase',
      },
    })
  }
}
//reducers
const reportInitialState = {
  reportId: null,
  isLoading: true,
  errorMessage: '',
}

export function ReportReducer(state = reportInitialState, action) {
  switch (action.type) {
    case SEND_REPORT_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      }
    case SEND_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        reportId: action.payload.reportId,
      }
    case SEND_REPORT_FAILURE:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        errorMessage: action.payload.errorMessage,
      }
    default:
      return state
  }
}
