import React, { useState } from 'react';
import * as Tone from 'tone';

function Synthesizer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const synth = new Tone.Synth().toDestination();

  const octaveNotes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'];

  const playNote = (note) => {
    synth.triggerAttackRelease(note, '4n');
  };

  const togglePlay = () => {
    if (isPlaying) {
      synth.triggerRelease();
    } else {
      setIsPlaying(true);
      // Play each note in the octave sequentially with a delay
      playNextNoteInOctave(0);
    }
  };

  const playNextNoteInOctave = (index) => {
    if (index < octaveNotes.length) {
      playNote(octaveNotes[index]);
      setTimeout(() => playNextNoteInOctave(index + 1), 250); // Delay between notes
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div>
      <h1>Web Synthesizer</h1>
      <button onClick={togglePlay}>{isPlaying ? 'Stop' : 'Play'}</button>
      <div className="note-buttons">
        {octaveNotes.map((note, index) => (
          <button key={index} onClick={() => playNote(note)}>
            {note}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Synthesizer;
