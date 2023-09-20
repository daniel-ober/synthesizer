import React, { useState } from 'react';
import * as Tone from 'tone';
import './Synthesizer.css'; // Import CSS file for styling

function Synthesizer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const synth = new Tone.Synth().toDestination();

    const octaveNotes = ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5'];

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
