import React from "react";
import { View, Button, Text } from "react-native";

interface PaginationControlsProps {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    total: number;
    limit: number;
    skip: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
    page,
    setPage,
    total,
    limit,
    skip,
}) => (
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
            disabled={total <= skip + limit}
        />
    </View>
);
export default PaginationControls;
