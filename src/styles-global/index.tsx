import styled from "styled-components/native";
import { View, TextInput, Text } from "react-native";
import { colors } from "../assets/colors";

interface RowProps {
    paddingTop?: string;
    paddingRight?: string;
    paddingBottom?: string;
    paddingLeft?: string;
    marginTop?: string;
    marginRight?: string;
    marginBottom?: string;
    marginLeft?: string;
    gap?: string;
}

export const Row = styled(View)<RowProps>`
    flex-direction: row;
    align-items: center;
    padding-top: ${props => props.paddingTop || "0px"};
    padding-right: ${props => props.paddingRight || "0px"};
    padding-bottom: ${props => props.paddingBottom || "0px"};
    padding-left: ${props => props.paddingLeft || "0px"};
    margin-top: ${props => props.marginTop || "0px"};
    margin-right: ${props => props.marginRight || "0px"};
    margin-bottom: ${props => props.marginBottom || "0px"};
    margin-left: ${props => props.marginLeft || "0px"};
    gap: ${props => props.gap || "0px"};
`;

export const RootView = styled(View)`
    flex: 1;
    padding: 20px 10px 15px 10px;
`;

interface TextInputProps {
    paddingTop?: string;
    paddingRight?: string;
    paddingBottom?: string;
    paddingLeft?: string;
    marginTop?: string;
    marginRight?: string;
    marginBottom?: string;
    marginLeft?: string;
    height?: string;
}

export const DefaultTextInput = styled(TextInput)<TextInputProps>`
    padding-top: ${props => props.paddingTop || "5px"};
    padding-right: ${props => props.paddingRight || "5px"};
    padding-bottom: ${props => props.paddingBottom || "5px"};
    padding-left: ${props => props.paddingLeft || "14px"};
    margin-top: ${props => props.marginTop || "0px"};
    margin-right: ${props => props.marginRight || "0px"};
    margin-bottom: ${props => props.marginBottom || "12px"};
    margin-left: ${props => props.marginLeft || "0px"};
    border-width: 1px;
    border-color: ${colors.lightGrayishBlue};
    border-radius: 10px;
    height: ${props => props.height || "50px"};
`;

interface SectionTitleProps {
    paddingTop?: string;
    paddingRight?: string;
    paddingBottom?: string;
    paddingLeft?: string;
    marginTop?: string;
    marginRight?: string;
    marginBottom?: string;
    marginLeft?: string;
    height?: string;
}

export const SectionTitle = styled(Text)<SectionTitleProps>`
    padding-top: ${props => props.paddingTop || "0px"};
    padding-right: ${props => props.paddingRight || "0px"};
    padding-bottom: ${props => props.paddingBottom || "0px"};
    padding-left: ${props => props.paddingLeft || "0px"};
    margin-top: ${props => props.marginTop || "0px"};
    margin-right: ${props => props.marginRight || "0px"};
    margin-bottom: ${props => props.marginBottom || "12px"};
    margin-left: ${props => props.marginLeft || "0px"};
    font-family: "SFUIText-Medium";
    font-size: 16px;
    color: ${colors.secondary};
`;

interface TextErrorProps {
    paddingTop?: string;
    paddingRight?: string;
    paddingBottom?: string;
    paddingLeft?: string;
    marginTop?: string;
    marginRight?: string;
    marginBottom?: string;
    marginLeft?: string;
    height?: string;
}

export const TextError = styled(Text)<TextErrorProps>`
    padding-top: ${props => props.paddingTop || "0px"};
    padding-right: ${props => props.paddingRight || "0px"};
    padding-bottom: ${props => props.paddingBottom || "0px"};
    padding-left: ${props => props.paddingLeft || "0px"};
    margin-top: ${props => props.marginTop || "0px"};
    margin-right: ${props => props.marginRight || "10px"};
    margin-bottom: ${props => props.marginBottom || "0px"};
    margin-left: ${props => props.marginLeft || "0px"};
    font-family: "SFUIText-Medium";
    font-size: 14px;
    color: red;
`;
