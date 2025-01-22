import React, { useState } from "react";
import { Button, Text } from "react-native";
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
import { View, useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";

const routes = [
    { key: "first", title: "Infinity Scroll" },
    { key: "second", title: "Pagination" },
];

const Home: React.FC<ScreenDefaultProps> = ({ navigation }) => {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);

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
                        renderItem={({ item }) => renderQuotes(item.quote, item.author)}
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
                <Title centered>Welcome to the Evolog Expo Template</Title>
                <Subtitle>Home</Subtitle>
            </ContainerCenter>

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                pagerStyle={{ paddingTop: 20 }}
            />
        </>
    );
};

export default Home;
