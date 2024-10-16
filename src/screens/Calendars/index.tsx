import { Container, Subtitle, Title } from "@/src/styles-global";
import React from "react";
import { StyleSheet } from "react-native";

const Calendars = () => {
    return (
        <Container>
        <Title>Welcome to the Codeflux Labs template</Title>
        <Subtitle>Screen 02</Subtitle>
    </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F0F0F0",
    },
    text: {
        fontSize: 20,
        color: "#333",
    },
});

export default Calendars;
