import React, { useContext, useEffect, useState } from "react";
import Phrase from "../../../Models/Phrase";
import { translationMemoryContext } from "../TranslationMemory";
import PlayAudio from "./PlayAudio/PlayAudio";

export type GameState = {
  currentPhrase?: Phrase, 
  setCurrentPhrase?: Function,
}

export const inGameContext = React.createContext<GameState>({});

const InGame = () => {

  const translationMemoryStore = useContext(translationMemoryContext);
  const setCurrentPage = translationMemoryStore?.setCurrentPage;
  const phrases = translationMemoryStore?.phrases;
  const setStartTime = translationMemoryStore?.setStartTime;
  const incorrectCount = translationMemoryStore?.incorrectCount as number;
  const setIncorrectCount = translationMemoryStore?.setIncorrectCount as Function;

  const [reveal, setReveal] = React.useState<Boolean>(false);
  const [remainingPhrases, setRemainingPhrases] = React.useState<Phrase[]>(JSON.parse(JSON.stringify(phrases as Phrase[]))); // deep copy
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [currentPhrase, setCurrentPhrase] = React.useState<Phrase>();

  const [translatedInput, setTranslatedInput] = useState<string>('');

  

  const handleReveal = (event: any) => {
    console.log('Revealing translation');
    setReveal(!reveal);
  }

  const handleIncorrect = (event: any) => {
    console.log('Incorrect translation');
    setIncorrectCount(incorrectCount + 1);
    // Load the next phrase
    nextPhrase();
  }

  const handleCorrect = (event: any) => {
    console.log('Correct translation');
    // If the user gets it correct, then delete that phrase from RemainingPhrases
    let tempPhrases: Phrase[] = remainingPhrases;
    tempPhrases.splice(currentIndex, 1);
    setRemainingPhrases(tempPhrases);
    // Load the next phrase
    nextPhrase();
  }

  const nextPhrase = () => {
    // clear form
    setTranslatedInput('');
    // check if there are any more phrases
    if (remainingPhrases?.length === 0) {
      setCurrentPage ? setCurrentPage('end_game') : console.error('There are no more phrases left');
    }
    // Randomly select a new index for the phrase array
    const index = Math.floor(Math.random() * remainingPhrases.length);
    setCurrentIndex(index);
    setCurrentPhrase(remainingPhrases[currentIndex]);
    console.log('current: ' + currentPhrase);
    setReveal(false);
  }

  const handleChange = (event: any) => {
    setTranslatedInput(event.target.value.toString())
  }

  useEffect(() => {
    nextPhrase();
    setStartTime ? setStartTime(new Date()) : console.error('Unable to set start time');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
      <div id="in_game">
      <inGameContext.Provider
        value={{
          currentPhrase, setCurrentPhrase,
        }}>
        <p id="instructions" style={{ fontSize: 20, color: "red", fontStyle: "italic"}}>
          Instructions: Write the translation with correct spelling, then reveal the translation to check your work.
        </p>
        <p id="topic">Topic: ____</p>
        <p id="english_text" style={{ fontSize: 40, color: "black", fontWeight: "bold"}}>
          {remainingPhrases[currentIndex]?.english_text}
        </p>
        
        <form>
          <label>
            Translated Input:
            <input type="text" name="translated_text_input" onChange={handleChange} value={translatedInput}/>
          </label><br/>
          {/* <input type="submit" /> */}
        </form>
        <br/>
        <button id="reveal" onClick={handleReveal} style={{ background: "blue", fontWeight: "bold"}}>
          Reveal Translation
        </button>
        {reveal &&
          <div id="revealable_component">
            <p id="translated_text" style={{ fontSize: 45, color: "black", fontWeight: "bold"}}>
              {remainingPhrases[currentIndex]?.translation}
            </p>
            <PlayAudio/>
            <p id="input_results">
              Your input was: {translatedInput===remainingPhrases[currentIndex]?.translation? 'Correct': 'Incorrect'}
            </p>
            <div>
              <button id="incorrect_button" onClick={handleIncorrect} style={{ background: "red"}}>
                Incorrect
              </button>
              <button id="correct_button" onClick={handleCorrect} style={{ background: "green"}}>
                Correct
              </button>
            </div>
          </div>
        }
        </inGameContext.Provider>
      </div>
    </>
  )
}

export default InGame