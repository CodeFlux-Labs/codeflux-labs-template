import { useCallback, useReducer } from "react";
import { Pressable, View } from "react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { styles } from "./styles";

const COLORS = {
    light: "#ffffff",
    dark: "#000000",
};

export default function DefaultSkeleton() {
    const [dark, toggle] = useReducer((s: boolean) => !s, false);
    const handleToggle = useCallback(() => toggle(), []);
    const colorMode = dark ? "dark" : "light";
    const backgroundColor = COLORS[colorMode];

    return (
        <Pressable onPress={handleToggle} style={[styles.container, { backgroundColor }]}>
            <MotiView
                transition={{ type: "timing" }}
                style={[styles.container2, styles.padded, styles.row]}
                animate={{ backgroundColor }}>
                <Skeleton colorMode={colorMode} radius="round" height={65} width={65} />
                <View>
                    <Skeleton colorMode={colorMode} width={250} height={24} />
                    <Spacer height={8} />
                    <Skeleton colorMode={colorMode} width="100%" height={24} />
                </View>
            </MotiView>
        </Pressable>
    );
}

const Spacer = ({ height = 16 }: { height?: number }) => <View style={{ height }} />;
