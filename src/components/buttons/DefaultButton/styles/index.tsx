import styled from "styled-components/native";
import { TouchableOpacity, Text } from "react-native";
import { colors } from "@/src/assets/colors";

interface DefaultBtnProps {
    paddingTop?: string;
    paddingRight?: string;
    paddingBottom?: string;
    paddingLeft?: string;
    marginTop?: string;
    marginRight?: string;
    marginBottom?: string;
    marginLeft?: string;
    height?: string;
    color?: string;
}

export const DefaultBtn = styled(TouchableOpacity)<DefaultBtnProps>`
    padding-top: ${props => props.paddingTop || "0px"};
    padding-right: ${props => props.paddingRight || "0px"};
    padding-bottom: ${props => props.paddingBottom || "0px"};
    padding-left: ${props => props.paddingLeft || "0px"};
    margin-top: ${props => props.marginTop || "0px"};
    margin-right: ${props => props.marginRight || "0px"};
    margin-bottom: ${props => props.marginBottom || "12px"};
    margin-left: ${props => props.marginLeft || "0px"};
    height: ${props => props.height || "50px"};
    border-radius: 10px;
    padding: 10px;
    background-color: ${props => props.color || colors.purple};
    alignt-items: center;
    justify-content: center;
`;

export const DefaultTextBtn = styled(Text)`
    font-family: "SFUIText-Medium";
    font-size: 16px;
    color: #ffffff;
    text-align: center;
`;
