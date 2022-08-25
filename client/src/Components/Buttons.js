import React from "react";
import PlayButton from "./PlayButton";
import TimeSignature from "./TimeSignature";
import TempoSlider from "./TempoSlider";
import TempoDisplay from "./TempoDisplay";
import ResetButton from "./ResetButton";
import VolumeSlider from "./VolumeSlider";
import styles from "./Buttons.module.css";

const Buttons = props => {


return (
<div id="buttons" className={styles.root}>
    <div id="transport" className={styles.wrapperTop}>
        <PlayButton
          isPlaying={props.isPlaying}
          onTogglePlay={props.onTogglePlay}
        />
        <TimeSignature
          sequenceLength={props.sequenceLength}
          onLengthChange={props.onLengthChange}
        />
        <ResetButton onReset={props.onReset} />
        <TempoDisplay tempo={props.tempo} />
        <TempoSlider tempo={props.tempo} onTempoChange={props.onTempoChange} /> 
        <VolumeSlider volume={props.volume} onVolumeChange={props.onVolumeChange} />

    </div>
<div>
    
</div>
    
  
  <div id="controls" className={styles.wrapperBottom}>
      <div className="Key">
        <p className="info">Key</p>
            <select value={props.note} className="keySelect" onChange={(e) => props.onKeyFilter(e.target.value)}>
                <option value="C">C</option>
                <option value="C#">C#</option>
                <option value="D">D</option>
                <option value="D#">D#</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="F#">F#</option>
                <option value="G">G</option>
                <option value="G#">G#</option>
                <option value="A">A</option>
                <option value="A#">A#</option>
                <option value="B">B</option>
            </select>
        </div>
        <div>
            <p className="info">Mode</p>
            <select value={props.mode} className="modeSelect" onChange={(e) => props.onModeFilter(e.target.value)}>
                <option value="major">Major</option>
                <option value="minor">Minor</option>
                {/* <option value="chromatic">Chromatic</option> */}
                <option value="harmonic minor">Harmonic Minor</option>
                <option value="minor blues">Minor Blues</option>
                <option value="egyptian">Egyptian</option>
                <option value="iwato">Iwato</option>
                <option value="kumoijoshi">Kumoijoshi</option>
                <option value="hirajoshi">Hirajoshi</option>
                <option value="balinese">Balinese</option>
                <option value="persian">Persian</option>
                <option value="todi raga">Todi Raga</option>
                <option value="piongio">Piongio</option>
                <option value="prometheus">Prometheus</option>
            </select>
        </div>
        <div>
            <p className="info">Octave</p>
            <select value={props.octave} className="octSelect" onChange={(e) => props.onOctFilter(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
        <div>
            <p className="info">Sound</p>
            <select value={props.sound} className="soundSelect" onChange={(e) => props.onSoundChange(e.target.value)}> 
                <option value='sine'>Sine</option>
                <option value='triangle'>Triangle</option>
                <option value='sawtooth'>Saw</option>
                <option value='sawtooth8'>Saw8</option>
                <option value='square'>Square</option>
                <option value='square8'>Square8</option>
                
            </select>
        </div>
    </div>
    <div className="effects">
        <button onClick={() => props.delayToggle()}>Delay</button>
        <button onClick={() => props.distortionToggle()}>Distortion</button>
        <button onClick={() => props.verbToggle()}>Reverb</button>
    </div>
    
    

</div>
)
};

export default Buttons;
