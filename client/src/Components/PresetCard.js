import React from "react";

const PresetCard = props => {

    
    function handleDeletePreset(){
        fetch(`http://localhost:4000/presets/${props.preset.id}`, {
            method: "DELETE",
        })
        .then(() => props.deletePreset(props.preset.id))
    }

    return(
        <div>
             <button onClick={(e)=> props.changePreset(props.preset)}>{props.preset.name}</button>
             <button onClick={(e)=> props.updatePreset(props.preset.id, props.preset.name)}>Update</button>
             <button onClick={handleDeletePreset}>X </button>
        </div>
    )
}

export default PresetCard