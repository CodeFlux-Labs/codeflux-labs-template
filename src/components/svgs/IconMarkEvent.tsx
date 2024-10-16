import React from "react";
import Svg, { Path } from "react-native-svg";

interface IconProps {
    width?: string;
    height?: string;
    fill?: string;
}

const IconMarkEvent: React.FC<IconProps> = ({ width = "10", height = "11", fill = "#00B383" }) => (
    <Svg
        width={width}
        height={height}
        viewBox="0 0 10 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.89642 3.68485C3.75416 3.68485 2.82486 4.61416 2.82486 5.75641C2.82486 6.89867 3.75417 7.82797 4.89642 7.82797C6.03868 7.82797 6.96798 6.89866 6.96798 5.75641C6.96798 4.61415 6.03867 3.68485 4.89642 3.68485ZM4.89642 0.859989C7.60064 0.859989 9.79284 3.0522 9.79284 5.75641C9.79284 8.46063 7.60063 10.6528 4.89642 10.6528C2.19221 10.6528 0 8.46062 0 5.75641C0 3.0522 2.19221 0.859989 4.89642 0.859989Z"
            fill={fill}
        />
    </Svg>
);

export default IconMarkEvent;
