import React from "react";
import PresetCard from "./PresetCard"


const Presets = props => {


 
  const presetCollection = props.presets.map((preset) => (
    <PresetCard
        name={preset.name}
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