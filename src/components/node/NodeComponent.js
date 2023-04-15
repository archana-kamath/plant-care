import React, { Component } from 'react';
import { Container, Card, Form, Button, Table,  Col, Row} from 'react-bootstrap';
import axios from 'axios'
import urls from '../utils';
import MapComponent from '../maps/MapComponent';
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';

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

    componentDidMount(){

        var url = window.location.href
        var projectId = url.split('/');
        console.log(projectId[4])
        this.setState({projectId: projectId[4]})

        axios.get(urls.backendURL+'/node/listNode', {
            params:{
                name: projectId[4]
            }
          })
          .then(response => response.data)
          .then((data) => {
          console.log('Nodes of given project id', data);
          this.setState({ allNodes: data})
          })
          .catch(err => {
          console.log('Error while fetching nodes based on project id');
          console.log(err);
          });    
    }

    handleCallback = (childData1,childData2) =>{
      this.setState({
        latitude: childData1,
        longitude: childData2
      })
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

      if( this.state.plantType==='' ||
      this.state.moistureThreshold==='' || this.state.temperatureThreshold==='' ||
      this.state.humidityThreshold==='' || this.state.latitude==='' || this.state.longitude===''){
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
        user_id:this.state.userId,
        project_id:this.state.projectId,
        node_id: uuidv4(),
        plant_type: this.state.plantType,
        moisture_threshold: this.state.moistureThreshold,
        temperature_threshold: this.state.temperatureThreshold,
        humidity_threshold:this.state.humidityThreshold,
        latitude:this.state.latitude,
        longitude:this.state.longitude
      }

      axios.post(urls.backendURL+'/node',nodeReq).then(response => response.data).then((data) => {
      console.log(data.response)
      console.log(JSON.stringify(data))
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
    }).catch((err) => console.log(err));;

    var url = window.location.href
    var projectId = url.split('/');
    console.log(projectId[4])
    this.setState({projectId: projectId[4]})

    axios.get(urls.backendURL+'/node/listNode', {
      params:{
          name: projectId[4]
      }
    })
    .then(response => response.data)
    .then((data) => {
    console.log('Nodes of given project id', data);
    this.setState({ allNodes: data})
    })
    .catch(err => {
    console.log('Error while fetching nodes based on project id');
    console.log(err);
    });  

  }
  onViewAllNodes = (event) => {
    var url = window.location.href
    var projectId = url.split('/');
    console.log(projectId[4])
    this.setState({projectId: projectId[4]})

    axios.get(urls.backendURL+'/node/listNode', {
      params:{
          name: projectId[4]
      }
    })
    .then(response => response.data)
    .then((data) => {
    console.log('Nodes of given project id', data);
    this.setState({ allNodes: data})
    })
    .catch(err => {
    console.log('Error while fetching nodes based on project id');
    console.log(err);
    });  
  }

  onNodeDeletion = (event) => {
    event.preventDefault();

    console.log(this.state.selectedNodes)
    this.state.selectedNodes.map(node => 
    {
	   axios.delete(urls.backendURL+'/node/object/'+node+'/'+this.state.projectId).then(response => response.data).then((data) => {
       console.log(data.response)
     })
	  }).catch((err) => console.log(err));
    this.setState({
      selectedNodes:[]
    })
  }

  onGoogleMaps= (event) => {
    var url = window.location.href
    var projectId = url.split('/');
    console.log(projectId[4])
    this.setState({projectId: projectId[4]})

    window.location.reload(false);

  }

  render() {
    return (<React.Fragment>
        <Container fluid>
          <Table>
          <Row>
            <Col>
            <Card style={{ width: '20rem'}}><Card.Body>

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

            &nbsp;
            <Row>
            <Button  onClick={this.onNodeSubmission} variant="dark">Submit</Button>
            </Row>
            &nbsp;
            <Row>
            <Button  onClick={this.onGoogleMaps} variant="dark">Reload Maps</Button>
            </Row>
         
            </Card.Body></Card>
            </Col><Col>
            <Card>
              <Card.Body>
              <h5>Project Id : {this.state.projectId}</h5>
                <MapComponent 
                      parentCallback = {this.handleCallback}
                      myPropProjectId={window.location.href.split('/')[4]}>
                </MapComponent>
              </Card.Body>
            </Card>
            </Col>
            </Row>
            <Row>
            <Card><Card.Body>
            {(this.state.allNodes.length === 0) ? (
				<div>
            <Button  onClick={this.onViewAllNodes} variant="dark">Reload Table</Button>
        </div>
			   ):(
        <div>
          <Table>
            {this.state.allNodes.length ===0?(<div>
            </div>):(
              <thead className="thead-dark">
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
                    defaultChecked={this.state.selectedNodes.includes(item.node_id)}
                    onClick={() => this.onSelectChange(item.node_id)}
                  /></td>
              </tr>
            </tbody>
          ))}</Table>
          <Row><Col>
          <Button  onClick={this.onViewAllNodes} variant="dark">Reload Table</Button></Col>
          <Col><Button  onClick={this.onNodeDeletion} variant="dark">Delete Node</Button></Col>
          </Row>
      </div>)}
            </Card.Body></Card></Row></Table>
        </Container></React.Fragment>
    );
  }
}

export default NodeComponent;