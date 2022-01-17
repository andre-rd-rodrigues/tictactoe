import React from "react";
import cross from "../../assets/img/cross.png";
import oval from "../../assets/img/o.png";
import Toggle from "./Toggle";

const WelcomeScreen = ({ userSeletedType, gameTypeSelected }) => {
  return (
    <div id="welcome-screen">
      <div className="welcome-screen-images">
        <img src={cross} />
        <img src={oval} />
      </div>
      <div className="player-mark">
        <p>PICK PLAYER 1'S MARK</p>
        <Toggle
          userSeletectedType={(selectedType) => userSeletedType(selectedType)}
        />
        <span>REMEMBER : X GOES FIRST</span>
      </div>
      <div className="welcome-screen-buttons">
        <button className="btn-yellow" onClick={() => gameTypeSelected("cpu")}>
          NEW GAME (VS CPU)
        </button>
        <button
          className="btn-green"
          onClick={() => gameTypeSelected("player")}
        >
          NEW GAME (VS PLAYER)
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
