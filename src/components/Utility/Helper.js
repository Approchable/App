import moment from 'moment';

export function getTimeFromMilliseconds(timestamp) {
    const date = new Date(timestamp * 1000);
    const dateTime2 = moment(date).format('h:mm a');
    return dateTime2

}

export function getDateFromDateTime(timestamp) {
    const time = timestamp
    const dateTime2 = moment(time).format('YYYY-MM-DD');
    return dateTime2
}


export function getCurrentDate() {
    const currentDate = new Date();
    console.log('currentDate ===>>> ', currentDate);
    return currentDate
}

export function setDataByDate(array) {
    const groups = array.reduce((groups, message) => {
        const date = getDateFromDateTime(message.sent_at.toDate())
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