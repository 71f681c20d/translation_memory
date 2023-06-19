import React, { useContext, useState } from 'react';
import { inGameContext } from '../InGame';

const PlayAudio = () => {

  const inGameStore = useContext(inGameContext);
  const currentPhrase = inGameStore?.currentPhrase;

  const [audioSrc, setAudioSrc] = useState('');


  const handleSpeechGeneration = async () => {
    try {
      const apiKey = 'YOUR_GOOGLE_TRANSLATE_API_KEY';
      const response = await fetch(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            input: {
              text: currentPhrase?.translation,
            },
            voice: {
              languageCode: 'th',
              ssmlGender: 'NEUTRAL',
            },
            audioConfig: {
              audioEncoding: 'MP3',
            },
          }),
        }
      );
      const data = await response.json();
      setAudioSrc(`data:audio/mpeg;base64,${data.audioContent}`);
    } catch (error) {
      console.error('Error generating speech:', error);
    }
  };

  return (
    <div>
      <button onClick={handleSpeechGeneration}>Generate Speech</button>
      {audioSrc && (
        <audio controls>
          <source src={audioSrc} type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
};

export default PlayAudio;
