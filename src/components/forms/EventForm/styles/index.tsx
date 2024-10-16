import styled from "styled-components/native";
import { View, Text } from "react-native";
import { colors } from "@/src/assets/colors";

export const ModalTitle = styled(Text)`
    font-family: "SFUIText-Semibold";
    font-size: 20px;
    color: ${colors.secondary};
    text-align: center;
    margin-bottom: 20px;
`;
