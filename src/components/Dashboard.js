import React, { useState, useEffect, useRef } from 'react';
import { fetchAllSensorData, getSensorData } from '../services/sensorData.service';
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
import Home from './Home';
import './dashboard.css';
import { useInterval } from './polling';
import '@aws-amplify/ui/dist/style.css';
import ReactSpeedometer from "react-d3-speedometer";
import { Grid } from '@material-ui/core';
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Barometer from './Barometer';
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardGroup,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';
Chart.register(...registerables);

function Dashboard() {
  const [time, setTime] = useState([]);
  const [temp, setTemp] = useState([]);
  const [humid, setHumidity] = useState([]);
  const [moist, setMoisture] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [cData, setCdata] = useState([]);

  useInterval(async () => {
    var d = await getSensorData('11-2022');
    console.log('D:', d);
    var data = await fetchAllSensorData();
    console.log('Data:', data);
    for (var i in data) {
      var timeStamp = (data[i]['time'].slice(0, -1));
      var timeFormat = new Date(timeStamp);
      timeFormat = String(timeFormat).split('GMT')[0];
      var temperature = parseInt(data[i]['temperature']);
      var humidity = parseInt(data[i]['humidity']);
      var moisture = parseInt(data[i]['moisture']);
    }

    setTime(time => [...time, timeFormat]);
    setTemp(temp => [...temp, temperature]);
    setHumidity(humid => [...humid, humidity]);
    setMoisture(moist => [...moist, moisture]);
    setCdata(data);
  }, 10000);

  console.log('setData', cData);

  const time1 = [];
  const temp1 = [];
  const humid1 = [];
  const moist1 = [];

  const extractData = cData.map(
    (a) => {
      let x = new Date(a.time);
      x = String(x).split('GMT')[0];
      return (
        time1.push(x.substring(0, 15)),
        temp1.push(a.temperature),
        moist1.push(a.moisture),
        humid1.push(a.humidity)
      )
    }
  )

  // var time2 = []

  // for (let i=0; i<time1.length; i++) {
  //     time2.push(time1[i].substring(0,15))
  // }

  //console.log('Time1', time1);


  const [dates, setDates] = useState();
  const [dataPoints, setDataPoints] = useState([]);

  const sdate = useRef();
  const edate = useRef();

  const filterData = () => {
    const dates = [...time1];
    const dataPoints = [...cData];
    console.log('first:', dates, dataPoints);

    let value1 = sdate.current.value;
    let sd = new Date(value1)
    sd.setDate(sd.getDate() + 1);
    let sd1 = String(sd).split('GMT')[0];
    let value2 = edate.current.value;
    let ed = new Date(value2)
    ed.setDate(ed.getDate() + 1);
    let ed1 = String(ed).split('GMT')[0];
    console.log('values:', sd1, ed1);


    let sd2 = sd1.substring(0, 15);
    let ed2 = ed1.substring(0, 15);
    const startdate = dates.indexOf(sd2);
    const enddate = dates.lastIndexOf(ed2);
    console.log(startdate, enddate);

    const filterDate = dates.slice(startdate, enddate + 1);
    const filterDataPoints = dataPoints.slice(startdate, enddate + 1);
    console.log('fd:', filterDate, filterDataPoints);

    setDates(filterDate);
    setDataPoints(filterDataPoints);
  }

  const temp2 = [];
  const humid2 = [];
  const moist2 = [];

  const extractFilteredData = dataPoints.map(
    (b) => {
      return (
        temp2.push(b.temperature),
        moist2.push(b.moisture),
        humid2.push(b.humidity)
      )
    }
  )

  const chart = () => {
    setChartData({
      labels: dates,
      datasets: [
        {
          label: "Temperature(°C)",
          data: temp2,
        },
        {
          label: "Humidity(%)",
          data: humid2,
        },
        {
          label: "Moisture(VWC)",
          data: moist2,
        },
      ],
      options: {
        responsive: true,
        scales: {
          y: {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
            },
          },
          x: {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 1000,
            },
            gridLines: {
              display: false,
            },
            type: 'time',
            time: {
              units: 'hours'
            },
            min: '2022-11-01',
            max: '2022-12-31',
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

      },
    });
  };


  //   const filterMonth = (month) => {
  //     console.log(month.value);
  //     chart.update();
  // }

  useInterval(() => {
    chart();
  }, 10000);

  return (

    <div>
      <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
        <MDBCol>
          <MDBCard className='h-100'>
            <MDBCardTitle>Plant1</MDBCardTitle>
            {/* <MDBCardText>
              temperature Text..
            </MDBCardText> */}
            <MDBCardBody>
              <Carousel>
                <div>
                  {/* <img src="assets/1.jpeg" /> */}
                   <ReactSpeedometer
                    fluidWidth={false}
                    forceRender={true}
                    needleHeightRatio={0.8}
                    minValue={0}
                    maxValue={100}
                    value={humid.at(-1)}
                    needleColor="steelblue"
                    width={200}
                    height={200}
                  /> 
                  <Barometer id="dial9" value="40" title="Barometer" />
                  {/* <p className="legend">Legend 1</p> */}
                </div>
                <div>
                  {/* <img src="assets/2.jpeg" /> */}
                  <Barometer id="dial9" value="40" title="Barometer" />
                  <Barometer id="dial9" value="40" title="Barometer" />
                  {/* <p className="legend">Legend 2</p> */}
                </div>
                <div>
                  {/* <img src="assets/3.jpeg" /> */}
                  <Barometer id="dial9" value="40" title="Barometer" />
                  <Barometer id="dial9" value="40" title="Barometer" />
                  {/* <p className="legend">Legend 3</p> */}
                </div>
              </Carousel>

            </MDBCardBody>
            <MDBCardText>
              <small className='text-muted'>Last updated 3 mins ago</small>
            </MDBCardText>
          </MDBCard>
        </MDBCol>
        <MDBCol>
          <MDBCard className='h-100'>
            <MDBCardTitle>Humidity</MDBCardTitle>
            <MDBCardText>
              humidity Text..
            </MDBCardText>
            <MDBCardBody>
              <ReactSpeedometer
                fluidWidth={false}
                forceRender={true}
                needleHeightRatio={0.8}
                minValue={0}
                maxValue={100}
                value={humid.at(-1)}
                needleColor="steelblue"
              />
            </MDBCardBody>
            <MDBCardText>
              <small className='text-muted'>Last updated 3 mins ago</small>
            </MDBCardText>
          </MDBCard>
        </MDBCol>
        <MDBCol>
          <MDBCard className='h-100'>
            <MDBCardTitle>Soil Moisture</MDBCardTitle>
            <MDBCardText>
              soil moisture Text..
            </MDBCardText>
            <MDBCardBody>
              <ReactSpeedometer
                fluidWidth={false}
                forceRender={true}
                needleHeightRatio={0.8}
                minValue={0}
                maxValue={100}
                value={humid.at(-1)}
                needleColor="steelblue"
              />
            </MDBCardBody>
            <MDBCardText>
              <small className='text-muted'>Last updated 3 mins ago</small>
            </MDBCardText>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      <MDBCard>
        {/* <MDBCardTitle>Humidity</MDBCardTitle>
            <MDBCardText>
              humidity Text..
            </MDBCardText> */}
        <MDBCardBody>
          <Line
            data={chartData}
          // options={{
          //     responsive: true,
          //     scales: {
          //     y: {
          //         ticks: {
          //             autoSkip: true,
          //             maxTicksLimit: 10,
          //             beginAtZero: true,
          //         },
          //         gridLines: {
          //             display: true,
          //         },
          //     },
          //     x: {
          //         gridLines: {
          //             display: false,
          //         },
          //     },
          //     },
          //     pan: {
          //         enabled: true,
          //         mode: "xy",
          //         speed: 1,
          //         threshold: 1,
          //     },
          //     zoom: {
          //         enabled: true,
          //         drag: true,
          //         mode: "xy",
          //         limits: {
          //             max: 1,
          //             min: 0.5,
          //     },
          //     rangeMin: {
          //         x: 2,
          //         y: 1,
          //     },
          //     rangeMax: {
          //         x: 1,
          //         y: 1000,
          //     },
          // },
          // }}
          />
          <div>
            <input type="date" ref={sdate} />
            <input type="date" ref={edate} />
            <button onClick={filterData}>Filter</button>
            {/* <br/>
            <input type="month" onChange={filterMonth}/> */}
          </div>
        </MDBCardBody>
        <MDBCardText>
          <small className='text-muted'>Last updated 3 mins ago</small>
        </MDBCardText>
      </MDBCard>


      {/* <Grid container spacing={10} columns={3}>
        <Grid item xs={6} md={4}>
        <h3 className='title'>Current Temperature(in °C)</h3>
      
        </Grid>
        <Grid item xs={6} md={4}>
        <h3 className='title'>Current Humidity(in %)</h3>
       
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
        <Home/> */}
    </div>);
};

export default Dashboard;