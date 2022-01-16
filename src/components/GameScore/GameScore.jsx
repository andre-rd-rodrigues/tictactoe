import React from "react";

const GameScore = ({ points }) => {
  return (
    <div id="game-score-row">
      <div className="game-score-col col-x">
        <p>X (YOU)</p>
        <p className="game-score-number">{points.user}</p>
      </div>
      <div className="game-score-col col-ties">
        <p>TIES</p>
        <p className="game-score-number">{points.ties}</p>
      </div>
      <div className="game-score-col col-o">
        <p>O (CPU)</p>
        <p className="game-score-number">{points.cpu}</p>
      </div>
    </div>
  );
};

export default GameScore;
