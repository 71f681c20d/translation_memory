import Papa from "papaparse";
import React, { useContext } from "react";
import Phrase from "../../../Models/Phrase";
import { translationMemoryContext } from "../TranslationMemory";


const DocumentUploader = () => {

  const translationMemoryStore = useContext(translationMemoryContext);
  const setPhrases = translationMemoryStore?.setPhrases;

  const changeHandler = (event: any) => {
    console.log(event.target.files[0]);
    parseCsv(event);
  };

  const parseCsv = (event: any) => {
    let phrases: Phrase[] = [];
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results: { data: any; }) {
        const allPhrases: Phrase[] = results.data;
        let filteredPhrases: Phrase[] = [];
        // filter allPhrases based on the 'included' field in the CSV; exclude if it says FALSE
        for(let phrase of allPhrases){
          if(phrase.included != 'FALSE'){
            filteredPhrases.push(phrase);
          }
        }
        console.log(filteredPhrases);
        setPhrases? setPhrases(filteredPhrases): console.error('Unable to initialize uploaded phrases');
      },
    });
  }


  return (
    <>
    <div>
    <input
          type="file"
          name="file"
          accept=".csv"
          onChange={changeHandler}
          style={{ display: "block", margin: "10px auto" }}
        />
    </div>
    </>
  )
}

export default DocumentUploader;