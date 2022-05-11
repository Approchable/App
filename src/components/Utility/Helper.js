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

export function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}


export function dateDifference(date2) {
    var timeFormat;

    const past = new Date(date2 * 1000);
    const today = new Date();

    const currentDate = moment.utc(today).format("YYYY-MM-DD")
    const pastDate = moment.utc(past).format("YYYY-MM-DD")
    //const checkDate = currentDate == pastDate

    var diffMs = (today - past); // milliseconds between today & past
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    //var diffSecs = Math.round(((diffMs % 86400000) % 3600000) / 60000 / 60000); // seconds

    const diffYrs = moment().diff(pastDate, 'years');
    const diffMons = moment().diff(pastDate, 'months');
    const diffDys = moment().diff(pastDate, 'days');

    if (diffDys == 0) {
        if (diffHrs == 0) {
            if (diffMins == 0) {
                timeFormat = 'just now'
            } else {
                timeFormat = `${diffMins}m`
            }
        } else {
            timeFormat = `${diffHrs}h`
        }
    } else {
        if (diffYrs == 0) {
            if (diffMons == 0) {
                timeFormat = `${diffDys}d`
            } else {
                timeFormat = `${diffMons}m`
            }
        } else {
            timeFormat = `${diffYrs}y`
        }
    }
    return timeFormat;
}