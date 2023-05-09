import React, { useState } from 'react';
import './dashboard.css';
import '@aws-amplify/ui/dist/style.css';
import {  Grid } from '@material-ui/core';
import 'chartjs-adapter-date-fns';
import { getProjects } from '../services/project.service';
import { getNodesPerProjects } from '../services/nodes.service';
import { Auth } from 'aws-amplify';
import Dropdown from 'react-multilevel-dropdown';
import Card from 'react-bootstrap/Card';
import SideMenu from './SideMenu';


async function getUserProjects()
{
  const user = await Auth.currentAuthenticatedUser();
    let projectsList = await getProjects(user.username);
    let nl = []
    for (const element of projectsList)
    {
     let nodeDetails = await getNodesPerProjects(element.project_id);
     element.nodeDetail = nodeDetails;
     //const ND = nodeDetails.map(l =>{
        nl.push(nodeDetails)
     //})
    }
    return {nl, projectsList};
}

function Dashboard2() {
    const [nodeList, setNodeList] = useState([])
    const [projList, setProjList] = useState([])
    getUserProjects().then((projectsList) => {
        setNodeList(projectsList.nl);
        setProjList(projectsList.projectsList);
    });

    const proj_type = {farm:[], office:[], home:[]}
    const extractNodeType=projList.map(
        (b)=>{
            if(b.proj_type == 'Farm'){           
            return(
                proj_type.farm.push(b.project_id)             
            )}else if(b.proj_type == 'Office'){
                return(proj_type.office.push(b.project_id))
            }else if(b.proj_type == 'Home'){
                return(proj_type.home.push(b.project_id))
            }
        }
    )

    const project_node_map = {farm:[], office:[], home:[]}

    const extractNodeId = Array.from(nodeList).map(function(x){
        return(Array.from(x).map(x1=>{
            if((Array.from(proj_type.farm)).includes(x1.project_id)){
                project_node_map.farm[x1.project_id]+=([[],x1.node_id])
            }
            else if((Array.from(proj_type.office)).includes(x1.project_id)){
                project_node_map.office[x1.project_id]+=([[],x1.node_id])
            }
            else if((Array.from(proj_type.home)).includes(x1.project_id)){
                project_node_map.home[x1.project_id]+=([[],x1.node_id])
            }
        }))
    })

    const nodelist_farm = Object.entries(project_node_map.farm).map(([key,value])=>{
        const v = value.split(',')
        return (
            [key.toString(), v.slice(1)]
        );
      })

      const nodelist_office = Object.entries(project_node_map.office).map(([key,value])=>{
        const v = value.split(',')
        return (
            [key.toString(), v.slice(1)]
        );
      })

      const nodelist_home = Object.entries(project_node_map.home).map(([key,value])=>{
        const v = value.split(',')
        return (
            [key.toString(), v.slice(1)]
        );
      })
    

    const onDropDownClick= (e) =>{
        e.preventDefault();
        let selectedNode = e.target.outerText;
        localStorage.setItem('ls',selectedNode)
        console.log('FilteredNode', selectedNode);
    };

    return(
        <div style={{backgroundColor:'#f2f2f2'}}>
            <Grid  container spacing={{ xs:2 , md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <SideMenu/>
                <div style={{marginLeft:'290px', display:'flex', position:'relative'}}>
                <Grid  item xs={4}>
                <Card className= "meters" style ={{ borderRadius:'2.5rem', boxShadow:'10px 5px 5px dimgrey'}}>
                <Card.Body>
                <Card.Title className='cardTitle' style={{fontSize:"1.5em", fontStyle:"oblique"}}>Farm</Card.Title>
                <Card.Img style={{ width:'6em', float:'left'}} src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/95/null/external-farm-farm-flaticons-lineal-color-flat-icons-2.png"></Card.Img>
                    <Card.Subtitle style={{fontSize:"5em", fontStyle:"oblique", fontFamily:"serif", display:'flex', position:'relative', marginLeft:'20px',float:'right'}}>{proj_type.farm.length}</Card.Subtitle>
                    <Dropdown className='dropdownNew' title="Select a Farm Project">
                {(nodelist_farm).map(([key,value]) => 
                    (<Dropdown.Item >{key}
                        <Dropdown.Submenu >
                            {value.map(i =>
                                <Dropdown.Item onClick={onDropDownClick} value = {i}>{i}</Dropdown.Item>
                            )}
                        </Dropdown.Submenu>
                    </Dropdown.Item>)
                )}
            </Dropdown>
               </Card.Body>
                </Card>
                </Grid>
                <Grid item xs={3}>
                <Card className= "meters" style ={{ borderRadius:'2.5rem', boxShadow:'10px 5px 5px dimgrey'}}>
                <Card.Body>
                <Card.Title className='cardTitle' style={{fontSize:"1.5em", fontStyle:"oblique"}}>Office</Card.Title>
                <Card.Img style={{ width:'6em', float:'left'}}  src="https://img.icons8.com/external-flaticons-flat-flat-icons/100/null/external-office-wayfinding-flaticons-flat-flat-icons-2.png"></Card.Img>
                    <Card.Subtitle style={{fontSize:"5em", fontStyle:"oblique", fontFamily:"serif", display:'flex', position:'relative', float:'right'}}>{proj_type.office.length}</Card.Subtitle>
            <Dropdown className='dropdownNew' title="Select an Office Project">
                {(nodelist_office).map(([key,value]) => 
                    (<Dropdown.Item >{key}
                        <Dropdown.Submenu >
                            {value.map(i =>
                                <Dropdown.Item onClick={onDropDownClick} value = {i}>{i}</Dropdown.Item>
                            )}
                        </Dropdown.Submenu>
                    </Dropdown.Item>)
                )}
            </Dropdown>
            </Card.Body>
            </Card>
            </Grid>
            <Grid item xs={4}>
            <Card className= "meters" style ={{ borderRadius:'2.5rem', boxShadow:'10px 5px 5px dimgrey'}}>
                <Card.Body>
                <Card.Title className='cardTitle' style={{fontSize:"1.5em", fontStyle:"oblique"}}>Home</Card.Title>
                <Card.Img style={{ width:'6em', float:'left'}} src="https://img.icons8.com/bubbles/100/null/home.png"></Card.Img>
                    <Card.Subtitle style={{fontSize:"5em", fontStyle:"oblique", fontFamily:"serif", display:'flex', position:'relative', float:'right'}}>{proj_type.home.length}</Card.Subtitle>
                <Dropdown className='dropdownNew' title="Select a Home Project">
                {(nodelist_home).map(([key,value]) => 
                    (<Dropdown.Item >{key}
                        <Dropdown.Submenu >
                            {value.map(i =>
                                <Dropdown.Item onClick={onDropDownClick} value = {i}>{i}</Dropdown.Item>
                            )}
                        </Dropdown.Submenu>
                    </Dropdown.Item>)
                )}
            </Dropdown>
            </Card.Body>
            </Card>
            </Grid>
            </div>
            </Grid>
        </div>
    )
};

export default Dashboard2;
