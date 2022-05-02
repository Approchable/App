

export function getTimeFromDate(timestamp) {
    // console.log('timestamp ====>>>>> ', timestamp);
    const date = new Date(timestamp * 1000);
    const hoursAndMinutes = date.getHours() + ':' + date.getMinutes();
    // console.log('hoursAndMinutes ====>>>>> ', hoursAndMinutes);
    return hoursAndMinutes
}


export function getDate(timestamp) {
    var date = new Date(timestamp * 1000);
    return date
}

export function getCurrentDate() {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    return timestamp
}

