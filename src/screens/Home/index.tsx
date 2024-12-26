import React from "react";
import { Text } from "react-native";
import { Container, Subtitle, Title } from "@/src/styles-global";
import { ScreenDefaultProps } from "@/src/types";
import { useGetQuotes } from "@/src/api/hooks/useQuotesQuery";
import { ActivityIndicator } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";

const Home: React.FC<ScreenDefaultProps> = ({ navigation }) => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetQuotes();

    const quotes = data?.pages.flatMap(page => page.quotes) || [];

    return (
        <Container>
            <Title centered>Welcome to the Evolog Expo Template</Title>
            <Subtitle>Home</Subtitle>

            <FlashList
                estimatedItemSize={200}
                data={quotes}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <Text>{item.quote}</Text>}
                onEndReached={() => {
                    if (hasNextPage) fetchNextPage();
                }}
                onEndReachedThreshold={0.5}
                ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
            />
        </Container>
    );
};

export default Home;
