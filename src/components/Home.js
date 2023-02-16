import { useAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import './dashboard.css';


const Home = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user.username]);
  return (
    <div>
    <div>
      <button className='signout' onClick={signOut}>Log Out</button>
    </div>
    </div>
  );
};

export default Home