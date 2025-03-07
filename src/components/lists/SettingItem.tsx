import React from "react";
import { DefaultText, Row } from "@/src/styles-global";
import { SettingItem } from "./styles";
import { colors } from "@/src/assets/colors";

//= ==============================================================================================
interface SettingItemProps {
    label: string;
    actionComponent: React.FC;
    onPress: () => void;
}

//= ==============================================================================================
const renderSettingItem = (item: SettingItemProps) => {
    return (
        <SettingItem onPress={item.onPress} key={item.label} disabled={!item.label}>
            <Row gap="20px" style={{ justifyContent: "space-between" }}>
                {item.label && <DefaultText color={colors.primary}>{item.label}</DefaultText>}
                {item.actionComponent && item.actionComponent()}
            </Row>
        </SettingItem>
    );
};

export default renderSettingItem;
