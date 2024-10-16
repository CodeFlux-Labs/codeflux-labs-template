export interface Category {
    label: string;
    value: string;
    color: string;
}

export interface Event {
    id: string;
    eventName: string;
    description?: string;
    date: string;
    startTime: string;
    endTime: string;
    remindsMe?: boolean;
    category?: Category;
}
