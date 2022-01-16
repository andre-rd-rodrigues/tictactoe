import React, { useState, useEffect } from "react";
import GameWinnerModal from "../GameWinnerModal/GameWinnerModal";
import Info from "../GameInfo/Info";
import cross from "../../assets/img/cross.png";
import oval from "../../assets/img/o.png";
import { allEqual, updatePoints } from "../../utilities/methods";
import { originalMatrix } from "../../utilities/localDb";
import GameTieModal from "../GameTieModal/GameTieModal";
import GameScore from "../GameScore/GameScore";

const cloneDeep = require("lodash.clonedeep");
const random = require("lodash.random");

const Game = () => {
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
  const [lastestType, setLastestType] = useState("oval");
  const [points, setPoints] = useState({
    user: 0,
    cpu: 0,
    ties: 0
  });
  const [winnerType, setWinnerType] = useState(undefined);
  const [tie, setTie] = useState(false);
  const [userType, setUserType] = useState("cross");

  /* Select */
  const handleSelect = (colId, squareId) => {
    let matrixCopy = cloneDeep(matrix);
    let matrixCol = matrixCopy[colId - 1];
    const squareIndex = matrixCol.colRow.rowSquares.findIndex(
      (item) => item.id === squareId
    );

    const type = matrixCol.colRow.rowSquares[squareIndex].type;

    if (!type) {
      matrixCol.colRow.rowSquares[squareIndex].selected = true;
      matrixCol.colRow.rowSquares[squareIndex].type = changeType(type);

      return setMatrix(matrixCopy);
    }
  };
  const changeType = (currentType) => {
    if (!currentType) {
      if (lastestType === "cross") {
        setLastestType("oval");
        return "oval";
      } else {
        setLastestType("cross");
        return "cross";
      }
    }
  };

  /* Check winner */
  const checkWinner = () => {
    if (!winnerType) {
      const checkVerticalWin = () => {
        const columnsArray = matrix.map((col) =>
          col.colRow.rowSquares.map((square) => square)
        );
        const isWinner = columnsArray
          .map((col) => allEqual(col))
          .includes(true);
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

      if (checkVerticalWin() || checkHorizontalWin() || checkDiagonalWin()) {
        setWinnerType(lastestType);
        return lastestType === userType
          ? setPoints(updatePoints("user", points))
          : setPoints(updatePoints("cpu", points));
      }
    }
  };

  /* Game */
  const gameSquares = () => {
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
    setLastestType("oval");
  };
  const randomChoice = () => {
    if (lastestType === "cross") {
      setLastestType("oval");

      let matrixCopy = cloneDeep(matrix);

      const allEmptySquares = matrixCopy.flatMap((col) =>
        col.colRow.rowSquares.filter((square) => !square.selected)
      );

      if (allEmptySquares.length === 0 && !winnerType) {
        setPoints(updatePoints("ties", points));
        return setTie(true);
      }

      const randomEmptyIndex = random(0, allEmptySquares.length - 1);
      const randomSquareId = allEmptySquares[randomEmptyIndex].id;

      const emptyRandomSquareCoordenates = () => {
        const coordenates = [];
        for (let i = 0; i < matrixCopy.length; i++) {
          matrixCopy[i].colRow.rowSquares.forEach((element, index) => {
            if (element.id === randomSquareId)
              return coordenates.push(matrixCopy[i]);
          });
        }
        return coordenates[0];
      };
      const randomSquareColIndex = matrixCopy.findIndex(
        (col) => col.colId === emptyRandomSquareCoordenates().colId
      );
      const randomSquareRowIndex = matrixCopy[
        randomSquareColIndex
      ].colRow.rowSquares.findIndex((square) => square.id === randomSquareId);

      matrixCopy[randomSquareColIndex].colRow.rowSquares[
        randomSquareRowIndex
      ].selected = true;
      matrixCopy[randomSquareColIndex].colRow.rowSquares[
        randomSquareRowIndex
      ].type = "oval";

      setMatrix(matrixCopy);
    }
  };

  /* Lifecycle */
  useEffect(() => {
    gameSquares();
    checkWinner();
  }, [matrix, lastestType]);

  useEffect(() => {
    if (lastestType === "cross" && !winnerType)
      return setTimeout(() => {
        randomChoice();
      }, [300]);
  }, [lastestType]);
  return (
    <div id="game-container">
      <Info
        turn={lastestType === "cross" ? "oval" : "cross"}
        pressedRestart={() => handleRestart()}
      />
      <div id="game-squares-container">{gameSquares()}</div>
      <GameScore points={points} />
      <GameWinnerModal
        winnerType={winnerType}
        onExited={() => handleRestart()}
      />
      <GameTieModal tie={tie} onExited={() => handleRestart()} />
    </div>
  );
};

export default Game;
