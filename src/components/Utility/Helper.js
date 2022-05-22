import moment from 'moment'

export function getTimeFromMilliseconds(timestamp) {

    console.log("getTimeFromMilliseconds ==> ", timestamp);
    const date = new Date(timestamp * 1000)
    const dateTime2 = moment(date).format('h:mm a')
    return dateTime2
}

export function getDateFromDateTime(timestamp) {
    const time = timestamp
    const dateTime2 = moment(time).format('YYYY-MM-DD')
    return dateTime2
}

export function getCurrentDate() {
    const currentDate = new Date()
    // console.log('currentDate ===>>> ', currentDate)
    return currentDate
}

export function generateRandomId() {
    var randomId;
    randomId = Date.now()
    console.log('randomId ===>>> ', randomId);
    return randomId
}

export function setDataByDate(array) {
    const groups = array.reduce((groups, message) => {
        const date = getDateFromDateTime(message.sentAt.toDate())
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

    var diffMs = (today - past); // milliseconds between today & past
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours difference
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes difference
    //var diffSecs = Math.round(((diffMs % 86400000) % 3600000) / 60000 / 60000); // seconds

    const diffYrs = moment().diff(pastDate, 'years'); // years difference
    const diffMons = moment().diff(pastDate, 'months'); // months difference
    const diffDys = moment().diff(pastDate, 'days'); // days difference
    const diffWks = moment().diff(pastDate, 'weeks'); // weeks difference


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
                if (diffWks == 0) {
                    timeFormat = `${diffDys}d`
                } else {
                    timeFormat = `${diffWks}w`
                }
            } else {
                timeFormat = `${diffMons}m`
            }
        } else {
            timeFormat = `${diffYrs}y`
        }
    }
    return timeFormat;
}
