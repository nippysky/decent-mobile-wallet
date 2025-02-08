import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const DappInactive = (props: SvgProps) => (
  <Svg width={23} height={23} viewBox="0 0 25 26" fill="none" {...props}>
    <Path
      d="M6.82069 12.1152L16.7919 7.71271L12.3909 17.6975V13.1314C12.3909 12.862 12.2838 12.6035 12.0933 12.4129L12.0933 12.4129C11.9027 12.2223 11.6442 12.1152 11.3747 12.1152H6.82069Z"
      fill="#8E8E8E"
      stroke="#8E8E8E"
      strokeWidth={1.5625}
    />
    <Path
      d="M23.5046 12.5738C23.5046 6.18409 18.4645 1 12.2523 1C6.04009 1 1 6.18409 1 12.5738C1 18.9635 6.04009 24.1476 12.2523 24.1476C18.4645 24.1476 23.5046 18.9635 23.5046 12.5738Z"
      stroke="#8E8E8E"
      strokeWidth={2}
      strokeMiterlimit={10}
    />
  </Svg>
);
export default DappInactive;
