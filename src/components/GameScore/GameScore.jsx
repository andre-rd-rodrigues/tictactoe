import React from "react";

const GameScore = ({ points, userMark, gameType }) => {
  const renderUserMarkHTML = (divType) => {
    if (gameType !== "player") {
      if (userMark === divType) return "(YOU)";
      return "(CPU)";
    }
  };

  return (
    <div id="game-score-row">
      <div className="game-score-col col-x">
        <p>X {renderUserMarkHTML("cross")}</p>
        <p className="game-score-number">{points.cross}</p>
      </div>
      <div className="game-score-col col-ties">
        <p>TIES</p>
        <p className="game-score-number">{points.ties}</p>
      </div>
      <div className="game-score-col col-o">
        <p>O {renderUserMarkHTML("oval")}</p>
        <p className="game-score-number">{points.oval}</p>
      </div>
    </div>
  );
};

export default GameScore;
