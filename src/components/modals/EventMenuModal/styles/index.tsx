import styled from "styled-components/native";
import { Text, View } from "react-native";
import { colors } from "@/src/assets/colors";

export const ModalText = styled(Text)`
    font-family: "SFUIText-Semibold";
    font-size: 18px;
    color: ${colors.secondary};
    margin-top: 5px;
    text-align: center;
`;

export const ModalContainer = styled(View)`
    flex: 1;
    padding: 20px 15px 20px 15px;
    gap: 20px;
    justify-content: center;
`;
