import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import cross from "../../assets/img/cross.png";
import oval from "../../assets/img/o.png";

function GameResult({ winnerType, buttonPressed }) {
  const [show, setShow] = useState(false);

  const renderWinnerTypeIcon = () => {
    switch (winnerType) {
      case "cross":
        return <img src={cross} />;
      default:
        return <img src={oval} />;
    }
  };

  useEffect(() => {
    if (winnerType) return setShow(true);
  }, [winnerType]);

  return (
    <Modal show={show} dialogClassName="game-result" centered>
      <Modal.Header>
        <Modal.Title>
          <h2>YOU WON!</h2>
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
              onClick={() => {
                setShow(false);
                buttonPressed("quit");
              }}
            >
              QUIT
            </button>
            <button
              className="btn-yellow"
              onClick={() => {
                setShow(false);
                buttonPressed("again");
              }}
            >
              NEXT ROUND
            </button>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

export default GameResult;
