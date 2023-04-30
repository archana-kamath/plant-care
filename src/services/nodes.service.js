import urls from '../components/utils';
import axios from 'axios';

export async function getNodesPerProjects(project_id) {
    return axios.get(urls.backendURL + '/node/listNode', {
        params: {
            name: project_id
        }
    })
        .then(response => response.data)
        .then((data) => {
            console.log('Nodes of given project id', data);
            return data;
        })
        .catch(err => {
            console.log('Error while fetching nodes based on project id');
            console.log(err);
        });
}