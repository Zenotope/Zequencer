import React from "react";
import styles from "./TempoSlider.module.css";

const TempoSlider = props => (
  <div>
    <p className="info">Tempo</p>
  
  <div className={styles.root}>
    <input
      type="range"
      min="30"
      max="200"
      value={props.tempo}
      className={styles.slider}
      onChange={e => {
        props.onTempoChange(e.target.value);
      }}
    />
  </div>
  </div>
);

export default TempoSlider;
