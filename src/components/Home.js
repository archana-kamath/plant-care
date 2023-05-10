import { Authenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import Dashboard1 from './Dashboard1';
import Dashboard2 from './Dashboard2';
import './dashboard.css';


const formFields = {
    signUp: {
      family_name: {
        label:'Last Name',
        order: 1
      },
      given_name: {
        label:'First Name',
        order: 2
      },
      address:{
        label:'Address',
        placeholder: 'Enter your Address',
        order: 3
      },
      email: {
        order: 4
      },
    },
   }
  
  
  export default function Home() {
    return (
          <Authenticator formFields={formFields} signUpAttributes={[
            'address',
            'family_name',
            'given_name',
            'phone_number',
            'email',
          ]}>
        {({ signOut, user }) => (
          <main>
            <div style={{display:'flex', backgroundColor:'#f2f2f2', position:'relative', opacity:'0.9'}}>
                <p className='title'  style={{color:'black',top:'7px', marginLeft:'30px'}}>Logged in as {user.username}</p>
                <button className='signout' style={{top:'2px', float:'right', marginLeft:'70rem'}} onClick={ signOut }>Sign Out</button><br/>

            </div>
              <Dashboard1/>
              <Dashboard2/>
              
                {/* <Dashboard/> */}
          </main>
        )}
        </Authenticator>
    );
  }