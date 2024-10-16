import { Event } from "@/src/utils/types";
import EventForm from "@components/forms/EventForm";
import { Modalize } from "react-native-modalize";

//= ==============================================================================================
interface EventModalProps {
    inputRef: React.RefObject<Modalize>;
    onFinish: () => {};
    selectedEvent?: Event;
    daySelected?: string | null;
}

//= ==========================================================================================
const EventModal: React.FC<EventModalProps> = ({
    inputRef,
    onFinish,
    selectedEvent,
    daySelected,
}) => {
    return (
        <>
            <Modalize adjustToContentHeight ref={inputRef}>
                <EventForm
                    onFinish={onFinish}
                    selectedEvent={selectedEvent}
                    daySelected={daySelected}
                />
            </Modalize>
        </>
    );
};

export default EventModal;
