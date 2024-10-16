import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { colors } from "@/src/assets/colors";

export const FloatingBtn = styled(TouchableOpacity)`
    position: absolute;
    bottom: 10px;
    right: 10px;
    padding: 10px;
    background-color: ${colors.purple};
    width: 65px;
    height: 55px;
    border-radius: 10px;
    justify-content: center;
`;
