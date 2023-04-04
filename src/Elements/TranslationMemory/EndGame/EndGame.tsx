import { useContext } from "react";
import { translationMemoryContext } from "../TranslationMemory";
import GameStats from "./GameStats";

const EndGame = () => {

  const translationMemoryStore = useContext(translationMemoryContext);
  const setCurrentPage = translationMemoryStore?.setCurrentPage;
  const setIncorrectCount = translationMemoryStore?.setIncorrectCount;

  const handleRestart = (event: any) => {
    console.log('Restarting game');
    setIncorrectCount? setIncorrectCount(0): console.error('Could not reset incorrect count');
    setCurrentPage? setCurrentPage('in_game'): console.error('Unable to restart game');
  }

  const handleNewGame = (event: any) => {
    console.log('Starting a new game');
    setIncorrectCount? setIncorrectCount(0): console.error('Could not reset incorrect count');
    setCurrentPage? setCurrentPage('new_game'): console.error('Unable to begin new game');
  }

  return(
    <>
      <div id="end_game">
        <p>
          You've gotten all translations correct!
        </p>
        <button id="restart" onClick={handleRestart}>
          Restart
        </button>
        <button id="new_game" onClick={handleNewGame}>
          New Game
        </button>
        <GameStats/>
      </div>
    </>
  )
}

export default EndGame