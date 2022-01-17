import React, { useState, useEffect } from "react";
import circleDark from "../../assets/img/circle-dark.png";
import circleWhite from "../../assets/img/circle-white.png";
import crossDark from "../../assets/img/cross-dark.png";
import crossWhite from "../../assets/img/cross-white.png";

//styles in welcomescreen.scss

const Toggle = ({ userSeletectedType }) => {
  const [selectedType, setType] = useState("cross");

  const handleClick = (userMark) => {
    if (userMark !== selectedType) return setType(userMark);
  };

  const renderStyling = (currentDiv) => {
    if (currentDiv === "cross" && selectedType === "cross") {
      return {
        backgroundColor: "#d6e2e9"
      };
    } else if (currentDiv === "oval" && selectedType === "oval") {
      return {
        backgroundColor: "#d6e2e9"
      };
    }
  };
  const renderMark = (currentDiv) => {
    if (currentDiv === "cross" && selectedType === "cross") {
      return crossDark;
    } else if (currentDiv === "cross" && selectedType === "oval") {
      return crossWhite;
    } else if (currentDiv === "oval" && selectedType === "oval") {
      return circleDark;
    } else {
      return circleWhite;
    }
  };

  useEffect(() => {
    userSeletectedType(selectedType);
  }, [selectedType]);

  return (
    <div id="game-toggle">
      <div
        style={renderStyling("cross")}
        onClick={() => handleClick("cross")}
        className="mark-div"
      >
        <img src={renderMark("cross")} />
      </div>
      <div
        style={renderStyling("oval")}
        onClick={() => handleClick("oval")}
        className="mark-div"
      >
        <img src={renderMark("oval")} />
      </div>
    </div>
  );
};

export default Toggle;
