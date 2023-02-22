import React, { Component } from 'react';
import { Container, Card,Form,Button } from 'react-bootstrap';
import axios from 'axios'
import urls from '../utils';

class NodeComponent extends Component {

    constructor(props) {
        super(props);

       this.state ={
            nodeId:'',
            plantType:'',
            moistureThreshold:'',
            temperatureThreshold:'',
            humidityThreshold:'',
            latitude:'',
            longitude:''
       }
       this.handleNodeIdChange = this.handleNodeIdChange.bind(this);
       this.handlePlantTypeChange = this.handlePlantTypeChange.bind(this);
       this.handleMoistureThresChange = this.handleMoistureThresChange.bind(this);
       this.handleTempThresChange = this.handleTempThresChange.bind(this);
       this.handleHumidityThresChange = this.handleHumidityThresChange.bind(this);
       this.handleLatitudeChange = this.handleLatitudeChange.bind(this);
       this.handleLongitudeChange = this.handleLongitudeChange.bind(this);

    }
    handleNodeIdChange = (e) => {
      this.setState({ nodeId : e.target.value });
    } 
    handlePlantTypeChange = (e) => {
      this.setState({ plantType: e.target.value });
    } 
    handleMoistureThresChange = (e) => {
      this.setState({ moistureThreshold: e.target.value });
    }
    handleTempThresChange = (e) => {
      this.setState({ temperatureThreshold: e.target.value });
    }
    handleHumidityThresChange = (e) => {
      this.setState({ humidityThreshold: e.target.value });
    }
    handleLatitudeChange = (e) => {
        this.setState({ latitude: e.target.value });
    }
    handleLongitudeChange = (e) => {
      this.setState({ longitude: e.target.value });
    }

    onNodeSubmission = (event) => {
      event.preventDefault();

      if(this.state.nodeId=='' || this.state.plantType=='' ||
      this.state.moistureThreshold=='' || this.state.temperatureThreshold=='' ||
      this.state.humidityThreshold=='' || this.state.latitude=='' || this.state.longitude==''){
        alert("Please entry all the fields")
        return
      }

      console.log(this.state.nodeId)
      console.log(this.state.plantType)
      console.log(this.state.moistureThreshold)
      console.log(this.state.temperatureThreshold)
      console.log(this.state.humidityThreshold)
      console.log(this.state.latitude)
      console.log(this.state.longitude)

      const nodeReq = {
        node_id: this.state.nodeId,
        plant_type: this.state.plantType,
        moisture_threshold: this.state.moistureThreshold,
        temperature_threshold: this.state.temperatureThreshold,
        humidity_threshold:this.state.humidityThreshold,
        latitude:this.state.latitude,
        longitude:this.state.longitude
      }

      axios.post(urls.backendURL+'/node/add',nodeReq).then(response => response.data).then((data) => {
      console.log(data.response)
      this.setState({
        nodeId:'',
        plantType:'',
        moistureThreshold:'',
        temperatureThreshold:'',
        humidityThreshold:'',
        latitude:'',
        longitude:''
       })
    });

    }

  render() {
    return (
        <Container fluid>
            <Card style={{ width: '40rem' }}><Card.Body>
            <h3>Node Page </h3>

            <Form.Control type="text" value={this.state.nodeId}
            placeholder="node#" onChange={this.handleNodeIdChange}/>

            <Form.Control type="text" value={this.state.plantType}
            placeholder="Plant Type" onChange={this.handlePlantTypeChange}/>
            
            <Form.Control type="text" value={this.state.moistureThreshold}
            placeholder="Moisture Threshold" onChange={this.handleMoistureThresChange}/>

            <Form.Control type="text" value={this.state.temperatureThreshold}
            placeholder="Temperature Threshold" onChange={this.handleTempThresChange}/>

            <Form.Control type="text" value={this.state.humidityThreshold}
            placeholder="Humidity Threshold" onChange={this.handleHumidityThresChange}/>

            <Form.Control type="text" value={this.state.latitude}
            placeholder="Latitude" onChange={this.handleLatitudeChange}/>

            <Form.Control type="text" value={this.state.longitude}
            placeholder="Longitude" onChange={this.handleLongitudeChange}/>

            <div className="col d-flex justify-content-center">
            <Button  onClick={this.onNodeSubmission} variant="dark">Submit</Button>
            </div>

            </Card.Body></Card>
        </Container>
    );
  }
}

export default NodeComponent;