import styled from "styled-components/native";
import { View } from "react-native";
import { colors } from "@/src/assets/colors";

interface ContainerTextInpProps {
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

export const ContainerTextInp = styled(View)<ContainerTextInpProps>`
    padding-top: ${props => props.paddingTop || "0px"};
    padding-right: ${props => props.paddingRight || "0px"};
    padding-bottom: ${props => props.paddingBottom || "0px"};
    padding-left: ${props => props.paddingLeft || "0px"};
    margin-top: ${props => props.marginTop || "0px"};
    margin-right: ${props => props.marginRight || "0px"};
    margin-bottom: ${props => props.marginBottom || "0px"};
    margin-left: ${props => props.marginLeft || "0px"};
    justify-content: center;
    position: relative;
`;
