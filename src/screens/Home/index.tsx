import React from "react";
import DefaultButton from "@/src/components/buttons/DefaultButton";
import { Container, Subtitle, Title } from "@/src/styles-global";
import { StackNavigationProp } from "@react-navigation/stack";

type HomeProps = {
    navigation: StackNavigationProp<any>;
};

const Onboarding: React.FC<HomeProps> = ({ navigation }) => {
    return (
        <Container>
            <Title centered>Welcome to the Codeflux Labs template</Title>
            <Subtitle>Onboarding</Subtitle>
            <DefaultButton label="Go To Onboarding Screen" onPress={() => navigation.navigate("Onboarding")} style={{marginTop: 20}} />
        </Container>
    );
};

export default Onboarding;
