
import { Chart } from "react-google-charts";

const styles = {
    dial: {
      width: `200%`,
      height: `auto`,
      color: "#000",
    },
    title: {
      fontFamily:"serif",
      fontSize: "1em",
      color: "#000", 
      marginTop: "10px",
      display: "flex",
      marginLeft:'70px'
    }
  };

const Barometer = ({value, title }) => {
   return  (
   <div style={styles.dial}>
   <Chart
        height={200}
        chartType="Gauge"
        loader={<div></div>}
        data={[
            ["Label", "Value"],
            ["Humidity", Number(value)]
        ]}
        options={{
            redFrom: 90,
            redTo: 200,
            yellowFrom: 50,
            yellowTo: 90,
            minorTicks: 10,
            min: -200,
            max: 200
        }}
    />
      <div style={styles.title}>
        {title}: {value}%
      </div>
    </div>
   )
}

export default Barometer;