import React from "react";
import { Button, Text } from "react-native";
import { Container, Subtitle, Title } from "@/src/styles-global";
import { StackNavigationProp } from "@react-navigation/stack";
import DefaultButton from "@/src/components/buttons/DefaultButton";
import { useStore } from "@/src/stores/useGlobalStore";

type OnboardingProps = {
    navigation: StackNavigationProp<any>;
};

const Onboarding: React.FC<OnboardingProps> = ({ navigation }) => {
    const { setIsOnboardingCompleted } = useStore();

    const onboardingCompleted = () => {
        setIsOnboardingCompleted(true);
    };

    return (
        <Container>
            <Title centered>Welcome to the Evolog Expo Template</Title>
            <Subtitle>Onboarding</Subtitle>
            <DefaultButton label="Go To Sign Screen" onPress={onboardingCompleted} />
        </Container>
    );
};

export default Onboarding;
