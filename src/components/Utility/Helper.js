import moment from 'moment';

export function getTimeFromDate(timestamp) {
    // console.log('timestamp ====>>>>> ', timestamp);
    const date = new Date(timestamp * 1000);
    const hoursAndMinutes = date.getHours() + ':' + date.getMinutes();
    // console.log('hoursAndMinutes ====>>>>> ', hoursAndMinutes);
    return hoursAndMinutes
}


export function getDateFromTimestamp(timestamp) {
    const time = timestamp.toDate()
    // console.log('time ============>>>> ', time);
    const dateTime2 = moment(time).format('YYYY-MM-DD');
    // console.log('dateTime2 ============>>>> ', dateTime2);
    return dateTime2
}


export function getCurrentDate() {
    const currentDate = new Date();
    console.log('currentDate ===>>> ', currentDate);
    // const date = moment(time).format('YYYY-MM-DD');
    // return timestamp
}

export function setDataByDate(array) {
    const groups = array.reduce((groups, message) => {
        const date = getDateFromTimestamp(message.sent_at)
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(message);
        return groups;
    }, {});

    // Edit: to add it in the array format instead
    const groupArrays = Object.keys(groups).map((date) => {
        return {
            date,
            messages: groups[date]
        };
    });

    // console.log('groupArrays ===>>>> ', groupArrays);
    return groupArrays
}