import React, { Component } from 'react';
import { useCallback } from "react";
import { Container, Card, Form, Button, Table} from 'react-bootstrap';
import axios from 'axios'
import urls from '../utils';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { MarkerF,InfoWindow } from '@react-google-maps/api';
  const center = {
    lat: 37.3387,
    lng: -121.8853
  };

const containerStyle = {
    width: '800px',
    height: '400px'
  };
  
class MapComponent extends Component {

    
    constructor(props) {
        super(props);

       this.state ={
            userId:'',
            projectId:'',
            nodeList:[],
            selected:'',
            lat:'',
            lng:''
       }
       this.onSelect = this.onSelect.bind(this);
       this.mapClick = this.mapClick.bind(this);
    }

    onSelect = e => {
        this.setState({ selected : e });
    }

    mapClick = e => {
        console.log("Lat: "+e.latLng.lat());
        console.log("Lng: "+e.latLng.lng());
        this.setState({
            lat:e.latLng.lat(),
            lng:e.latLng.lng()
        })
        this.props.parentCallback(e.latLng.lat(),e.latLng.lng());
    }

    componentDidMount(props){

        this.setState({
           userId: this.props.myPropUserId
        })
        this.setState({
            projectId: this.props.myPropProjectId
        })

         axios.get(urls.backendURL+'/node/add').then(response => response.data).then((data) => {
             this.setState({ nodeList: data})
           }).catch((err) => console.log(err));
         
    }

  render() {
    return (
        <Container fluid>
        {/* <h4>Map Component</h4>
        <h5>Latitude:{this.state.lat}</h5>
        <h5>Longitude:{this.state.lng}</h5> */}
        <LoadScript
            googleMapsApiKey=""
        >
       
       <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onClick={e => this.mapClick(e)}>
            { this.state.nodeList.map((node,index) => 
                {
                    {
       return( <MarkerF key={node.nodeId}
         position={{lat:Number(node.latitude),lng: Number(node.longitude)}}
         onClick={() => this.onSelect(node)}/>)
                    }
                }
            ) 
         }
         {
            this.state.selected.latitude &&
            this.state.selected.longitude && 
                (
                <InfoWindow
                    position={{lat:Number(this.state.selected.latitude),
                    lng: Number(this.state.selected.longitude)}}
                    clickable={true}
                    onCloseClick={() => {
                        this.setState({
                            selected:''
                        })
                    }}
                    >
                    <div>
                        <h6>Node ID : {this.state.selected.node_id}</h6>
                        <h6>Moisture Threshold : {this.state.selected.moisture_threshold}</h6>
                        <h6>Tempertature Threshold : {this.state.selected.temperature_threshold}</h6>
                        <h6>Humidity Threshold : {this.state.selected.humidity_threshold}</h6>
                        <h6>Latitude : {this.state.selected.latitude}</h6>
                        <h6>Longitude : {this.state.selected.longitude}</h6>
                    </div>
                </InfoWindow>
                )
         }
    
      </GoogleMap>
      </LoadScript>
        {/* <h2>{this.state.userId}</h2>
        <h2>{this.state.projectId}</h2> */}
        </Container>
    );
  }
}


export default MapComponent;
