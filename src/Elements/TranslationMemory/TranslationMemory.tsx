import react, { ReactNode } from "react";
import Phrase from "../../Models/Phrase";
import EndGame from "./EndGame/EndGame";
import InGame from "./InGame/InGame";
import NewGame from "./NewGame/NewGame";

/**
 * This component is the root component for the Translation Memory Game
 * There are 3 possible pages/states: new_game, in_game, and end_game
 * Each of these states has a corresponding component
 */

export type GameState = {
  startTime?: Date,
  setStartTime?: Function,
  currentPage?: string,
  setCurrentPage?: Function,
  phrases?: Phrase[],
  setPhrases?: Function,
  incorrectCount?: number,
  setIncorrectCount?: Function
}

export const translationMemoryContext = react.createContext<GameState>({});

const TranslationMemory = () => {

  const [currentPage, setCurrentPage] = react.useState<string>('new_game');
  const [phrases, setPhrases] = react.useState<Phrase[]>([]);
  const [startTime, setStartTime] = react.useState<Date>();
  const [incorrectCount, setIncorrectCount] = react.useState<number>(0);
  

  const gameStateMap = new Map<string, ReactNode>();
  gameStateMap.set('new_game', <NewGame />);
  gameStateMap.set('in_game', <InGame />);
  gameStateMap.set('end_game', <EndGame />);

  const printGameState = () => {
    // For the purposes of debugging
    console.log(JSON.stringify(phrases));
  }

  return (
    <>
      <header>
        <h1 onClick={printGameState}>
          The Translation Memory Game
        </h1>
      </header>
      <translationMemoryContext.Provider
        value={{
          currentPage, setCurrentPage,
          phrases, setPhrases,
          startTime, setStartTime,
          incorrectCount, setIncorrectCount
        }}>
        <div id="game_state">
          {gameStateMap.get(currentPage)}
        </div>
      </translationMemoryContext.Provider>
    </>

  )
}

export default TranslationMemory;