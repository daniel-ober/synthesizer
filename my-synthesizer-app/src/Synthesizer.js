import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import './Synthesizer.css'; // Import CSS file for styling

function Synthesizer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSynthType, setSelectedSynthType] = useState('AMSynth'); // Default synth type
  const [synth, setSynth] = useState(null);

  const octaveNotes = ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5'];

  useEffect(() => {
    // Initialize synth when the component mounts
    let initializedSynth = null;
    if (selectedSynthType === 'NoiseSynth') {
      initializedSynth = new Tone.NoiseSynth({
        envelope: {
          attack: 0.01,
          decay: 0.1,
          sustain: 0.5,
          release: 0.1,
        },
        oscillator: {
          type: 'white', // You can change this to 'pink' or 'brown'
        },
      }).toDestination();
    } else {
      initializedSynth = new Tone[selectedSynthType]().toDestination();
    }
    setSynth(initializedSynth);

    // Start the Tone context
    Tone.start();

    // Return a cleanup function to stop the synth when the component unmounts
    return () => {
      initializedSynth.dispose();
    };
  }, [selectedSynthType]);

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
    if (isPlaying) {
      setIsPlaying(false);
      synth.triggerRelease();
    }
  };

  const handleStartAudio = () => {
    Tone.start().then(() => {
      // Now that the audio context is started, you can set up your synth
      setSynth(new Tone.PolySynth().toDestination());
    });
  };

  const handleSynthTypeChange = (event) => {
    const selectedType = event.target.value;
    setSelectedSynthType(selectedType);

    // Create a new synth based on the selected type
    switch (selectedType) {
      case 'PolySynth':
        setSynth(new Tone.PolySynth().toDestination());
        break;
      case 'AMSynth':
        setSynth(new Tone.AMSynth().toDestination());
        break;
      case 'FMSynth':
        setSynth(new Tone.FMSynth().toDestination());
        break;
      case 'NoiseSynth':
        setSynth(new Tone.NoiseSynth().toDestination());
        break;
      default:
        setSynth(new Tone.PolySynth().toDestination());
    }
  };

  return (
    <div>
      <h1>Web Synthesizer</h1>
      <div>
        <label htmlFor="synthType">Select Synth Type:</label>
        <select
          id="synthType"
          value={selectedSynthType}
          onChange={handleSynthTypeChange}
        >
          <option value="AMSynth">AMSynth</option>
          <option value="FMSynth">FMSynth</option>
          <option value="NoiseSynth">NoiseSynth</option>
          <option value="PolySynth">PolySynth</option>
        </select>
      </div>
      <div className="keyboard">
  {octaveNotes.map((note, index) => (
    <div
      key={index}
      className={`white-key ${note.includes('#') ? 'black-key' : ''}`}
      onMouseDown={() => handleKeyDown(note)}
      onMouseUp={handleKeyUp}
    >
      {note}
    </div>
  ))}
      </div>
      {/* Add a button to start the audio context */}
      <button onClick={handleStartAudio}>Start Audio</button>
    </div>
  );
}

export default Synthesizer;
