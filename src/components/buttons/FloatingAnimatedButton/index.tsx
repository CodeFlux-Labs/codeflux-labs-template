import { useEffect, useRef } from "react";
import { GestureResponderEvent, Animated, Easing } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { FloatingBtn } from "./styles";

//= ==============================================================================================
interface FloatingAnimatedButtonProps {
    onPress: (event: GestureResponderEvent) => void; // Type the onPress prop
}

//= ==========================================================================================
const FloatingAnimatedButton: React.FC<FloatingAnimatedButtonProps> = ({ onPress }) => {
    const translateX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animateIcon = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(translateX, {
                        toValue: 35, // Adjust the distance as needed
                        duration: 1500,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                    Animated.timing(translateX, {
                        toValue: -5,
                        duration: 1000,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                ]),
            ).start();
        };

        animateIcon();
    }, [translateX]);

    return (
        <FloatingBtn onPress={onPress}>
            <Animated.View style={{ transform: [{ translateX }] }}>
                <FontAwesome name="chevron-right" size={24} color="white" />
            </Animated.View>
        </FloatingBtn>
    );
};

export default FloatingAnimatedButton;
