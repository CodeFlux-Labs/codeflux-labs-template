import React, { useEffect, useState } from "react";
import { Button, Text, View, useWindowDimensions } from "react-native";
import {
    ContainerCenter,
    ContainerPadding,
    QuoteContainer,
    QuoteText,
    Subtitle,
    Title,
} from "@/src/styles-global";
import { QuoteProps, ScreenDefaultProps } from "@/src/types";
import { useGetQuotesInfinityScroll, useGetQuotesPaginated } from "@/src/api/hooks/useQuotesQuery";
import { ActivityIndicator } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { TabView, SceneMap } from "react-native-tab-view";
import { CopilotStep, walkthroughable, useCopilot } from "react-native-copilot";
import { useTutorialStore } from "@/src/stores/useTutorialStore";

const routes = [
    { key: "first", title: "Infinity Scroll" },
    { key: "second", title: "Pagination" },
];

const WalkthroughableTitle = walkthroughable(Title);
const WalkthroughableSubtitle = walkthroughable(Subtitle);
const WalkthroughableView = walkthroughable(View);

const Home: React.FC<ScreenDefaultProps> = ({ navigation }) => {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const { start, copilotEvents } = useCopilot();
    const { setHomeTutorialCompleted, homeTutorialCompleted } = useTutorialStore();

    useEffect(() => {
        if (!homeTutorialCompleted) start();
    }, []);

    useEffect(() => {
        copilotEvents.on("stepChange", step => {
            console.log(`stepChange: ${step?.name}`);
        });
        copilotEvents.on("start", () => {
            console.log(`start`);
        });
        copilotEvents.on("stop", () => {
            console.log(`stop`);
            setHomeTutorialCompleted(true);
        });
    }, [copilotEvents]);

    const renderQuotes = (text: string, author: string) => {
        return (
            <QuoteContainer>
                <QuoteText>{text}</QuoteText>
                <QuoteText>{author}</QuoteText>
            </QuoteContainer>
        );
    };

    const renderInfinityScrolling = () => {
        const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch, isRefetching } =
            useGetQuotesInfinityScroll();

        const quotes = data?.pages.flatMap(page => page.quotes) || [];

        return (
            <>
                <ContainerPadding>
                    <FlashList
                        estimatedItemSize={90}
                        data={quotes}
                        keyExtractor={(item: QuoteProps) => item.id.toString()}
                        renderItem={({ item }) => renderQuotes(item.quote, item.author)}
                        onEndReached={() => {
                            if (hasNextPage && !isFetchingNextPage) fetchNextPage();
                        }}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
                        onRefresh={() => refetch()}
                        refreshing={isRefetching}
                    />
                </ContainerPadding>
            </>
        );
    };

    const renderPagination = () => {
        const [page, setPage] = useState(1);
        const limit = 10;
        const skip = (page - 1) * limit;

        const { data, isLoading, refetch, isRefetching } = useGetQuotesPaginated({
            skip,
        });

        const quotes = data?.quotes ?? [];

        return (
            <>
                <ContainerPadding>
                    <FlashList
                        estimatedItemSize={90}
                        data={quotes}
                        keyExtractor={(item: QuoteProps) => item.id.toString()}
                        renderItem={({ item, index }) =>
                            renderQuotes(item.quote, item.author, index)
                        }
                        ListEmptyComponent={() =>
                            isLoading ? <Text>Loading...</Text> : <Text>No data</Text>
                        }
                        onRefresh={() => refetch()}
                        refreshing={isRefetching}
                    />

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Button
                            title="Previous"
                            onPress={() => setPage(prev => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                        />
                        <Text>Page {page}</Text>
                        <Button
                            title="Next"
                            onPress={() => setPage(prev => prev + 1)}
                            disabled={data?.total <= skip + limit}
                        />
                    </View>
                </ContainerPadding>
            </>
        );
    };

    const renderScene = SceneMap({
        first: renderInfinityScrolling,
        second: renderPagination,
    });

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
                        renderScene={renderScene}
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
