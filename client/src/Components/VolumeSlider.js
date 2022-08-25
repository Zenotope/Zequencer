import React from "react";
import styles from "./VolumeSlider.module.css";

const VolumeSlider = props => (
  <div>
     <p className="info">Volume</p>
  
  <div className={styles.root}>
   
    <input
      type="range"
      min="-60"
      max="0"
      value={props.volume}
      className={styles.slider}
      onChange={e => {
        props.onVolumeChange(e.target.value);
      }}
    />
  </div>
  </div>
);

export default VolumeSlider;