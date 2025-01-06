import * as React from "react";
import Svg, { Path } from "react-native-svg";
const CarIcon = (props) => (
  <Svg
    width={800}
    height={800}
    viewBox="0 0 800 800"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M150 50L83.3335 250H0V400H50V750H150V650H650V750H750V400H800V250H716.665L650 50H150ZM200 450C172.386 450 150 472.386 150 500C150 527.615 172.386 550 200 550C227.614 550 250 527.615 250 500C250 472.386 227.614 450 200 450ZM577.925 150H222.076L155.41 350H644.59L577.925 150ZM600 450C572.385 450 550 472.386 550 500C550 527.615 572.385 550 600 550C627.615 550 650 527.615 650 500C650 472.386 627.615 450 600 450Z"
      fill="black"
    />
  </Svg>
);
export default CarIcon;
