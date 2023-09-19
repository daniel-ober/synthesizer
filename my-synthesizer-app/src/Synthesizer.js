import React, { useState } from 'react';
import * as Tone from 'tone';

function Synthesizer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const synth = new Tone.Synth().toDestination(); //create a synth and connect it to the main output
  const now = Tone.now()

  const playC4 = () => {
    synth.triggerAttackRelease('C4', "8n"); // trigger the attack into the note subdivision (i.e. 8n = 8th note) or immediately ("now")
    // synth.triggerRelease(now + 1) // wait one second before triggering the release
  };

  const playG4 = () => {
    synth.triggerAttackRelease('G4', "8n"); // trigger the attack into the note subdivision (i.e. 8n = 8th note) or immediately ("now")
    // synth.triggerRelease(now + 1) // wait one second before triggering the release
  };

  const toggleC4 = () => {
    if (isPlaying) {
      synth.triggerRelease();
    } else {
      playC4();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleG4 = () => {
    if (isPlaying) {
      synth.triggerRelease();
    } else {
      playG4();
    }
    setIsPlaying(!isPlaying);
  };


  return (
    <div>
      <h1>C4</h1>
      <button onClick={toggleC4}>
        {isPlaying ? 'Stop' : 'Play'}
      </button>
      <h1>G4</h1>
      <button onClick={toggleG4}>
        {isPlaying ? 'Stop' : 'Play'}
      </button>
    </div>
  );
}

export default Synthesizer;