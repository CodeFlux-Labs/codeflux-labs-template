import React from "react";
import DefaultButton from "@/src/components/buttons/DefaultButton";
import { Container, Hr, Label, Row, Subtitle, Title } from "@/src/styles-global";
import InputIcon from "@/src/components/InputIcon";
import LinkButton from "@/src/components/buttons/LinkButton";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthUserQuery } from "@/src/api/hooks/useUserQuery";
import {
    defaultValues,
    SignInFormValues,
    SignInProps,
    SignInSchema,
    useOnHandleSubmit,
    usePrefillEmailIfExists,
    useSharedState,
} from "./logic";
import FingerprintButton from "@/src/components/buttons/FingerprintButton";
import { useBiometricLogin } from "@/src/hooks/biometric/useBiometric";

//= ==============================================================================================
const SignIn: React.FC<SignInProps> = () => {
    const { tooglePassword, setTooglePassword } = useSharedState();
    const onHandleSubmit = useOnHandleSubmit();
    const { isAuthenticated, authenticate } = useBiometricLogin();
    const { mutate, isPending } = useAuthUserQuery();

    // 🔹 Form Hook
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<SignInFormValues>({
        defaultValues,
        resolver: zodResolver(SignInSchema),
    });

    // 🔹 Prefill username if email exists
    usePrefillEmailIfExists(setValue);

    // 🔹 Input Field Renderer
    const renderInput = (name: keyof SignInFormValues, placeholder: string, secure = false) => (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value } }) => (
                <InputIcon
                    placeholder={placeholder}
                    placeholderTextColor="#B0BEC5"
                    autoCapitalize="none"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    secureTextEntry={secure && tooglePassword}
                    iconName={secure ? (tooglePassword ? "eye" : "eye-slash") : undefined}
                    onPressIcon={secure ? () => setTooglePassword(!tooglePassword) : undefined}
                    errors={errors[name]?.message || null}
                />
            )}
        />
    );

    return (
        <Container>
            <Title>Welcome Back, Evolog Expo Template!</Title>
            <Subtitle>
                We are excited to have you back. Log in now and access your account.
            </Subtitle>

            {renderInput("username", "Username")}
            {renderInput("password", "Password", true)}

            <LinkButton label="Forgot your password?" onPress={() => null} />

            <DefaultButton
                label="Login"
                onPress={handleSubmit(auth => onHandleSubmit(auth, mutate))}
                style={{ marginTop: 30 }}
                loading={isPending}
            />

            <FingerprintButton style={{ marginTop: 30 }} onPress={authenticate} />

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
