import React, { useState, useEffect } from 'react';
import { fetchAllSensorData } from '../services/sensorData.service';
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
import Home from './Home';
import './dashboard.css';
import { useInterval } from './polling';
import '@aws-amplify/ui/dist/style.css';
import ReactSpeedometer from "react-d3-speedometer";
import { Grid } from '@material-ui/core';
import { Line } from "react-chartjs-2";
import { Chart, registerables} from 'chart.js';

Chart.register(...registerables);

function Dashboard() {
    const [time, setTime] = useState([]);
    const [temp, setTemp] = useState([]);
    const [humid, setHumidity] = useState([]);
    const [moist, setMoisture] = useState([]);
    const [chartData, setChartData] = useState({labels:[],datasets:[]});
    const [cData, setCdata] = useState([]);

    useInterval(async()=>{
        var data = await fetchAllSensorData();
        console.log('Data:', data);
        for (var i in data) {
            var timeStamp = (data[i]['time'].slice(0,-1));
            var temperature = parseInt(data[i]['temperature']);
            var humidity = parseInt(data[i]['humidity']);
            var moisture = parseInt(data[i]['moisture']);
        }
        
        setTime(time =>[...time, timeStamp]);
        setTemp(temp =>[...temp, temperature]);
        setHumidity(humid =>[...humid, humidity]);
        setMoisture(moist =>[...moist, moisture]);
        setCdata(data.slice(-35));
  },10000);

    console.log('setData', cData);

    const time1 = [];
    const temp1 = [];
    const humid1 = [];
    const moist1 = [];

    const extractData=cData.map(
        (a)=>{                
            return( 
                time1.push(a.time),
                temp1.push(a.temperature),
                moist1.push(a.moisture),
                humid1.push(a.humidity)                 
            )
        }
    )
    

    const chart = () => {
        setChartData({
          labels: time1,
          datasets: [
            {
              label: "Temperature(°C)",
              data: temp1,
            },
            {
                label: "Humidity(%)",
                data: humid1,
              },
              {
                label: "Moisture(VWC)",
                data: moist1,
              },
          ],
        });
      };
    
    useInterval(()=>{
        chart();
    },10000);

  return(
    
  <div>
    <Grid container spacing={10} columns={3}>
        <Grid item xs={6} md={4}>
        <h3 className='title'>Current Temperature(in °C)</h3>
        <ReactSpeedometer
            fluidWidth={false}
            forceRender={true}
            needleHeightRatio={0.8}
            minValue={0}
            maxValue={100}
            value={temp.at(-1)}
            needleColor="steelblue"
        />
        </Grid>
        <Grid item xs={6} md={4}>
        <h3 className='title'>Current Humidity(in %)</h3>
        <ReactSpeedometer
            fluidWidth={false}
            forceRender={true}
            needleHeightRatio={0.8}
            minValue={0}
            maxValue={100}
            value={humid.at(-1)}
            needleColor="steelblue"
        />
        </Grid>
        <Grid item xs={6} md={4}>
        <h3 className='title'>Current Moisture(in VWC)</h3>
        <ReactSpeedometer
            fluidWidth={false}
            forceRender={true}
            needleHeightRatio={0.8}
            minValue={0}
            maxValue={1000}
            value={moist.at(-1)}
            needleColor="steelblue"
            />
        </Grid> 
    </Grid>
     <div>
        <Grid item xs = {'auto'} md={10}>
        <h3 className='title'>Trends over the past day</h3>
        <div>
            <Line
                data={chartData}
                options={{
                    responsive: true,
                    scales: {
                    y: {
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 10,
                            beginAtZero: true,
                        },
                        gridLines: {
                            display: true,
                        },
                    },
                    x: {
                        gridLines: {
                            display: false,
                        },
                    },
                    },
                    pan: {
                        enabled: true,
                        mode: "xy",
                        speed: 1,
                        threshold: 1,
                    },
                    zoom: {
                        enabled: true,
                        drag: true,
                        mode: "xy",
                        limits: {
                            max: 1,
                            min: 0.5,
                    },
                    rangeMin: {
                        x: 2,
                        y: 1,
                    },
                    rangeMax: {
                        x: 1,
                        y: 1000,
                    },
                },
                }}
            />
        </div>
        </Grid>
        </div>  
        <Home/>
  </div>);
};

export default Dashboard;