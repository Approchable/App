export function getRegion(latitude, longitude, distance) {
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000;

    const latitudeDelta = distance / oneDegreeOfLatitudeInMeters;
    const longitudeDelta = distance / (oneDegreeOfLatitudeInMeters * Math.cos(latitude * (Math.PI / 180)));

    return {
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta
    }
};