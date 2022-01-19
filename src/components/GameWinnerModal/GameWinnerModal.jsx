import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import cross from "../../assets/img/cross.png";
import oval from "../../assets/img/o.png";

function GameWinnerModal(props) {
  const [show, setShow] = useState(false);

  const { winnerType, gameType, userMark } = props;

  /* Render */
  const renderWinnerTypeIcon = () => {
    switch (winnerType) {
      case "cross":
        return <img src={cross} />;
      case "oval":
        return <img src={oval} />;
      default:
        return;
    }
  };
  const ResultMessage = () => {
    if (gameType === "cpu") {
      return <h2>{userMark === winnerType ? "YOU WON!" : "YOU LOOSE"}</h2>;
    } else {
      return <h2>{winnerType === "cross" ? "CROSS" : "CIRCLE"} WINS!</h2>;
    }
  };

  /* Lifecycle */
  useEffect(() => {
    if (winnerType && !show) return setShow(true);
    return setShow(false);
  }, [winnerType]);

  return (
    <Modal show={show} dialogClassName="game-result" centered {...props}>
      <Modal.Header>
        <Modal.Title>
          <ResultMessage />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="game-result-winner">
            {renderWinnerTypeIcon()}
            <h1
              style={{ color: winnerType === "cross" ? "#31c4be" : "#f2b236" }}
            >
              TAKES THE ROUND
            </h1>
          </div>
          <div className="game-result-actions">
            <button
              className="btn-grey"
              onClick={() => window.location.reload()}
            >
              QUIT
            </button>
            <button className="btn-yellow" onClick={() => setShow(false)}>
              NEXT ROUND
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default GameWinnerModal;
