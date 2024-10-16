import React from "react";
import { Image } from "react-native";
import IconApp from "../../assets/icon-app.svg";
import { PageContentText, PageSubtitle, PageTitle } from "./styles";
import { Row } from "@/src/styles-global";
import WomenImage = require("../../assets/images/woman-image.png");
import FloatingAnimatedButton from "@/src/components/buttons/FloatingAnimatedButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ONBOARDING_COMPLETE } from "@/src/utils/storage-consts";

const Onboarding = ({ navigation }) => {
    const handleOnboardingComplete = async () => {
        try {
            await AsyncStorage.setItem(ONBOARDING_COMPLETE, "true");
        } catch (error) {
            console.error("Error saving onboarding status: ", error);
        }
    };

    //= ==============================================================================================
    const onBoardingComplete = () => {
        navigation.navigate("Calendars");
        handleOnboardingComplete();
    };

    //= ==============================================================================================
    return (
        <>
            <Row paddingLeft="10px" paddingTop="20px" marginLeft="-20px">
                <IconApp width="90" height="90" />
                <PageTitle>Calendar.io</PageTitle>
            </Row>

            <PageSubtitle>Welcome Michael!</PageSubtitle>
            <PageContentText>It's Time to {"\n"}Organize your Day!</PageContentText>

            <Image
                source={WomenImage}
                resizeMode="contain"
                style={{ width: "100%", height: undefined, aspectRatio: 0.6 }}
            />
            <FloatingAnimatedButton onPress={onBoardingComplete} />
        </>
    );
};

export default Onboarding;
