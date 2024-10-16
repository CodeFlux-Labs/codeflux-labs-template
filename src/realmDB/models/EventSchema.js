// import Realm from "realm";

// // Define the Event model, extending Realm.Object
// class Event extends Realm.Object {}

// // Schema for the Event model
// Event.schema = {
//     name: "Event", // Name of the model
//     primaryKey: "id", // Define the primary key for the model
//     properties: {
//         id: "objectId", // Unique identifier for the event (of type ObjectId)
//         eventName: "string", // Name of the event
//         description: "string?", // Optional description of the event
//         date: "string", // Date of the event in string format
//         startTime: "string?", // Optional start time of the event
//         endTime: "string?", // Optional end time of the event
//         remindsMe: "bool", // Boolean flag indicating if reminders are set for the event
//         category: "Category?", // Optional reference to a Category object
//     },
// };

// // Define the Category model, extending Realm.Object
// class Category extends Realm.Object {}

// // Schema for the Category model
// Category.schema = {
//     name: "Category", // Name of the model
//     properties: {
//         label: "string", // Label for the category
//         value: "string", // Value associated with the category
//         color: "string", // Color associated with the category
//     },
// };

// // Export a new Realm instance with the defined schemas
// // This instance can be used to interact with the database
// export default new Realm({ schema: [Event, Category] });
