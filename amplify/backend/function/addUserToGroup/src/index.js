

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    const AWS = require('aws-sdk');
    const cognitoISP = new AWS.CognitoIdentityServiceProvider({
      apiVersion: '2016-04-18'
    });
    
    console.log("Add User to Group Triggered");
    console.log("managerid");
    // console.log(event.request.userAttributes['custom:managerid']);

    const params = {
      GroupName: 'users',
      UserPoolId: event.userPoolId,
      Username: event.userName
    };
  
    cognitoISP
      .adminAddUserToGroup(params)
      .promise()
      .then(() => callback(null, event))
      .catch(err => callback(err, event));
};
