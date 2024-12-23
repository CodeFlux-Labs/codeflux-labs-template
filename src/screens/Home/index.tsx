import React from "react";
import DefaultButton from "@/src/components/buttons/DefaultButton";
import { Container, Subtitle, Title } from "@/src/styles-global";
import { StackNavigationProp } from "@react-navigation/stack";

type HomeProps = {
    navigation: StackNavigationProp<any>;
};

const Home: React.FC<HomeProps> = ({ navigation }) => {
    return (
        <Container>
            <Title centered>Welcome to the Evolog Expo Template</Title>
            <Subtitle>Home</Subtitle>
        </Container>
    );
};

export default Home;
