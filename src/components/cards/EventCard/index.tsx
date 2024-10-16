import { GestureResponderEvent, TouchableOpacity } from "react-native";
import { CardContainer, EventDescription, EventTime, EventTitle } from "../EventCard/styles";
import IconMarkEvent from "@components/svgs/IconMarkEvent";
import { FontAwesome } from "@expo/vector-icons";
import { Row } from "@/src/styles-global";
import { Event } from "@/src/utils/types";
import { colors } from "@/src/assets/colors";

//= ==============================================================================================
interface EventCardProps {
    calendarEvent: Event;
    onPress?: (event: GestureResponderEvent) => void;
    onPressEventMenu?: (event: GestureResponderEvent) => void;
}

//= ==========================================================================================
const EventCard: React.FC<EventCardProps> = ({ calendarEvent, onPress, onPressEventMenu }) => {
    return (
        <CardContainer>
            <Row style={{ justifyContent: "space-between" }}>
                <Row>
                    <IconMarkEvent
                        width="18"
                        height="18"
                        fill={
                            calendarEvent.category?.color
                                ? calendarEvent.category.color
                                : colors.secondaryDark
                        }
                    />
                    <EventTime>
                        {calendarEvent.startTime}
                        {calendarEvent.endTime ? ` - ${calendarEvent.endTime}` : ""}
                    </EventTime>
                </Row>

                <TouchableOpacity onPress={onPressEventMenu}>
                    <FontAwesome name="ellipsis-h" size={24} color={colors.blueGray} />
                </TouchableOpacity>
            </Row>

            <TouchableOpacity onPress={onPress}>
                <EventTitle>{calendarEvent.eventName}</EventTitle>
                <EventDescription>{calendarEvent.description}</EventDescription>
            </TouchableOpacity>
        </CardContainer>
    );
};

export default EventCard;
