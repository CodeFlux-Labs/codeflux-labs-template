import React from "react";
import DefaultButton from "@/src/components/buttons/DefaultButton";
import { Container, Subtitle, Title } from "@/src/styles-global";
import { StackNavigationProp } from "@react-navigation/stack";
import { useCreateUser } from "@/src/api/hooks/useUserQuery";
import User from "@/src/types";

type UpdatePasswordProps = {
    navigation: StackNavigationProp<any>;
};

const UpdatePassword: React.FC<UpdatePasswordProps> = ({ navigation }) => {
    const { mutate, isPending } = useCreateUser({
        onSuccess: data => {
            console.log("User created successfully:", data);
        },
        onError: error => {
            console.error("Error creating user:", error.message);
        },
        onSettled: () => {
            console.log("Mutation is settled.");
        },
    });

    const handleCreateUser = () => {
        const user: User = { name: "Test", email: "test@gmail.com" };
        mutate(user);
    };

    return (
        <Container>
            <Title centered>Welcome to the Codeflux Labs template</Title>
            <Subtitle>UpdatePassword</Subtitle>
            <DefaultButton
                label="Go To Onboarding Screen"
                onPress={() => navigation.navigate("Onboarding")}
                style={{ marginTop: 20 }}
            />
        </Container>
    );
};

export default UpdatePassword;
