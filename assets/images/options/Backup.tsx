import * as React from "react";
import Svg, { Circle, Path, SvgProps } from "react-native-svg";
const Backup = (props: SvgProps) => (
  <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
    <Circle cx={16} cy={16} r={16} fill="#241309" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M25 11.8438C25 15.0712 22.3837 17.6875 19.1562 17.6875H15.4375V19.8125H13.3125V21.9375L12.25 23H8V18.75L13.4862 13.2638C13.3727 12.8092 13.3125 12.3335 13.3125 11.8438C13.3125 8.61633 15.9288 6 19.1562 6C22.3837 6 25 8.61633 25 11.8438ZM21.8125 10.25C21.8125 10.8368 21.3368 11.3125 20.75 11.3125C20.1632 11.3125 19.6875 10.8368 19.6875 10.25C19.6875 9.6632 20.1632 9.1875 20.75 9.1875C21.3368 9.1875 21.8125 9.6632 21.8125 10.25Z"
      fill="#FEAF04"
    />
  </Svg>
);
export default Backup;
