import React, { useState } from 'react';
import * as Tone from 'tone';
import './Synthesizer.css'; // Import CSS file for styling

function Synthesizer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const synth = new Tone.Synth().toDestination();

  const octaveNotes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5'];

  const playNote = (note) => {
    synth.triggerAttackRelease(note, '4n');
  };

  const handleKeyDown = (note) => {
    if (!isPlaying) {
      setIsPlaying(true);
      playNote(note);
    }
  };

  const handleKeyUp = () => {
    setIsPlaying(false);
    synth.triggerRelease();
  };

  return (
    <div>
      <h1>My Synthesizer</h1>
      <div className="keyboard">
        {octaveNotes.map((note, index) => (
          <div
            key={index}
            className="white-key"
            onMouseDown={() => handleKeyDown(note)}
            onMouseUp={handleKeyUp}
          >
            {note}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Synthesizer;
