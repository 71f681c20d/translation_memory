/**
 * 
 * @returns A table showing all the preset vocabulary lists a user can choose from
 */

import { useContext, useState } from "react";
import { translationMemoryContext } from "../TranslationMemory";
import Preset from "../../../Models/Preset";
import presetList from "../../../Assets/PresetList";

const Presets = () => {

  const translationMemoryStore = useContext(translationMemoryContext);
  const setPhrases = translationMemoryStore?.setPhrases;

  const [selectedEntry, setSelectedEntry] = useState<Preset | null>(null);

  const handleSelect = (entry: Preset) => {
    setPhrases? setPhrases(entry.list) : console.error("Cannot set preset selection");
    setSelectedEntry(entry);
  };

  return (
    <>
      <div id="preset_selection">
        <table style={{margin: '0 auto', border: '1px solid #000', borderCollapse: 'collapse', marginTop: '4px'}}>
          <thead>
            <tr>
              {/* <th>Index</th> */}
              <th>Topic</th>
              <th>Chapter</th>
              <th>Page</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="preset_table_body" style={{border: '1px solid #000', padding: '4px'}}>
            {presetList.map((entry) => (
              <tr 
                key={entry.index}
                style={{ backgroundColor: selectedEntry === entry ? 'lightblue' : 'transparent' }}
              >
                {/* <td>{entry.index}</td> */}
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