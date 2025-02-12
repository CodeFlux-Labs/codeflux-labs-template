import styled from "styled-components/native";
import { TouchableOpacity, Text, View } from "react-native";
import { colors } from "@/src/assets/colors";
import { DefaultProps } from "@/src/styles-global";

interface DefaultBtnProps extends DefaultProps {
    height?: string;
    color?: string;
}

export const DefaultBtn = styled(TouchableOpacity)<DefaultBtnProps>`
    padding: ${({ padding = "10px" }) => padding};
    padding-vertical: ${({ paddingVertical = "0" }) => paddingVertical};
    padding-horizontal: ${({ paddingHorizontal = "0" }) => paddingHorizontal};
    margin: ${({ margin = "0" }) => margin};
    margin-vertical: ${({ marginVertical = "0" }) => marginVertical};
    margin-horizontal: ${({ marginHorizontal = "0" }) => marginHorizontal};
    height: ${props => props.height || "50px"};
    border-radius: 10px;
    background-color: ${props => props.color || colors.purple};
    alignt-items: center;
    justify-content: center;
    width: 340px;
`;

export const TextBtn = styled(Text)`
    font-family: "SFUIText-Medium";
    font-size: 16px;
    color: #ffffff;
    text-align: center;
`;

export const FingerprintContainer = styled(View)`
    gap: 10px;
    align-items: center;
    justify-content: center;
`;
