import styled from "styled-components/native";
import { Text } from "react-native";
import { colors } from "@/src/assets/colors";

export const PageTitle = styled(Text)`
    font-size: 28px;
    color: #000;
    font-family: "SFUIText-Heavy";
    text-align: center;
    line-height: 28px;
    margin-left: -28px;
`;

export const PageSubtitle = styled(Text)`
    font-size: 14px;
    color: ${colors.primary};
    font-family: "SFUIText-Medium";
    text-align: center;
    margin-top: 20px;
`;

export const PageContentText = styled(Text)`
    font-size: 30px;
    color: ${colors.secondary};
    font-family: "SFUIText-Bold";
    text-align: center;
    line-height: 30px;
    margin-top: 15px;
    align-self: center;
`;
