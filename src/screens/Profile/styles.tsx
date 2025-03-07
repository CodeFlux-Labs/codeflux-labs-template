import styled from "styled-components/native";
import { Image, TouchableOpacity } from "react-native";
import { colors } from "@/src/assets/colors";

export const ProfilePicture = styled(Image)`
    width: 60px;
    height: 60px;
    border-radius: ${60 / 2}px;
    background-color: ${colors.purple};
`;

export const SettingItem = styled(TouchableOpacity)`
    margin: 18px 0 18px 0;
`;
