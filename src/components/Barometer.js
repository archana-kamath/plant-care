import { Chart } from "react-google-charts";

const styles = {
    dial: {
      width: `100%`,
      height: `auto`,
      color: "#000",
      border: "30px solid #fff",
      padding: "2px"
    },
    title: {
      fontSize: "1em",
      color: "#000", 
      marginTop: "10px",
      "align-items" : "start",
      display: "flex"
    }
  };

const Barometer = ({value, title }) => {
   return  (
   <div style={styles.dial}>
   <Chart
        height={120}
        chartType="Gauge"
        loader={<div></div>}
        data={[
            ["Label", "Value"],
            ["Humidity", Number(10)]
        ]}
        options={{
            redFrom: 90,
            redTo: 200,
            yellowFrom: 50,
            yellowTo: 90,
            minorTicks: 5,
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