// import { colors } from "@/src/assets/colors";
// import moment from "moment";
// import EventSchema from "../models/EventSchema";

// const currentDate = moment().format("YYYY-MM-DD");

// const defaultEvents = [
//     {
//         eventName: "Brainstorm Session",
//         description: "Team brainstorming for new ideas",
//         date: currentDate,
//         startTime: "10:00",
//         endTime: "11:00",
//         remindsMe: true,
//         category: { label: "Brainstorm", value: "1", color: colors.purple, selected: true },
//     },
//     {
//         eventName: "Workout",
//         description: "Morning workout routine",
//         date: currentDate,
//         startTime: "07:00",
//         endTime: "08:00",
//         remindsMe: true,
//         category: { label: "Design", value: "2", color: colors.green, selected: true },
//     },
// ];

// export const insertDefaultEvents = async () => {
//     try {
//         const existingEvents = getEvents();
//         if (existingEvents.length === 0) {
//             console.log("No events found. Inserting default events...");

//             defaultEvents.forEach(event => {
//                 addEvent(event);
//             });
//         } else {
//             console.log("Events already exist, no need to insert defaults.");
//         }
//     } catch (error) {
//         console.error("Error inserting default events:", error);
//     }
// };

// export const addEvent = eventData => {
//     EventSchema.write(() => {
//         delete eventData.id;

//         EventSchema.create("Event", {
//             id: new Realm.BSON.ObjectId(),
//             ...eventData,
//         });
//     });
// };

// export const getEvents = () => {
//     return EventSchema.objects("Event").sorted("date", true);
// };

// export const updateEvent = (id, updatedData) => {
//     EventSchema.write(() => {
//         const event = EventSchema.objectForPrimaryKey("Event", id);
//         delete updatedData.id;

//         if (event && event.isValid()) {
//             Object.assign(event, updatedData);
//         }
//     });
// };

// export const deleteEvent = id => {
//     EventSchema.write(() => {
//         const event = EventSchema.objectForPrimaryKey("Event", id);

//         if (event && event.isValid()) {
//             EventSchema.delete(event);
//         }
//     });
// };

// export const getEventsByDate = async (date: string): Promise<Event[]> => {
//     try {
//         const events = EventSchema.objects("Event")
//             .filtered("date == $0", date)
//             .sorted("startTime");

//         return Array.from(events) as Event[];
//     } catch (error) {
//         console.error("Error fetching events by date:", error);
//         return [];
//     }
// };
