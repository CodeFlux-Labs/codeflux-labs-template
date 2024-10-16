import React, { useEffect, useRef, useState } from "react";
import { colors } from "@/src/assets/colors";
import EventCard from "@/src/components/cards/EventCard";
import EventModal from "@/src/components/modals/EventModal";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import { Calendar } from "react-native-calendars";
import FloatingButton from "@/src/components/buttons/FloatingButton";
import { Modalize } from "react-native-modalize";
import {
    insertDefaultEvents,
    getEvents,
    getEventsByDate,
} from "@/src/realmDB/services/EventService";
import { ScrollView } from "react-native-gesture-handler";
import { Event } from "@/src/utils/types";
import EventMenuModal from "@/src/components/modals/EventMenuModal";
import { generateMarkedDates } from "@/src/utils";
import { MarkedDates } from "react-native-calendars/src/types";

const Calendars = () => {
    const eventModalRef = useRef<Modalize>(null);
    const eventMenuModalRef = useRef<Modalize>(null);
    const [eventsCache, setEventsCache] = useState<Event[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [daySelected, setDaySelected] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState({} as Event);
    const [markedDates, setMarkedDates] = useState({} as MarkedDates);

    //= ==============================================================================================
    const Arrow: React.FC<{ direction: "left" | "right" }> = ({ direction }) => {
        return (
            <FontAwesome
                name={direction === "left" ? "chevron-left" : "chevron-right"}
                size={14}
                color={colors.secondaryDark}
            />
        );
    };

    //= ==============================================================================================
    const fetchData = async () => {
        const currentDate = moment().format("YYYY-MM-DD");

        const filteredEvents = await getEventsByDate(daySelected || currentDate);
        const events = getEvents();

        setEvents(filteredEvents);
        setEventsCache(events);

        const markers = generateMarkedDates(events, daySelected);
        setMarkedDates(markers);
    };

    //= ==============================================================================================
    useEffect(() => {
        (async () => {
            await insertDefaultEvents();
            fetchData();
        })();
    }, []);

    //= ==============================================================================================
    const onEventClick = calendarEvent => {
        setSelectedEvent(calendarEvent);
        eventModalRef.current?.open();
    };

    //= ==============================================================================================
    const onFinishCreation = date => {
        eventModalRef.current?.close();
        setSelectedEvent({} as Event);
        setDaySelected(date);
        fetchData();
    };

    //= ==============================================================================================
    const onFinishDelete = async () => {
        await fetchData();
        eventMenuModalRef.current?.close();
        setSelectedEvent({} as Event);
    };

    //= ==============================================================================================
    const onPressEventMenu = calendarEvent => {
        setSelectedEvent(calendarEvent);
        eventMenuModalRef.current?.open();
    };

    //= ==============================================================================================
    const onHandlerDayPress = async (day: string) => {
        const filtered = await getEventsByDate(day);

        setSelectedEvent({} as Event);
        setDaySelected(day);

        if (filtered.length > 0) {
            setEvents(filtered);
            const markers = generateMarkedDates(eventsCache, day);
            setMarkedDates(markers);
        } else {
            eventModalRef.current?.open();
        }
    };

    //= ==============================================================================================
    return (
        <>
            <ScrollView>
                <>
                    <Calendar
                        enableSwipeMonths
                        style={{
                            borderWidth: 0,
                            height: 390,
                            marginTop: 45,
                            marginBottom: -20,
                        }}
                        renderArrow={direction => <Arrow direction={direction} />}
                        current={moment().format("YYYY-MM-DD")}
                        onDayPress={day => {
                            console.log("selected day", day.dateString);
                            onHandlerDayPress(day.dateString);
                        }}
                        markedDates={markedDates}
                        theme={{
                            backgroundColor: "#F0F0F0",
                            calendarBackground: "#F0F0F0",
                            textSectionTitleColor: "#b6c1cd",
                            arrowColor: colors.primary,
                            monthTextColor: colors.secondary,
                            textMonthFontFamily: "SFUIText-Medium",
                            textMonthFontSize: 18,
                            textDayFontFamily: "SFUIText-Medium",
                            arrowStyle: {
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor: colors.primaryLight,
                                padding: 10,
                            },
                            selectedDayBackgroundColor: colors.purple,
                        }}
                    />

                    {events.length > 0 &&
                        events.map(calendarEvent => {
                            return (
                                <EventCard
                                    key={calendarEvent.id}
                                    onPress={() => onEventClick(calendarEvent)}
                                    calendarEvent={calendarEvent}
                                    onPressEventMenu={() => onPressEventMenu(calendarEvent)}
                                />
                            );
                        })}
                </>
            </ScrollView>

            <FloatingButton onPress={() => eventModalRef.current?.open()} />

            <EventModal
                inputRef={eventModalRef}
                onFinish={date => onFinishCreation(date)}
                selectedEvent={selectedEvent}
                daySelected={daySelected}
            />
            <EventMenuModal
                inputRef={eventMenuModalRef}
                onFinishDelete={onFinishDelete}
                selectedEvent={selectedEvent}
            />
        </>
    );
};

export default Calendars;
