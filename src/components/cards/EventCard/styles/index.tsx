import styled from "styled-components/native";
import { Text, View } from "react-native";
import { colors } from "@/src/assets/colors";

export const CardContainer = styled(View)`
    height: 90px;
    padding: 0px 20px;
    margin-bottom: 30px;
`;

export const EventTime = styled(Text)`
    font-family: "SFUIText-Semibold";
    font-size: 14px;
    color: ${colors.blueGray};
    margin-left: 5px;
`;

export const EventTitle = styled(Text)`
    font-family: "SFUIText-Semibold";
    font-size: 18px;
    color: ${colors.secondary};
    margin-top: 5px;
`;

export const EventDescription = styled(Text)`
    font-family: "SFUIText-Regular";
    font-size: 14px;
    color: ${colors.blueGray};
    margin-top: 5px;
`;
