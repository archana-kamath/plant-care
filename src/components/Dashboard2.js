import React, { useState, useRef } from 'react';
import { fetchAllSensorData } from '../services/sensorData.service';
import './dashboard.css';
import { useInterval } from './polling';
import '@aws-amplify/ui/dist/style.css';
import ReactSpeedometer from "react-d3-speedometer";
import { Grid } from '@material-ui/core';
import { Line } from "react-chartjs-2";
import { Chart, registerables} from 'chart.js';
import 'chartjs-adapter-date-fns';
import Barometer from './Barometer';
import Temperature from './Thermometer';
import Card from 'react-bootstrap/Card';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


Chart.register(...registerables);


function Dashboard2() {
    const [time, setTime] = useState([]);
    const [temp, setTemp] = useState([]);
    const [humid, setHumidity] = useState([]);
    const [moist, setMoisture] = useState([]);
    const [chartData, setChartData] = useState({labels:[],datasets:[], options:[]});
    const [cData, setCdata] = useState([]);
    const [node, setNode] = useState([]);

    const selectedNode = localStorage.getItem('ls')

    useInterval(async()=>{
        var data = await fetchAllSensorData();
        console.log('Data:', data);
        for (var i in data) {
                var timeStamp = (data[i]['time'].slice(0,-1));
                var timeFormat = new Date(timeStamp);
                timeFormat = String(timeFormat).split('GMT')[0];
                var temperature = parseInt(data[i]['temperature']);
                var humidity = parseInt(data[i]['humidity']);
                var moisture = parseInt(data[i]['moisture']);
                node.push(data[i]['node']);
        }
        setTime(time =>[...time, timeFormat]);
        setTemp(temp =>[...temp, temperature]);
        setHumidity(humid =>[...humid, humidity]);
        setMoisture(moist =>[...moist, moisture]);
        setCdata(data);
        setNode(new Set(node));
    },10000);
    console.log('setData', cData);

    const [filteredNodeData, setFilteredNodeData] = useState([]);
    
    const newFilter = [];

    useInterval(async()=>{
        const extractNodeData=cData.map(
            (x)=>{ 
                if(x.node === selectedNode) {
                    newFilter.push(x)
                }
            }
        )
        setFilteredNodeData(newFilter)
    }, 10000);


    console.log('Filtered Nodes:', filteredNodeData);
    
    const time1 = [];
    const temp1 = [];
    const humid1 = [];
    const moist1 = [];

    const extractData=filteredNodeData.map(
        (a)=>{ 
            let x = new Date(a.time);
            x = String(x).split('GMT')[0];               
            return(
                time1.push(x.substring(0,15)),
                temp1.push(a.temperature),
                moist1.push(a.moisture),
                humid1.push(a.humidity)                
            )
        }
    )

    let t = 35, h = 90, m = 700;
    let t1 = ((t-temp1.at(-1))/t)*100, h1 = ((h-humid1.at(-1))/h)*100, m1 = ((m-moist1.at(-1))/m)*100;
    t1=t1.toFixed(2); h1=h1.toFixed(2); m1= m1.toFixed(2);

    const [dates, setDates] = useState();
    const [dataPoints, setDataPoints] = useState([]);

    const sdate = useRef();
    const edate = useRef();

    const filterData = () => {
        const dates = [...time1];
        const dataPoints = [...cData];
        console.log('first:',dates, dataPoints);

        let value1 = sdate.current.value;
        let sd = new Date(value1)
        sd.setDate(sd.getDate() + 1);
        let sd1 = String(sd).split('GMT')[0];
        let value2 = edate.current.value;
        let ed = new Date(value2)
        ed.setDate(ed.getDate() + 1);
        let ed1 = String(ed).split('GMT')[0];
        console.log('values:',sd1, ed1);


        let sd2 =  sd1.substring(0,15);
        let ed2 =  ed1.substring(0,15);
        const startdate = dates.indexOf(sd2);
        const enddate = dates.lastIndexOf(ed2);
        console.log(startdate, enddate);

        const filterDate = dates.slice(startdate, enddate+1);
        const filterDataPoints = dataPoints.slice(startdate, enddate + 1);
        console.log('fd:', filterDate, filterDataPoints);

        setDates(filterDate);
        setDataPoints(filterDataPoints);
    }

    const temp2 = [];
    const humid2 = [];
    const moist2 = [];

    const extractFilteredData=dataPoints.map(
        (b)=>{               
            return(
                temp2.push(b.temperature),
                moist2.push(b.moisture),
                humid2.push(b.humidity)                 
            )
        }
    )

    const options= {
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
            }

    const defaultValues =
    {
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
        options : {options},
    }
    
    const withDates = {
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
        options : {options},
    }

    const chart = () => {
        if(dates && dataPoints ){
            setChartData(
               withDates
            );
        }else{
            setChartData(
                defaultValues
            );
        }
    };
    
    useInterval(()=>{
        chart();
    },10000);


  return(
    
  <div>
    <Grid className='grid' container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid  item xs={4}>
            <Card className= "meters" style={{ borderRadius:'2.5rem', boxShadow:'10px 5px 5px dimgrey', bottom:'88em', right:'35px'}}>
            <Card.Title  style={{fontSize:"1.5em", fontStyle:"oblique"}}> <Card.Img style={{ width:'2em'}} src="https://img.icons8.com/windows/40/null/temperature--v1.png"></Card.Img>
            Temperature
            </Card.Title>
            <Card.Body style={{display:'flex', justifyContent:'space-evenly'}}>
            <Card.Text >
            <Temperature value={temp1.at(-1)} title="Temperature"/> </Card.Text>
            <Card.Text style={{ width: 175, height: 175}}>
           <CircularProgressbar
            value={t1}
            text={`${t1}%`}
            styles={buildStyles({
                textColor: "black",
              })}
            />
            <p style={{fontStyle:"oblique", fontFamily:"serif"}}>Current Temperature is {`${t1}%`} above threshold</p>
            </Card.Text>
            
            </Card.Body>
        </Card>
        </Grid>
        <Grid item xs={4}>
        <Card  className= "meters" style={{ borderRadius:'2.5rem', boxShadow:'10px 5px 5px dimgrey', width:'36rem', height:'23rem', bottom:'88em', right:'35px'}}>
        <Card.Title style={{fontSize:"1.5em", fontStyle:"oblique"}}>
            <Card.Img style={{ width:'2em'}}  src="https://img.icons8.com/sf-black/40/null/humidity.png"></Card.Img>
            Humidity</Card.Title>
            <Card.Body style={{display:'flex', justifyContent:'space-evenly'}}>
            <Card.Text><Barometer id="dial9" value={humid1.at(-1)} title="Humidity" /></Card.Text>
            <Card.Text style={{ width: 175, height: 175 }}>
            <CircularProgressbar
            value={h1}
            text={`${h1}%`}
            styles={buildStyles({
                textColor: "black",
                pathColor: "red",
              })}
            />
            <p style={{fontStyle:"oblique", fontFamily:"serif"}}>Current Humidity is {`${h1}%`} above threshold</p>
            </Card.Text>
            </Card.Body>
        </Card>
        
        </Grid>
    </Grid>
    <Grid className='grid' container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

    <Grid  xs={8}>
        <Card className= "meters" style={{ borderRadius:'2.5rem', boxShadow:'10px 5px 5px dimgrey', height:"20rem", width:'66rem', bottom:'87em', right:'35px'}}>
        <Card.Title  style={{fontSize:"1.5em", fontStyle:"oblique"}}>
            <Card.Img style={{ width:'2em'}}  src="https://img.icons8.com/glyph-neue/40/null/moisture.png"></Card.Img>
        Moisture (in VWC)</Card.Title>          
       <Card.Body style={{display:'flex', justifyContent:'space-evenly'}}>
       <Card.Text>
        <ReactSpeedometer
            fluidWidth={false}
            forceRender={true}
            needleHeightRatio={0.8}
            minValue={0}
            maxValue={1000}
            value={moist1.at(-1)}
            needleColor="steelblue"
            />
            </Card.Text> 
            <Card.Text style={{ width: 175, height: 175 }}>
            <CircularProgressbar
            value={m1}
            text={`${m1}%`}
            styles={buildStyles({
                textColor: "black",
                pathColor: "orange",
              })}
            />
            <p style={{fontStyle:"oblique", fontFamily:"serif"}}>Current Moisture is {`${m1}%`} above threshold</p>
            </Card.Text>
            </Card.Body> 
        </Card>
        
     </Grid>
     </Grid>
     <div>
        <Grid item md={11}>
        <Card style={{marginLeft:'22em' ,borderRadius:'2.5rem', boxShadow:'10px 5px 5px dimgrey', width:'66rem', bottom:'86em', right: '35px'}}>
        <Card.Body style={{display:'flex'}}>
        <h3 className='title' style={{fontStyle:'oblique', marginLeft:'20px'}}>Explore Trends</h3>
        <div style={{marginLeft:'25em'}}>
            <input style={{margin:'10px'}} type="date" ref={sdate} />
            <input type="date" ref={edate} />
            <button style={{margin:'10px', backgroundColor:'black', borderRadius:'0.5em', color:'#f2f2f2'}} onClick={filterData}>Go..</button>
        </div>
        </Card.Body>
        <div>
            <Line
                data={chartData}
            />
        </div>
        </Card>
        </Grid>
        </div>  
  </div>);
};

export default Dashboard2;
