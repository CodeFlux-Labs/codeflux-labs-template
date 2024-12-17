export function convertToDateTime(dateString, timeString) {
    const dateTime = new Date(dateString);

    const [hours, minutes] = timeString.split(":").map(Number);

    dateTime.setHours(hours);
    dateTime.setMinutes(minutes);
    dateTime.setSeconds(0);
    dateTime.setMilliseconds(0);

    return dateTime;
}
