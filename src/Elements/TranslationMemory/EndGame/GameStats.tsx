import { useContext } from "react";
import { translationMemoryContext } from "../TranslationMemory";

const GameStats = () => {

  const translationMemoryStore = useContext(translationMemoryContext);
  const phrases = translationMemoryStore?.phrases;
  const startTime: any = translationMemoryStore?.startTime;
  const incorrectCount = translationMemoryStore?.incorrectCount;
  
  const endTime: any = new Date();

  return (
    <>
      <div id="game_stats">
        <table id="game_stats_table" align="center">
          <thead id="table_head">
            Game Results Summary
          </thead>
          <tr id="total_phrases">
            <td>
              Total number of words/phrases
            </td>
            <td>
              {phrases?.length}
            </td>
          </tr>
          <tr id="total_incorrect">
            <td>
              Total Incorrect
            </td>
            <td>
              {incorrectCount}
            </td>
          </tr>
          <tr id="total_time">
            <td>
              Total Time
            </td>
            <td>
              {endTime-startTime}ms
            </td>
          </tr>
        </table>

      </div>
    </>
  )
}

export default GameStats;