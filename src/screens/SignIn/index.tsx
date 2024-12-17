import React, { useState } from "react";
import DefaultButton from "@/src/components/buttons/DefaultButton";
import { Container, Hr, Label, Row, Subtitle, Title } from "@/src/styles-global";
import InputIcon from "@/src/components/InputIcon";
import LinkButton from "@/src/components/buttons/LinkButton";
import { useNotification } from "@/src/context/NotificationContext";
import { useAuthUserQuery } from "@/src/api/hooks/useUserQuery";
import User from "@/src/types";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { StackNavigationProp } from "@react-navigation/stack";

const SignInSchema = z.object({
    email: z.string().email("Invalid email address").nonempty("Email is required"),
    password: z.string().min(1, "Password is required"),
});

type SignInFormValues = z.infer<typeof SignInSchema>;

type SignInProps = {
    navigation: StackNavigationProp<any>;
};

const SignIn: React.FC<SignInProps> = ({ navigation }) => {
    const [tooglePassword, setTooglePassword] = useState(false);
    const [toogleRememberMe, setToogleRememberMe] = useState(false);
    const { showNotification } = useNotification();
    const [loading, setLoading] = useState(false);

    // const { mutate, isPending } = useAuthUserQuery({
    //     onSuccess: data => {
    //         console.log("User created successfully:", data);
    //     },
    //     onError: error => {
    //         console.error("Error creating user:", error.message);
    //     },
    //     onSettled: () => {
    //         console.log("Mutation is settled.");
    //     },
    // });

    // const handleCreateUser = () => {
    //     const user: User = { name: "Test", email: "test@gmail.com" };
    //     mutate(user);
    // };
    const { isPending, error, data, isFetching, refetch } = useAuthUserQuery();

    const {
        control,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<SignInFormValues>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(SignInSchema),
    });

    const onSubmit = async auth => {
        try {
            refetch();
            setLoading(true);
            console.log("Auth: ", auth);
        } catch (error) {
            console.error("Validation error: ", error);
        }
    };

    return (
        <Container>
            <Title>Welcome Back, Evolog Expo Template!</Title>
            <Subtitle>
                We are excited to have your back. Log in now and access your account.
            </Subtitle>

            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputIcon
                        placeholder="Email"
                        placeholderTextColor="#B0BEC5"
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        keyboardType="email-address"
                        errors={errors.email ? errors.email.message : null}
                    />
                )}
            />

            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputIcon
                        iconName={tooglePassword ? "eye" : "eye-slash"}
                        placeholder="Password"
                        placeholderTextColor="#B0BEC5"
                        onChangeText={onChange}
                        onBlur={onBlur}
                        onPressIcon={() => setTooglePassword(!tooglePassword)}
                        value={value}
                        secureTextEntry={tooglePassword}
                        errors={errors.password ? errors.password.message : null}
                    />
                )}
            />

            <LinkButton label="Forgot your password?" onPress={() => null} />

            <DefaultButton
                label="Login"
                onPress={handleSubmit(onSubmit)}
                style={{ marginTop: 30 }}
                loading={isFetching}
            />

            <Row gap="10px" marginVertical="40px">
                <Hr />
                <Label>-</Label>
                <Hr />
            </Row>

            <Label>Ao fazer login você concorda com nossa</Label>
            <LinkButton label="Política de Privacidade" onPress={() => null} />
        </Container>
    );
};

export default SignIn;
