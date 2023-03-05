import React, { Component } from 'react';
import { Container, Card, Form, Button, Table} from 'react-bootstrap';
import axios from 'axios'
import urls from '../utils';

class NodeComponent extends Component {

    constructor(props) {
        super(props);

       this.state ={
            userId:'',
            projectId:'',
            nodeId:'',
            plantType:'',
            moistureThreshold:'',
            temperatureThreshold:'',
            humidityThreshold:'',
            latitude:'',
            longitude:'',
            allNodes:[],
            selectedNodes:[]
       }
       this.handleProjectIdChange = this.handleProjectIdChange.bind(this);
       this.handleNodeIdChange = this.handleNodeIdChange.bind(this);
       this.handlePlantTypeChange = this.handlePlantTypeChange.bind(this);
       this.handleMoistureThresChange = this.handleMoistureThresChange.bind(this);
       this.handleTempThresChange = this.handleTempThresChange.bind(this);
       this.handleHumidityThresChange = this.handleHumidityThresChange.bind(this);
       this.handleLatitudeChange = this.handleLatitudeChange.bind(this);
       this.handleLongitudeChange = this.handleLongitudeChange.bind(this);
       this.onSelectChange = this.onSelectChange.bind(this);
    }

    onSelectChange = (rowId) => {
      let list=[]
      list = this.state.selectedNodes
    
      if(this.state.selectedNodes.includes(rowId)){
        list.pop(rowId)
      }else{
        list.push(rowId)
      }

      this.setState({
        selectedNodes: list
      });

      console.log(this.state.selectedNodes)
    };

    handleProjectIdChange = (e) => {
      this.setState({ projectId : e.target.value });
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
      console.log(this.state.projectId)
      console.log(this.state.userId)
      console.log(this.state.nodeId)
      console.log(this.state.plantType)
      console.log(this.state.moistureThreshold)
      console.log(this.state.temperatureThreshold)
      console.log(this.state.humidityThreshold)
      console.log(this.state.latitude)
      console.log(this.state.longitude)

      const nodeReq = {
        user_id:'user1',
        project_id:'project1',
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
        userId:'',
        projectId:'',
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
  onViewAllNodes = (event) => {
    event.preventDefault();

    axios.get(urls.backendURL+'/node/add').then(response => response.data).then((data) => {
      console.log(data.response)
      this.setState({ allNodes: data})
    });
  }

  onNodeDeletion = (event) => {
    event.preventDefault();

    console.log(this.state.selectedNodes)
    this.state.selectedNodes.map(node => 
    {
	   axios.delete(urls.backendURL+'/node/add/object/'+node).then(response => response.data).then((data) => {
       console.log(data.response)
     })
	  }
    )
    this.setState({
      selectedNodes:[]
    })

    axios.get(urls.backendURL+'/node/add').then(response => response.data).then((data) => {
      console.log(data.response)
      this.setState({ allNodes: data})
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
            &nbsp;
            <Button  onClick={this.onViewAllNodes} variant="dark">View</Button>
            &nbsp;
            <Button  onClick={this.onNodeDeletion} variant="dark">Delete</Button>
            </div>

            </Card.Body></Card>
            <Card><Card.Body>
            {(this.state.allNodes.length === 0) ? (
				<div></div>
			   ):(
        <div>
          <Table >
            {this.state.allNodes.length ===0?(<div></div>):(
              <thead class="thead-dark">
              <tr><th>Node ID</th><th>Project ID</th>
              <th>Plant Type</th><th>Moisture Threshold</th>
              <th>Temperature Threshold</th><th>Humidity Threshold</th>
              <th>Latitude</th><th>Longitude</th></tr>
            </thead> 
            )}

          {this.state.allNodes.map(item => (

            <tbody>
              <tr key={item.node_id}>
                <td>{item.node_id}</td>
                <td>{item.project_id}</td>
                <td>{item.plant_type}</td>
                <td>{item.moisture_threshold}</td>
                <td>{item.temperature_threshold}</td>
                <td>{item.humidity_threshold}</td>
                <td>{item.latitude}</td>
                <td>{item.longitude}</td>
                <td><input
                    type="checkbox"
                    checked={this.state.selectedNodes.includes(item.node_id)}
                    onClick={() => this.onSelectChange(item.node_id)}
                  /></td>
              </tr>
            </tbody>
          ))} </Table>
      </div>)}
            </Card.Body></Card>
        </Container>
    );
  }
}

export default NodeComponent;