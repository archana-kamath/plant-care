import React from "react";

import ReactSpeedometer from "react-d3-speedometer";

const styles = {
  title: {
    fontSize: "1em",
    color: "#000",
    marginTop: "10px"
  }
};

const Speedometer = ({value, title }) => {
  return (
    <div>
         <ReactSpeedometer
                    fluidWidth={false}
                    forceRender={true}
                    needleHeightRatio={0.8}
                    minValue={0}
                    maxValue={100}
                    value={value}
                    needleColor="steelblue"
                    width={350}
                    height={200}
                  /> 
      <div style={styles.title}>
        {title}: {value}%
      </div>
    </div>
  );
};

export default Speedometer;