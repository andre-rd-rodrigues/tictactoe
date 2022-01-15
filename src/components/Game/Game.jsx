import React, { useState, useEffect } from "react";
import GameResult from "../GameResult/GameResult";
import cross from "../../assets/img/cross.png";
import oval from "../../assets/img/o.png";
import { allEqual } from "../../utilities/methods";
import { originalMatrix } from "../../utilities/localDb";
const cloneDeep = require("lodash.clonedeep");

function Game() {
  const [matrix, setMatrix] = useState([
    {
      colId: 1,
      colRow: {
        rowId: 1,
        rowSquares: [
          { id: 1, selected: false, type: undefined },
          { id: 2, selected: false, type: undefined },
          { id: 3, selected: false, type: undefined }
        ]
      }
    },
    {
      colId: 2,
      colRow: {
        rowId: 2,
        rowSquares: [
          { id: 4, selected: false, type: undefined },
          { id: 5, selected: false, type: undefined },
          { id: 6, selected: false, type: undefined }
        ]
      }
    },
    {
      colId: 3,
      colRow: {
        rowId: 3,
        rowSquares: [
          { id: 7, selected: false, type: undefined },
          { id: 8, selected: false, type: undefined },
          { id: 9, selected: false, type: undefined }
        ]
      }
    }
  ]);
  const [lastType, setLastType] = useState("oval");
  const [userType, setUserType] = useState(undefined);
  const [winnerType, setWinnerType] = useState(undefined);

  /* Select */
  const handleSelect = (colId, squareId) => {
    let matrixCopy = cloneDeep(matrix);
    let matrixCol = matrixCopy[colId - 1];
    const squareIndex = matrixCol.colRow.rowSquares.findIndex(
      (item) => item.id === squareId
    );
    const selected = matrixCol.colRow.rowSquares[squareIndex].selected;
    const type = matrixCol.colRow.rowSquares[squareIndex].type;

    matrixCol.colRow.rowSquares[squareIndex].selected = !selected;
    matrixCol.colRow.rowSquares[squareIndex].type = changeType(type);

    return setMatrix(matrixCopy);
  };
  const changeType = (currentType) => {
    if (currentType) {
      return;
    } else {
      if (lastType === "cross") {
        setLastType("oval");
        return "oval";
      } else {
        setLastType("cross");
        return "cross";
      }
    }
  };

  /* Check winner */
  const checkWinner = () => {
    const checkVerticalWin = () => {
      const columnsArray = matrix.map((col) =>
        col.colRow.rowSquares.map((square) => square)
      );
      const isWinner = columnsArray.map((col) => allEqual(col)).includes(true);
      return isWinner;
    };
    const checkHorizontalWin = () => {
      const rowSquares = matrix.flatMap((col) => col.colRow.rowSquares);
      let rowSquaresArray = [];

      for (let index = 0; index < 3; index++) {
        let row = [];
        for (let i = 1; i < rowSquares.length; i += 3) {
          row.push(rowSquares[i - 1 + index]);
        }
        rowSquaresArray.push(row);
      }

      const isWinner = rowSquaresArray
        .map((col) => allEqual(col))
        .includes(true);
      return isWinner;
    };
    const checkDiagonalWin = () => {
      const rowSquares = matrix.flatMap((col) => col.colRow.rowSquares);

      const getFirstSequence = () => {
        let firstSequence = [];
        for (let i = 1; i <= 9; i += 4) {
          firstSequence.push(rowSquares[i - 1]);
        }
        return firstSequence;
      };
      const getSecondSequence = () => {
        let secondSequence = [];
        for (let i = 3; i <= 7; i += 2) {
          secondSequence.push(rowSquares[i - 1]);
        }
        return secondSequence;
      };

      const isWinner = () => {
        const firstSequence = allEqual(getFirstSequence());
        const secondSequence = allEqual(getSecondSequence());

        if (firstSequence || secondSequence) return true;
        return false;
      };

      return isWinner();
    };

    if (checkVerticalWin() || checkHorizontalWin() || checkDiagonalWin())
      return !winnerType && setWinnerType(lastType);
  };

  /* Game */
  const gameBoard = () => {
    return matrix.map((col) => (
      <div className="game-row" key={col.colId}>
        {col.colRow.rowSquares.map((square) => (
          <div
            className="game-square"
            key={square.id}
            onClick={() => handleSelect(col.colId, square.id)}
          >
            {renderIcon(square.selected, square.type)}
          </div>
        ))}
      </div>
    ));
  };
  const renderIcon = (selected, type) => {
    if (selected) {
      switch (type) {
        case "cross":
          return <img src={cross} />;

        default:
          return <img src={oval} />;
      }
    }
  };

  const handleRestart = () => {
    setMatrix(originalMatrix);
    setWinnerType(undefined);
    console.log("restarted");
  };
  /* Lifecycle */
  useEffect(() => {
    gameBoard();
    checkWinner();
  }, [matrix, lastType]);

  return (
    <div id="game-container">
      <div className="game-info"></div>
      {gameBoard()}
      <div className="game-score"></div>
      <GameResult winnerType={winnerType} onExited={() => handleRestart()} />
    </div>
  );
}

export default Game;
