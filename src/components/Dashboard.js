import React, { useState, useEffect, useRef } from 'react';
import { fetchAllSensorData, getSensorData } from '../services/sensorData.service';
import { getProjects } from '../services/project.service';
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
import Temperature from './Thermometer';
import Speedometer from './Speedometer';
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';
import { getNodesPerProjects } from '../services/nodes.service';
import { Auth } from 'aws-amplify';

Chart.register(...registerables);

async function getUserProjects()
{
  const user = await Auth.currentAuthenticatedUser();
    // get User Projects.. 
    let projectsList = await getProjects(user.username);
    for (const element of projectsList)
    {
     let nodeDetails = await getNodesPerProjects(element.project_id);
     element.nodeDetail = nodeDetails;
    }
    return projectsList;

}

function Dashboard() {
  const [time, setTime] = useState([]);
  const [temp, setTemp] = useState([]);
  const [humid, setHumidity] = useState([]);
  const [moist, setMoisture] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [cData, setCdata] = useState([]);
  const [projects, setProjects] = useState([]);
  getUserProjects().then((projectsList) => {
    setProjects(projectsList);
  });
  

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
    let projectsList = await getUserProjects();
    setProjects(projectsList);

  }, 5000);

  console.log('setData', cData);

  const time1 = [];
  const temp1 = [];
  const humid1 = [];
  const moist1 = [];
  const temp2 = [];
  const humid2 = [];
  const moist2 = [];
  const [dates, setDates] = useState();
  const [dataPoints, setDataPoints] = useState([]);
  const styles = {
    card: {
      height: `90%`,
    },
    title: {
      fontSize: "1em",
      color: "#000",
      marginTop: "10px"
    }

  };

  const sdate = useRef();
  const edate = useRef();

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


  useInterval(() => {
    chart();
  }, 10000);

  if (projects.length > 0) {
    return (
      <div>
        
        <MDBRow className='row-cols-md-3'>
        <MDBCol md='8'>
        <MDBRow className='row-cols-md-2'>
          {projects.map((project, i) => <MDBCol key={project.project_id}>
            <MDBCard style={styles.card}>
              <MDBCardTitle>Project {i + 1}</MDBCardTitle>
              <MDBCardText>
                {project.proj_desc}
              </MDBCardText>
              <MDBCardBody>
                <Carousel>
                  {Array.from({ length: 2 }, (_, j) => <div key={project.project_id}>
                    <div style={styles.title}>
                      Plant {j + 1}
                    </div>
                    <Speedometer id="speedometer" value={humid.at(-1)} title="Soil Moisture" />
                    <div className="sameRow">
                      <Barometer id="dial9" value="40" title="Humidity" />
                      <Temperature id="dial8" value="40" title="Recorded Temperature" />
                    </div>
                  </div>)}
                </Carousel>

              </MDBCardBody>
            </MDBCard>
          </MDBCol>)}
         </MDBRow>
          </MDBCol>
          <MDBCol md='4'>
          <MDBCard>
            <MDBCardBody>
              <Line
                data={chartData}
              />
              <div>
                <input type="date" ref={sdate} />
                <input type="date" ref={edate} />
                <button onClick={filterData}>Filter</button>
                {/* <br/>
          <input type="month" onChange={filterMonth}/> */}
              </div>
            </MDBCardBody>
          </MDBCard>
          </MDBCol>
        </MDBRow>

      </div>);
  }


};

export default Dashboard;