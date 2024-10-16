import styled from "styled-components/native";
import { View, Text } from "react-native";
import { colors } from "@/src/assets/colors";

export const CardContainer = styled(View)`
    height: 90px;
    padding: 0px 20px;
`;

export const ModalTitle = styled(Text)`
    font-family: "SFUIText-Semibold";
    font-size: 20px;
    color: ${colors.secondary};
    text-align: center;
`;

export const EventTitle = styled(Text)`
    font-family: "SFUIText-Semibold";
    font-size: 24px;
    color: ${colors.secondary};
    margin-top: 5px;
`;

export const EventDescription = styled(Text)`
    font-family: "SFUIText-Regular";
    font-size: 14px;
    color: ${colors.blueGray};
    margin-top: 5px;
`;
