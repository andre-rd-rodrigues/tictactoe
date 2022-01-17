import { useState } from "react";
import Game from "../Game/Game";
import WelcomeScreen from "../WelcomeScreen/WelcomeScreen";

const App = () => {
  const [userSelectedType, setUserSelectedType] = useState("cross");
  const [userSelectedGame, setUserSelectedGame] = useState();

  const handleSeletedType = (selected) => setUserSelectedType(selected);

  const handleGameTypeSelected = (gameType) => setUserSelectedGame(gameType);

  return (
    <div id="app">
      {userSelectedGame ? (
        <Game selectedType={userSelectedType} gameType={userSelectedGame} />
      ) : (
        <WelcomeScreen
          userSeletedType={(selected) => handleSeletedType(selected)}
          gameTypeSelected={(gameType) => handleGameTypeSelected(gameType)}
        />
      )}
    </div>
  );
};

export default App;
