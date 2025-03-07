import React from "react";
import { View, useWindowDimensions } from "react-native";
import { ContainerCenter, Subtitle, Title } from "@/src/styles-global";
import { ScreenDefaultProps } from "@/src/types";
import { useGetQuotesInfinityScroll, useGetQuotesPaginated } from "@/src/api/hooks/useQuotesQuery";
import { TabView, SceneMap } from "react-native-tab-view";
import { CopilotStep, walkthroughable } from "react-native-copilot";
import PaginationControls from "@/src/components/lists/PaginationControls";
import QuotesList from "@/src/components/lists/QuotesList";
import { useHandleCopilotEventChanges, useSharedState, useStartTutorial } from "./controller";
import { useCheckBiometricHardware, useCheckForSavedFingerprints } from "evolog-core";

//= ==============================================================================================
const routes = [
    { key: "first", title: "Infinity Scroll" },
    { key: "second", title: "Pagination" },
];

const WalkthroughableTitle = walkthroughable(Title);
const WalkthroughableSubtitle = walkthroughable(Subtitle);
const WalkthroughableView = walkthroughable(View);

const Home: React.FC<ScreenDefaultProps> = ({ navigation }) => {
    const layout = useWindowDimensions();
    const { index, setIndex, page, setPage, limit } = useSharedState();

    useStartTutorial();
    useHandleCopilotEventChanges();
    let haveBiometricHardware = useCheckBiometricHardware();

    console.log("HaveBiometricHardware: ", haveBiometricHardware);

    //= ==============================================================================================
    const renderInfinityScrolling = () => {
        const {
            data,
            fetchNextPage,
            hasNextPage,
            isFetchingNextPage,
            refetch,
            isRefetching,
            isLoading,
        } = useGetQuotesInfinityScroll();

        const quotes = data?.pages.flatMap(page => page.quotes) || [];

        return (
            <>
                <QuotesList
                    data={quotes}
                    isLoading={isLoading}
                    isRefetching={isRefetching}
                    onEndReached={() => {
                        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
                    }}
                    onRefresh={refetch}
                    isFetchingNextPage={isFetchingNextPage}
                />
            </>
        );
    };

    //= ==============================================================================================
    const renderPagination = () => {
        const skip = (page - 1) * limit;

        const { data, isLoading, refetch, isRefetching } = useGetQuotesPaginated({
            skip,
        });

        const quotes = data?.quotes ?? [];

        return (
            <>
                <QuotesList
                    data={quotes}
                    isLoading={isLoading}
                    isRefetching={isRefetching}
                    onRefresh={refetch}
                />

                <PaginationControls
                    page={page}
                    setPage={setPage}
                    total={data?.total || 0}
                    limit={limit}
                    skip={skip}
                />
            </>
        );
    };

    //= ==============================================================================================
    return (
        <>
            <ContainerCenter>
                <CopilotStep name="title" text="This is a title" order={1}>
                    <WalkthroughableTitle centered>
                        Welcome to the Evolog Expo Template
                    </WalkthroughableTitle>
                </CopilotStep>
                <CopilotStep name="subtitle" text="This is a subtitle" order={2}>
                    <WalkthroughableSubtitle>Home</WalkthroughableSubtitle>
                </CopilotStep>
            </ContainerCenter>

            <CopilotStep
                name="tabview"
                text="This is a tabview using react-native-tab-view"
                order={3}>
                <WalkthroughableView style={{ flex: 1 }}>
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={SceneMap({
                            first: renderInfinityScrolling,
                            second: renderPagination,
                        })}
                        onIndexChange={setIndex}
                        initialLayout={{ width: layout.width }}
                        pagerStyle={{ paddingTop: 20 }}
                    />
                </WalkthroughableView>
            </CopilotStep>
        </>
    );
};

export default Home;
