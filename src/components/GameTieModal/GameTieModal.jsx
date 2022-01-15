import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
//styles in gamewinnermodal.scss

const GameTieModal = ({ tie }) => {
  const [show, setShow] = useState(false);

  /* Lifecycle */
  useEffect(() => {
    if (tie) return setShow(true);
    return setShow(false);
  }, [tie]);

  return (
    <Modal show={show} dialogClassName="game-result" centered>
      <Modal.Header>
        <Modal.Title>
          <h2>NO WINNER</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="game-result-winner">
            <h1 style={{ color: "#a8bec9", marginLeft: 0 }}>TIED GAME!</h1>
          </div>
          <div className="game-result-actions">
            <button className="btn-grey" onClick={() => setShow(false)}>
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
};

export default GameTieModal;
