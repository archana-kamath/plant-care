import React  from 'react';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { Button } from 'react-bootstrap';

import { useNavigate } from "react-router-dom";
import urls from '../utils';
export default function ListProjects() {

  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  function fetchItems() {
      //  axios.get("https://o1hd2bxh00.execute-api.us-east-1.amazonaws.com/dev/projects")
      console.log(urls.backendURL)
      axios.get(urls.backendURL+'/projects')
       .then(response=>{
        console.log(response.data);
        setItems(response.data);
        console.log("Items fectched are",items)
       })
       .catch(error=>{
        console.log(error);
       })  
  }
  
  const handleClick = () => {
    navigate("/addproj");
    };


  // fetch the list of items from the DynamoDB table
  useEffect(() => {
    fetchItems()
    // fetchItems().then(data => setItems(data));
    // console.log("Item is ",items);
  }, []);

  // handle the delete option
  function handleDelete(id) {

        axios.delete(`https://o1hd2bxh00.execute-api.us-east-1.amazonaws.com/dev/projects/object/${id}`)
          .then(response => {
            console.log(`Item ${id} deleted successfully.`);
            // do something else, like update state or refresh the item list
               // update the list of items in the state
        const newItems = items.filter(item => item.id !== id);
        setItems(newItems);
          })
          .catch(error => {
            console.log(`Error deleting item ${id}: ${error}`);
            // handle the error in some way, like displaying an error message
          });
      }
  
  return (
    <div>
   
    <Table striped bordered hover>
    <thead>
      <tr>
        <th>Project Id</th>
        <th>Project Name</th>
        <th>Project Description</th>
        <th>Project Type</th>
        <th>Delete </th>
      </tr>
    </thead>

    <tbody>
        {items.map(item => (
          <tr key={item.projectid}>
            <td>{item.projectid}</td>
            <td>{item.proj_name}</td>
            <td>{item.proj_desc}</td>
            <td>{item.proj_type}</td>
            <td>
              <button onClick={() => handleDelete(item.projectid)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    
  </Table>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
        <Button onClick={handleClick} style={{backgroundColor: 'green', color: 'white', padding: '10px', borderRadius: '5px'}}>Add New Project</Button>
        </div>  
    </div>

  );
}
  
  