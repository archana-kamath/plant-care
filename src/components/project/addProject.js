import React,{useState} from "react";
import { Container, Card, Form, Row,Col, Button } from "react-bootstrap";
import axios from "axios";
import urls from '../utils';
import { useNavigate } from "react-router-dom";
export default function AddProject(){
   const navigate = useNavigate();
   const [projData, setprojData]=useState({});
   const [projectid, setid] =useState();
   const [proj_desc ,setDesc]=useState();
   const [proj_name,setName]=useState();
   const [proj_type,setType]=useState();

    // const nav=useNavigate();
    const handleChange=(event)=>{
        setprojData({...projData,[event.target.name]:event.target.value});
        // console.log(event.target.value);
        
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        console.log("Project data is ", projData);
 
        axios.post(urls.backendURL+'/projects',projData)
        .then(res=>{
            if (res.status==200){
                console.log("res data of add project api ",res.data);
                // alert(res.data.result);
                navigate('/listproj');
                console.log("project adding successful");
            }
            else{
                console.log("project adding unsuccessful");
            }  
        }).catch(error => {
            console.error(error);
         });
    }

return(

    <Container fluid>
            <Card style={{ width: '60rem' }}>
                <Card.Body>
           <form onSubmit={handleSubmit} onChange={handleChange} style={{fontWeight:"800", color:"green"}}>
               <Form.Group>
                 
                  <Form.Floating className="mb-3">
                  <label htmlFor="projectid" style={{marginLeft:10}} >Project Id </label>
                  <Form.Control type="text"  name="projectid" required/>
                  </Form.Floating>

                  <Form.Floating className="mb-3">
                  <label htmlFor="proj_desc" style={{marginLeft:10}} >Project Description</label>
                  <Form.Control type="text"  name="proj_desc" required/>
                  </Form.Floating>


                  <Form.Floating className="mb-3">
                  <label htmlFor="proj_name" style={{marginLeft:10}} >Project Name </label>
                  <Form.Control type="text"  name="proj_name" required/>
                  </Form.Floating>
                 
                  
                  <Form.Label>Select Project Type</Form.Label>
                  <Form.Control
                    name="proj_type"
                    as="select"
                    value={proj_type}
                    //   onChange={e => {
                    //     console.log("e.target.value", e.target.value);
                        // setType(e.target.value);
                    //   }}
                    >
                    <option value="Home">Home</option>
                    <option value="Office">Office</option>
                    <option value="Farm">Farm</option>
                    </Form.Control>

               </Form.Group>
               <br></br>
               <Row>
                   <Col>
                   <Button type="submit" variant="outline-danger">Add Project</Button>
                   </Col>
               </Row>
               </form>
           </Card.Body>
            </Card>
    </Container>
)

}
