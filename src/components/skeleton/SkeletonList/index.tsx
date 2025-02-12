import React from "react";
import { View } from "react-native";
import DefaultSkeleton from "../DefaultSkeleton";

interface SkeletonListProps {
    count: number;
}

const SkeletonList: React.FC<SkeletonListProps> = ({ count }) => {
    return (
        <>
            {Array.from({ length: count }, (_, index) => (
                <DefaultSkeleton key={index} />
            ))}
        </>
    );
};

export default SkeletonList;
