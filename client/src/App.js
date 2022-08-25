import React, { useState, useEffect } from "react";
import * as Tone from 'tone'
import _ from "lodash";
// import Title from "./Components/Title";
import Buttons from "./Components/Buttons";
import StepSequence from "./Components/StepSequence";
// import Presets from "./Components/Presets";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlay,
  faStop,
  faRecycle,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
// import StartAudioContext from "startaudiocontext";
import { Scale } from "@tonaljs/tonal";

// import e from "cors";
import Navbar from "./Components/Navbar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';




function toggleBox(priorChecked, i, row) {
  const checked = [...priorChecked];
  checked[row][i] = !checked[row][i];
  return checked;
}


// const context = new AudioContext();

// fontawesome library setup
library.add(faPlay);
library.add(faStop);
library.add(faRecycle);
library.add(faInfoCircle);

function App() {

  const[checked, setChecked] = useState( [
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    ]
    )
  const[isPlaying, setIsPlaying] = useState(false)
  const[sequenceLength, setSequenceLength] = useState(16)
  const[tempo, setTempo] = useState(120)
  const[key, setKey] = useState("C")
  const[mode, setMode] = useState("major")
  const[octave, setOctave] = useState("3")
  // const[notes, setNotes] = useState("")
  // const[maxTempo, setMaxTempo] = useState(300)
  const[isActive, setIsActive] = useState([
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 , 1], 
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 , 1], 
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 , 1], 
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 , 1], 
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 , 1], 
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 , 1], 
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 , 1],  
  ])
  const[renderedNotes, setRenderedNotes] = useState([])
  const[partContainer, setPartContainer] = useState([])
  // const[landscape, setLandscape] = useState(false)
  const[velocity, setVelocity] = useState(.3)
  const[sound, setSound] = useState("sine")
  const[volume, setVolume] = useState(-3)

  const[delay, setDelay] = useState(false)
  const[distortion, setDistortion] = useState(false)
  const[verb, setVerb] = useState(false)

  const[user, setUser] = useState({})
  const[userId, setUserId] = useState("")
  const[presetName, setPresetName] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)

  const[presets, setPresets] = useState([])

  let scale = `${key}${octave} ${mode}`
  let noteSet = Scale.get(scale).notes

  const [pingPongDryWet, setPingPongDryWet] = useState(0)
  const [distDryWet, setDistDryWet] = useState(0)
  
  let pingPong = new Tone.PingPongDelay({wet: pingPongDryWet, delayTime:"8n", feedback: .2})
  let dist = new Tone.Distortion({wet: distDryWet, distortion: 0.6});
  let limiter = new Tone.Limiter(-3)



  // let reverb = new Tone.Reverb(2).toMaster();
  // reverb.wet.value = 0

   const synth = new Tone.PolySynth(4, Tone.Synth, {envelope: {attack: 0.005, decay: 0.1, release: 1, sustain: 0.3,}, oscillator: {type: sound}, volume: volume}).chain(pingPong, dist, limiter, Tone.Master);
  //const synth = new Tone.Synth().toDestination();

  function handleSavePreset(e){
    e.preventDefault();
    const presetData = {
      name: presetName,
      grid: [checked.toString()],
      length: sequenceLength,
      tempo,
      key,
      mode,
      octave,
      sound,
      volume,
      delay,
      user_id: userId,
      // delayamt: pingPong.wet.value,
      // dist: distortion,
      // distamt: dist.wet.value,
      // reverb,
      // reverbamt: reverb.wet.value
    }
    fetch('http://localhost:4000/presets', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify(presetData),
    })
    .then((newPreset)=> onCreatePreset(newPreset)) 
    console.log(presetData)
  }

  function onCreatePreset(newPreset){
    setPresets([...presets, newPreset])
    fetch('http://localhost:4000/presets')
    .then(res => res.json())
    //.then((presets)=> setPresets(presets.filter((preset) => preset.user_id === userId)))
    // .then(console.log(userId))
    .then((presets)=> setPresets(presets))
  }



  useEffect(()=> {
    fetch('http://localhost:4000/presets')
    .then(res => res.json())
    //.then((presets)=> setPresets(presets.filter((preset) => preset.user_id === userId)))
    // .then(console.log(userId))
    .then((presets)=> setPresets(presets))
  }, [user])
  //   .then((presets)=> setPresets(presets))
  // }, [])

  // Tone.connect(synth, reverb)
  // Tone.connect(synth, pingPong)
  ;


function changePreset(preset){
  let items = preset.grid
  items = items[0].split(",")
  items = items.map(j => JSON.parse(j))
  
  function sliceGrid(items, size){
    const chunks = []
    items = [].concat(...items)

  while (items.length) {
    chunks.push(
      items.splice(0, size)
    )
  }
  return chunks
  }

  let newGrid = sliceGrid(items, 16)
  console.log(newGrid)
  
  setChecked(newGrid)
  setKey(preset.key)
  setOctave(preset.octave)
  setVolume(preset.volume)
  setMode(preset.mode)
  setSound(preset.sound)
  generateMetronome()
  
  fetch('http://localhost:4000/presets')
    .then(res => res.json())
    //.then((presets)=> setPresets(presets.filter((preset) => preset.user_id === userId)))
    // .then(console.log(userId))
    .then((presets)=> setPresets(presets))
}



function updatePreset(id, presetName){
  const updatedPreset = {
    name: presetName,
    grid: [checked],
    length: sequenceLength,
    tempo,
    key,
    mode,
    octave,
    sound,
    volume,
    delay,
    user_id: userId,
  }

  fetch(`http://localhost:4000/presets/${id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPreset)
  })
}

function deletePreset(id){
  const updatedPresets = presets.filter((preset) => preset.id !== id)
  setPresets(updatedPresets)
}


  useEffect (() => {
    generateMetronome();
    // starts both audio contexts on mounting
    

    // event listener for space, enter and 't'
    // window.addEventListener("keydown", e => {
    //   if (e.keyCode === 32 || e.keyCode === 13) {
    //     try {
    //       e.preventDefault(); // prevents space bar from triggering selected checkboxes
    //       this.onTogglePlay();
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   } else if (e.keyCode === 84) {
    //     try {
    //       e.preventDefault(); // prevents space bar from triggering selected checkboxes
    //       this.handleTap();
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   }
    // });

    // check for orientation, add event listener
    // if (
    //   window.screen.orientation &&
    //   Math.abs(window.screen.orientation.angle) === 90 &&
    //   window.screen.height < 500
    // )
    //   setLandscape({ landscape: true });
    // window.addEventListener("orientationchange", () => {
    //   if (Math.abs(window.screen.orientation.angle) !== 90) {
    //     setLandscape({ landscape: false });
    //   } else if (window.screen.height < 500) {
    //     setLandscape({ landscape: true });
    //   }
    // });
  }, []);

  const onToggleBox = (i, row) => {
    setChecked(toggleBox(checked, i, row))
        generateMetronome();
  };

  function onTogglePlay() {
    // setIsPlaying(!isPlaying)
      
        if (isPlaying) {
          setIsPlaying(!isPlaying)
          Tone.Transport.stop();
          Tone.Transport.loop = false;
          Tone.Transport.loopEnd = 0;
          setIsActive([[], [], [], [], [], [], []])
          console.log("stopped");
        } else {
          setIsPlaying(!isPlaying)
          Tone.Transport.loop = true;
          Tone.Transport.loopStart = 0;
          Tone.Transport.loopEnd =
            (sequenceLength * 15) / tempo;
          Tone.Transport.start("+0.1");
          console.log("playing");
        
      }
    ;
  };



  const onLengthChange = sequenceLength => {
    // create a new checked array and push simple everyother note pattern
    // const checked = [[], [], [], [], [], [], []];
    // for (let i = 0; i < sequenceLength; i++) {
    //   checked[0].push(i === 0);
    //   checked[1].push(i !== 0 && i % 2 === 0);
    // }
    setSequenceLength(sequenceLength)
    setChecked(checked)
    Tone.Transport.loopEnd = (sequenceLength * 15) / tempo;
    
    
    ;
  };

  useEffect(()=> {
    generateMetronome();
  }, [sequenceLength])


  const onTempoChange = tempo => {
    setTempo(tempo)
    Tone.Transport.bpm.value = tempo;
  };

  function onReset(e){
      setIsPlaying(false)
      setChecked([
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
      ])
      setIsActive([
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 , 1], 
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 , 1], 
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 , 1], 
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 , 1], 
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 , 1], 
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 , 1], 
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 , 1],  
      ])
      setRenderedNotes([])
      setPartContainer([])

      generateMetronome()
      forceStop();
      }
   

  const forceStop = () => {
    Tone.Transport.stop();
    Tone.Transport.cancel()
    Tone.Transport.loop = false;
    Tone.Transport.loopEnd = 0;
    console.log("force stopped");
  };


  const generateMetronome = () => {
    // erase or stop all previous parts
    // const partContainer = partContainer;
    partContainer.forEach(part => part.removeAll());

    // metronome vitals
    const [note1, note2, note3, note4, note5, note6, note7] = noteSet,
      seqLength = sequenceLength,
      matrix = checked,
      // velocity = velocity;

    // const notes = this.state.notes


    // new renderedNotes array, populate
    renderedNotes = [];
    for (let i = 0; i < seqLength; i++) {
      const time = i / 4;
      if (matrix[0][i]) {
        renderedNotes.push({
          note: note1,
          time: `0:${time}`,
          velocity: velocity,
          index: i
        });
      } 
      if (matrix[1][i]) {
        renderedNotes.push({
          note: note2,
          time: `0:${time}`,
          velocity: velocity,
          index: i
        });
      }
      if (matrix[2][i]) {
        renderedNotes.push({
          note: note3,
          time: `0:${time}`,
          velocity: velocity,
          index: i
        });
      }
      if (matrix[3][i]) {
        renderedNotes.push({
          note: note4,
          time: `0:${time}`,
          velocity: velocity,
          index: i
        });
      }
      if (matrix[4][i]) {
        renderedNotes.push({
          note: note5,
          time: `0:${time}`,
          velocity: velocity,
          index: i
        });
      }
      if (matrix[5][i]) {
        renderedNotes.push({
          note: note6,
          time: `0:${time}`,
          velocity: velocity,
          index: i
        });
      }
      if (matrix[6][i]) {
        renderedNotes.push({
          note: note7,
          time: `0:${time}`,
          velocity: velocity,
          index: i
        });
      }
     

      else if (!matrix[1][i]) {
        renderedNotes.push({
          note: note1,
          time: `0:${time}`,
          velocity: 0,
          index: i
        });
      }
    }

  
    // create new Part, start Part, push Part to container
    const part = new Tone.Part((time, value) => {
      triggerVisualize(value.index);
      synth.triggerAttackRelease(value.note, "16n", time, value.velocity);
    }, renderedNotes).start(0);
    partContainer.push(part);

    setRenderedNotes(renderedNotes)
    setPartContainer(partContainer);
    
  };

  const triggerVisualize = index => {
    // generate array of 0's
    const length = sequenceLength;
    const isActive = [
      _.fill(Array(length), 0),
      _.fill(Array(length), 0), 
      _.fill(Array(length), 0),
      _.fill(Array(length), 0),
      _.fill(Array(length), 0),
      _.fill(Array(length), 0),
      _.fill(Array(length), 0)];

    // set particular index as active
    isActive[0][index] = 1;
    isActive[1][index] = 1;
    isActive[2][index] = 1;
    isActive[3][index] = 1;
    isActive[4][index] = 1;
    isActive[5][index] = 1;
    isActive[6][index] = 1;
    setIsActive(isActive)
  };

  const onKeyFilter = (inputKey) => {
   setKey(inputKey)
  };

useEffect(() => {
  noteSet = Scale.get(scale).notes
  generateMetronome()
}, [key, mode, octave])
  

  const onModeFilter = (inputMode)=> {
    setMode(inputMode)
    noteSet = Scale.get(scale).notes
    console.log(noteSet)
    generateMetronome()
  }

  function onOctFilter(inputOct){
    setOctave(inputOct)
    noteSet = Scale.get(scale).notes
    generateMetronome()
  }

  function onSoundChange(inputSound){
    setSound(inputSound)
  }

  useEffect(()=> {
    generateMetronome()
  }, [sound])

  function onVolumeChange(inputVolume){
      setVolume(inputVolume)
      generateMetronome()
  }
 
  function delayToggle(){
    if (delay === true){
        setDelay(false)
        setPingPongDryWet(0)
    }
    else{
      setDelay(true)
      setPingPongDryWet(.5)   
  }
  }

  useEffect(()=> { 
    generateMetronome() 
  },[pingPongDryWet, distDryWet])


  function distortionToggle(){
    if (distortion === true){
      setDistortion(false)
      setDistDryWet(0)
    }
    else{
      setDistortion(true)
      setDistDryWet(.8)
    }
  }

  // function verbToggle(){
  //   if (verb === true){
  //     setVerb(false)
  //     reverb.wet.value = 0
  //     generateMetronome() 
  //   } else{
  //     setVerb(true)
  //     reverb.wet.value = .9
  //     generateMetronome() 
  //   }
  // }


 
    return (
      <div className="App">
      <Router>
        <Navbar 
          presets={presets}
          changePreset={changePreset}
          updatePreset={updatePreset}
          deletePreset={deletePreset}
          user={user}
          setUser={setUser}
          setUserId={setUserId}
          setLoggedIn={setLoggedIn}
          loggedIn={loggedIn}
          />
        {/* <Routes>
          <Route path="/"/>
          
        </Routes> */}
      </Router>
      <main>
        <header className="App-header">

       {loggedIn ? (   
        <div className="presetSave">
          <form  onSubmit={(e)=>handleSavePreset(e)}>
          <input className="presetName" type="text" onChange={event=> setPresetName(event.target.value)}></input>
            <input type="submit" value="Save Preset"></input>
          </form>
            
        </div>
       ): (<div></div>)}
       
          <Buttons
            isPlaying={isPlaying}
            onTogglePlay={onTogglePlay}
            sequenceLength={sequenceLength}
            onLengthChange={onLengthChange}
            tempo={tempo}
            onTempoChange={onTempoChange}
            onReset={onReset}
            onKeyFilter={onKeyFilter}
            onModeFilter={onModeFilter}
            onOctFilter={onOctFilter}
            octave={octave}
            onSoundChange={onSoundChange}
            volume={volume}
            onVolumeChange={onVolumeChange}
            delayToggle={delayToggle}
            distortionToggle={distortionToggle}
            // verbToggle={verbToggle}
            mode={mode}
            note={key}
          />
          <StepSequence
            checked={checked}
            onToggle={onToggleBox}
            sequenceLength={sequenceLength}
            // onPitchSelect={onPitchSelect}
            notes={noteSet}
            isActive={isActive}
          />
        </header>
        </main>
      </div>
    );
  
}

export default App;