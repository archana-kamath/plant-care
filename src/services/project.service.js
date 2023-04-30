import { API } from 'aws-amplify'
import urls from '../components/utils';
import axios from 'axios';

export async function getProjects(user_id) {
  return await axios.get(urls.backendURL + '/projects/listproj', {
    params: {
      name: user_id
    }
  })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });

}
