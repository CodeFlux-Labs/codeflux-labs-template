import Realm from "realm";

class Event extends Realm.Object {}
Event.schema = {
    name: "Event",
    primaryKey: "id",
    properties: {
        id: "objectId",
        eventName: "string",
        description: "string?",
        date: "string",
        startTime: "string?",
        endTime: "string?",
        remindsMe: "bool",
        category: "Category?",
    },
};

class Category extends Realm.Object {}
Category.schema = {
    name: "Category",
    properties: {
        label: "string",
        value: "string",
        color: "string",
    },
};

export default new Realm({ schema: [Event, Category] });
