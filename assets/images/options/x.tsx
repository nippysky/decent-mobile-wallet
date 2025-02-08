import * as React from "react";
import Svg, { Circle, Path, SvgProps } from "react-native-svg";
const X = (props: SvgProps) => (
  <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
    <Circle cx={16} cy={16} r={16} fill="black" />
    <Path
      d="M17.3333 14.9287L22.5459 9H21.3111L16.7831 14.1468L13.1692 9H9L14.4661 16.7836L9 23H10.2348L15.0135 17.5637L18.8308 23H23M10.6805 9.91111H12.5775L21.3102 22.1337H19.4127"
      fill="white"
    />
  </Svg>
);
export default X;
