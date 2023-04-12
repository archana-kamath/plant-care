import { API } from 'aws-amplify'

export async function getProjects(userid) {
  let users = await API.get('dashboardapi', '/projects/' + userid, {
  }).then(resp => {
    console.log(resp);
    return resp;
  }).catch(err => {
    console.log('Errrorr');
    console.log(err);
  });
  console.log(users);
  return users;
}
