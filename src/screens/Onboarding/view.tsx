import React from "react";
import { Container, Subtitle, Title } from "@/src/styles-global";
import DefaultButton from "@/src/components/buttons/DefaultButton";
import { useOnOboardingIsCompleted } from "./controller";
import { ScreenDefaultProps } from "@/src/types";

const Onboarding: React.FC<ScreenDefaultProps> = ({ navigation }) => {
    const handleOnboardingComplete = useOnOboardingIsCompleted();

    return (
        <Container>
            <Title centered>Welcome to the Evolog Expo Template</Title>
            <Subtitle>Onboarding</Subtitle>
            <DefaultButton label="Go To Sign Screen" onPress={handleOnboardingComplete} />
        </Container>
    );
};

export default Onboarding;
