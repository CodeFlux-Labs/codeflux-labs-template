import moment from "moment";
import { Event } from "./types";

export function convertToDateTime(dateString, timeString) {
    const dateTime = new Date(dateString);

    const [hours, minutes] = timeString.split(":").map(Number);

    dateTime.setHours(hours);
    dateTime.setMinutes(minutes);
    dateTime.setSeconds(0);
    dateTime.setMilliseconds(0);

    return dateTime;
}

export const generateMarkedDates = (
    events: Event[],
    daySelected: string,
): { [key: string]: any } => {
    const markedDates: { [key: string]: any } = {};

    events.forEach(event => {
        const date = event.date;
        const currentDate = moment().format("YYYY-MM-DD");

        markedDates[date] = {
            selected: daySelected === event.date || currentDate === event.date,
            marked: true,
            selectedColor: event.category?.color,
        };
    });

    return markedDates;
};
