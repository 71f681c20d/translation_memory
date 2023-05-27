import { useContext, useEffect } from "react";
import { translationMemoryContext } from "../TranslationMemory";
import DocumentUploader from "./DocumentUploader"
import defaultPhraseList from "../../../Models/Default";

const NewGame = () => {

  const translationMemoryStore = useContext(translationMemoryContext);
  const setCurrentPage = translationMemoryStore?.setCurrentPage;
  const setPhrases = translationMemoryStore?.setPhrases;

  

  useEffect(() => {
    setPhrases? setPhrases(defaultPhraseList): console.error('Unable to initialize default phrases');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBegin = (event: any) => {
    console.log('Beginning game');
    setCurrentPage? setCurrentPage('in_game'): console.error('Unable to begin');
  }

  return(
    <>
      <div id="new_game"> 
        <img src="../Cartoon.png" width="200" alt=""/>
        <p>
          Upload a CSV with columns English Text, Translated Text, and Included 
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
