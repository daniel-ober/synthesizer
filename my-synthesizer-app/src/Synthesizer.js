import React, { useState } from 'react';
import * as Tone from 'tone';

function Synthesizer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const synth = new Tone.Synth().toDestination();

  const playNote = () => {
    synth.triggerAttackRelease('C4', '4n');
  };

  const togglePlay = () => {
    if (isPlaying) {
      synth.triggerRelease();
    } else {
      playNote();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <h1>Synth Tone in C4</h1>
      <button onClick={togglePlay}>
        {isPlaying ? 'Stop' : 'Play'}
      </button>
    </div>
  );
}

export default Synthesizer;