import { Modalize } from "react-native-modalize";
import DefaultButton from "@components/buttons/DefaultButton";
import { ModalContainer, ModalText } from "./styles";

//= ==============================================================================================
interface EventModalProps {
    inputRef: React.RefObject<Modalize>;
    message: string;
    buttonLabel: string;
    onConfirm: () => void;
}

//= ==========================================================================================
const EventMenuModal: React.FC<EventModalProps> = ({
    inputRef,
    message,
    buttonLabel,
    onConfirm,
}) => {
    return (
        <>
            <Modalize adjustToContentHeight ref={inputRef}>
                <ModalContainer>
                    <ModalText>{message}</ModalText>
                    <DefaultButton label={buttonLabel} onPress={onConfirm} />
                </ModalContainer>
            </Modalize>
        </>
    );
};

export default EventMenuModal;
