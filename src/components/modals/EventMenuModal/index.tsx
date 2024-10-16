import { Event } from "@/src/utils/types";
import { Modalize } from "react-native-modalize";
import DefaultButton from "@components/buttons/DefaultButton";
import { ModalContainer, ModalText } from "./styles";
import { deleteEvent } from "@realmDB/services/EventService";

//= ==============================================================================================
interface EventModalProps {
    inputRef: React.RefObject<Modalize>;
    onFinishDelete: () => {};
    selectedEvent: Event;
}

//= ==========================================================================================
const EventMenuModal: React.FC<EventModalProps> = ({ inputRef, onFinishDelete, selectedEvent }) => {
    const onDelete = () => {
        deleteEvent(selectedEvent.id);
        onFinishDelete();
    };

    return (
        <>
            <Modalize adjustToContentHeight ref={inputRef}>
                <ModalContainer>
                    <ModalText>Are you sure you want to delete this event?</ModalText>
                    <DefaultButton label="Delete Event" onPress={onDelete} />
                </ModalContainer>
            </Modalize>
        </>
    );
};

export default EventMenuModal;
