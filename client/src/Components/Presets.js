import React from "react";
import PresetCard from "./PresetCard"


const Presets = props => {

//   console.log(props.presets)
 
  const presetCollection = props.presets.map((preset) => (
    <PresetCard
        preset={preset}
        changePreset={props.changePreset}
        updatePreset={props.updatePreset}
        deletePreset={props.deletePreset}

        />
  ))
return (
  <div >
    <h3>Presets</h3>
    {presetCollection}
  </div>
);
      }

export default Presets;