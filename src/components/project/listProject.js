import React  from 'react';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { Button, Container,Row,Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import urls from '../utils';
import { Auth } from 'aws-amplify';

export default function ListProjects() {
  
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [counter, setCounter] = useState();
  
  const [user_id, setUserId] = useState(null);
    
  // async function fetchUser() {
  //   try {
  //     const user = await Auth.currentAuthenticatedUser();
  //     setUsername(user.username);
  //     console.log("user is ",user.username);
  //   } catch (error) {
  //     console.log('Error fetching user:', error);
  //   }
  // }
  
   useEffect(() => {
    
    const response = new Promise(async (resolve, reject) => {
      const user = await Auth.currentAuthenticatedUser();
      if (user){
        console.log("use effect",user.username);
        resolve(user);
      }
      else{
        reject("eroor");
      }});
    
    response.then(res=>
      {
        console.log("res = ",res.username);
        setUserId(res.username);
        fetchItems(res.username);
      })

  },  []);

  function fetchItems(userName) { 
      
      console.log("user to send backend",userName)
      axios.get(urls.backendURL+'/projects/listproj',{
        params:{
          name: userName
        }
      })
       .then(response=>{
        if (response.data.length==0){
          navigate('/addproj')
        }
        console.log("data for username received from backend",response.data.length);
        setItems(response.data);
        setCounter(items.length);
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
    console.log("user id to send in api req",user_id);
    fetchItems();
    // fetchItems().then(data => setItems(data));
    // console.log("Item is ",items);
  }, []);

  // useEffect(() => {
  //   setCounter(items.length);
  // }, [items]);
   

  //Update function
  function handleUpdate(item){
    const data= item.item
    console.log("Item to be updated is ",data);
    navigate('/updateproj', { state: data });
  }


  // handle the delete option
  function handleDelete(id) {
    console.log("id in handle delete is ",id);
    console.log("username in handle delte",user_id);
           axios.delete(urls.backendURL+'/projects/object/'+id+'/'+user_id)

        // axios.delete(`https://o1hd2bxh00.execute-api.us-east-1.amazonaws.com/dev/projects/object/${id}`)
          .then(response => {
            console.log(`Item ${id} deleted successfully.`);
           
            // do something else, like update state or refresh the item list
               // update the list of items in the state
        const newItems = items.filter(item => item.id !== id);
        setItems(newItems);
        fetchItems(user_id);
          })
          .catch(error => {
            console.log(`Error deleting item ${id}: ${error}`);
            // handle the error in some way, like displaying an error message
          });
      }
  
  return (
    <React.Fragment>
    <Container fluid>

    <Row>
      <Col>
   
   
    <Table striped bordered hover>
    <thead>
      <tr>
        <th>Index</th>
        <th>Project Name</th>
        <th>Project Description</th>
        <th>Project Type</th>
        <th>Update</th>
        <th>Delete </th>
      </tr>
    </thead>

    <tbody>
        {items.map((item,index) => (
          // <tr key={item.projectid}>
            <tr key={index}>
            {/* <td>{counter + index + 1}</td>  */}
          
            {/* <td>{item.project_id}</td> */}

            <td>{index+1}</td>
            <td>{item.proj_name}</td>
            <td>{item.proj_desc}</td>
            <td>{item.proj_type}</td>
            <td>
              <button onClick={() => handleUpdate({item})}>Update</button>
            </td>
            <td>
              <button onClick={() => handleDelete(item.project_id)}>Delete</button>
            </td>

          </tr>
        ))}
      </tbody>
    
  </Table>
  </Col>
    <Col>
    <Button onClick={handleClick}  variant='dark'></Button>
    </Col>
  </Row>
  
        {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
        <Button onClick={handleClick} style={{backgroundColor: 'green', color: 'white', padding: '10px', borderRadius: '5px'}}>Add New Project</Button>
        </div>   */}
  
  </Container>
  
  </React.Fragment>

  );
}
  
  