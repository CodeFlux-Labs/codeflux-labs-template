import React from "react";
import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator } from "react-native-paper";
import { ContainerPadding, QuoteContainer, QuoteText } from "@/src/styles-global";
import { QuoteProps } from "@/src/types";
import SkeletonList from "@/src/components/skeleton/SkeletonList";

//= ==============================================================================================
interface QuotesListProps {
    data: QuoteProps[];
    isLoading: boolean;
    isRefetching: boolean;
    onEndReached?: () => void;
    onRefresh: () => void;
    isFetchingNextPage?: boolean;
}

//= ==============================================================================================
const QuotesList: React.FC<QuotesListProps> = ({
    data,
    isLoading,
    isRefetching,
    onEndReached,
    onRefresh,
    isFetchingNextPage,
}) => {
    if (isLoading || isRefetching) return <SkeletonList count={4} />;
    return (
        <ContainerPadding>
            <FlashList
                estimatedItemSize={90}
                data={data}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <QuoteContainer>
                        <QuoteText>{item.quote}</QuoteText>
                        <QuoteText>{item.author}</QuoteText>
                    </QuoteContainer>
                )}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
                onRefresh={onRefresh}
                refreshing={isRefetching}
            />
        </ContainerPadding>
    );
};
export default QuotesList;
