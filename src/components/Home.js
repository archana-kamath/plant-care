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
            <div>
                <h5 className='title' style={{float:'right', marginRight:'51px', top:'20px'}}>{user.username}</h5>
                <button className='signout' onClick={ signOut }>Log Out</button>

            </div>
              <Dashboard1/>
              <Dashboard2/>
              
                {/* <Dashboard/> */}
          </main>
        )}
        </Authenticator>
    );
  }