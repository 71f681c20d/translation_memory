/**
 * 
 * @returns A table showing all the preset vocabulary lists a user can choose from
 */

import { useContext } from "react";
import { translationMemoryContext } from "../TranslationMemory";
import defaultPhraseList from "../../../Models/Default";
import Preset from "../../../Models/Preset";
import presetList from "../../../Models/PresetList";

const Presets = () => {

  const translationMemoryStore = useContext(translationMemoryContext);
  const setPhrases = translationMemoryStore?.setPhrases;

  const presetMap = new Map<string, any>();
  presetMap.set('clothes', defaultPhraseList);

  const handleSelect = (entry: Preset) => {
    setPhrases? setPhrases(entry.list) : console.error("Cannot set preset selection");
    // You can perform any additional logic or pass the selected entry to other components or functions here
  };

  return (
    <>
      <div id="preset_selection">
        <table style={{margin: '0 auto', border: '1px solid #000', borderCollapse: 'collapse', marginTop: '4px'}}>
          <thead>
            <tr>
              <th>Index</th>
              <th>Topic</th>
              <th>Chapter</th>
              <th>Page</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="preset_table_body" style={{border: '1px solid #000', padding: '4px'}}>
            {presetList.map((entry) => (
              <tr key={entry.index}>
                <td>{entry.index}</td>
                <td>{entry.topic}</td>
                <td>{entry.chapter}</td>
                <td>{entry.page}</td>
                <td>
                  <button onClick={() => handleSelect(entry)}>Select</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Presets;