import { API } from 'aws-amplify'
import urls from '../components/utils';
import axios from 'axios';

export async function getProjects(user_id) {
   
        let data = await axios.get(urls.backendURL+'/projects/listproj', {
            params:{
                name: user_id
            }
        })
        .then(res => {
          console.log('Projects of logged in user', res.data);
          return res.data;
        })
        .catch(err => {
          console.log('Error while fetching projects based on user id');
          console.log(err);
        });
        return data;
      

}
