import { useContext, useEffect, useState } from "react";
import { translationMemoryContext } from "../TranslationMemory";
import DocumentUploader from "./DocumentUploader"
import defaultPhraseList from "../../../Assets/Default";
import Presets from "../Presets/Presets";

const NewGame = () => {

  const translationMemoryStore = useContext(translationMemoryContext);
  const setCurrentPage = translationMemoryStore?.setCurrentPage;
  const setPhrases = translationMemoryStore?.setPhrases;

  const [reveal, setReveal] = useState<Boolean>(false);

  useEffect(() => {
    setPhrases? setPhrases(defaultPhraseList): console.error('Unable to initialize default phrases');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBegin = (event: any) => {
    console.log('Beginning game');
    setCurrentPage? setCurrentPage('in_game'): console.error('Unable to begin');
  }

  const handlePreset = (event: any) => {
    // Reveal a list of preset vocab lists the user can choose from
    setReveal(!reveal);
  }

  return(
    <>
      <div id="new_game"> 
        <img src="../Cartoon.png" width="200" alt=""/>
        <p>
          Select a vocabulary preset...
        </p>
        <button onClick={handlePreset}>
          Show Presets
        </button>
        {reveal && <Presets/>}

        <p>
          Or upload a CSV with columns english_text and translated  
        </p>
        <DocumentUploader />
        <button onClick={handleBegin}>
          Begin!
        </button>
      </div>
    </>
  )
}

export default NewGame
