import { colors } from "@/src/assets/colors";
import moment from "moment";
import EventSchema from "../models/EventSchema";

const currentDate = moment().format("YYYY-MM-DD");
const oneDayBefore = moment().subtract(1, "day").format("YYYY-MM-DD");
const twoDaysBefore = moment().subtract(2, "days").format("YYYY-MM-DD");
const oneDayAfter = moment().add(1, "days").format("YYYY-MM-DD");

const defaultEvents = [
    {
        eventName: "Brainstorm Session",
        description: "Team brainstorming for new ideas",
        date: currentDate,
        startTime: "10:00",
        endTime: "11:00",
        remindsMe: true,
        category: { label: "Brainstorm", value: "1", color: colors.purple, selected: true },
    },
    {
        eventName: "Workout",
        description: "Morning workout routine",
        date: currentDate,
        startTime: "07:00",
        endTime: "08:00",
        remindsMe: true,
        category: { label: "Design", value: "2", color: colors.green, selected: true },
    },
    {
        eventName: "Design Review",
        description: "Review the latest designs with the team",
        date: currentDate,
        startTime: "14:00",
        endTime: "15:00",
        remindsMe: false,
        category: { label: "Design", value: "2", color: colors.green, selected: true },
    },
    {
        eventName: "Project Kickoff",
        description: "Kickoff meeting for the new project.",
        date: oneDayBefore,
        startTime: "11:00",
        endTime: "12:00",
        remindsMe: true,
        category: { label: "Workout", value: "3", color: colors.blue, selected: true },
    },
    {
        eventName: "Team Outing",
        description: "Team bonding activity.",
        date: oneDayBefore,
        startTime: "15:00",
        endTime: "18:00",
        remindsMe: false,
        category: { label: "Design", value: "2", color: colors.green, selected: true },
    },
    {
        eventName: "Client Call",
        description: "Discuss project requirements with the client",
        date: oneDayAfter,
        startTime: "16:00",
        endTime: "17:00",
        remindsMe: false,
        category: { label: "Workout", value: "3", color: colors.blue, selected: true },
    },
    {
        eventName: "Health Checkup",
        description: "Annual health checkup appointment.",
        date: twoDaysBefore,
        startTime: "09:30",
        endTime: "10:30",
        remindsMe: true,
        category: { label: "Workout", value: "3", color: colors.blue, selected: true },
    },
];

export const insertDefaultEvents = async () => {
    try {
        const existingEvents = getEvents();
        if (existingEvents.length === 0) {
            console.log("No events found. Inserting default events...");

            defaultEvents.forEach(event => {
                addEvent(event);
            });
        } else {
            console.log("Events already exist, no need to insert defaults.");
        }
    } catch (error) {
        console.error("Error inserting default events:", error);
    }
};

export const addEvent = eventData => {
    EventSchema.write(() => {
        delete eventData.id;

        EventSchema.create("Event", {
            id: new Realm.BSON.ObjectId(),
            ...eventData,
        });
    });
};

export const getEvents = () => {
    return EventSchema.objects("Event").sorted("date", true);
};

export const updateEvent = (id, updatedData) => {
    EventSchema.write(() => {
        const event = EventSchema.objectForPrimaryKey("Event", id);
        delete updatedData.id;

        if (event && event.isValid()) {
            Object.assign(event, updatedData);
        }
    });
};

export const deleteEvent = id => {
    EventSchema.write(() => {
        const event = EventSchema.objectForPrimaryKey("Event", id);

        if (event && event.isValid()) {
            EventSchema.delete(event);
        }
    });
};

export const getEventsByDate = async (date: string): Promise<Event[]> => {
    try {
        const events = EventSchema.objects("Event")
            .filtered("date == $0", date)
            .sorted("startTime");

        return Array.from(events) as Event[];
    } catch (error) {
        console.error("Error fetching events by date:", error);
        return [];
    }
};
