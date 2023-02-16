import { API } from 'aws-amplify'

export async function getSensorData(time) {
  let data = await API.get('dashboardapi', '/sensorData/' + time, {
  }).then(resp => {
    console.log(resp);
    return resp;
  }).catch(err => {
    console.log('Errrorr');
    console.log(err);
  });
  console.log(data);
  return data;
}

export async function fetchAllSensorData() {
  let data = await API.get('dashboardapi', '/sensorData/all', {
  }).then(resp => {
    resp = resp.sort(function (a, b) {
      return new Date(a.time) - new Date(b.time);
    });
    return resp;
  }).catch(err => {
    console.log('Errrorr');
    console.log(err);
  });
  return data;
}