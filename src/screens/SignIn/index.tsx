import React, { useEffect } from "react";
import DefaultButton from "@/src/components/buttons/DefaultButton";
import { Container, Hr, Label, Row, Subtitle, Title } from "@/src/styles-global";
import InputIcon from "@/src/components/InputIcon";
import LinkButton from "@/src/components/buttons/LinkButton";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuthUserQuery } from "@/src/api/hooks/useUserQuery";
import { useOnHandleSubmit, useSharedState } from "./logic";
import FingerprintButton from "@/src/components/buttons/FingerprintButton";
import { useBiometricLogin } from "@hooks/index";
import { useUserStore } from "@/src/stores/useUserStore";

const SignInSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

type SignInFormValuesInfer = z.infer<typeof SignInSchema>;

type SignInProps = {
    navigation: StackNavigationProp<any>;
};

const SignIn: React.FC<SignInProps> = ({ navigation }) => {
    const { tooglePassword, setTooglePassword } = useSharedState();
    const onHandleSubmit = useOnHandleSubmit();
    const { email } = useUserStore();

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<SignInFormValuesInfer>({
        defaultValues: {
            username: "",
            password: "",
        },
        resolver: zodResolver(SignInSchema),
    });

    const { mutate, isPending } = useAuthUserQuery();

    async function handleBiometricLogin() {
        const biometricLogin = await useBiometricLogin();

        console.log("biometricLogin: ", biometricLogin, email);
    }

    useEffect(() => {
        if (email) setValue("username", email);
    }, []);

    return (
        <Container>
            <Title>Welcome Back, Evolog Expo Template!</Title>
            <Subtitle>
                We are excited to have your back. Log in now and access your account.
            </Subtitle>

            <Controller
                control={control}
                name="username"
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputIcon
                        placeholder="Username"
                        placeholderTextColor="#B0BEC5"
                        autoCapitalize="none"
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        errors={errors.username ? errors.username.message : null}
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
                        autoCapitalize="none"
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
                onPress={handleSubmit(auth => onHandleSubmit(auth, mutate))}
                style={{ marginTop: 30 }}
                loading={isPending}
            />

            <FingerprintButton style={{ marginTop: 30 }} onPress={() => handleBiometricLogin()} />

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
