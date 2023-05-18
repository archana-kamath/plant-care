# CMPE295 - SJSU Masters Project- Plant Care Partner

## Project Introduction

Climate change and farmers' limited technological knowledge makes it necessary to create an IoT based intelligent farming system.Utilizing IoT sensors makes it possible to handle environmental conditions with ease. With the help of sensor information, essential aspects, such as pH, temperature, and humidity, can be monitored. This helps farmers monitor the health of the plants. Any user can create an account and securely login to the application and create projects ranging from a big farm to an indoor plants. Each of these projects have an option to add nodes (a single unit of plant) and identify the location of it on google maps by providing its latitude and langitude. A dashboard which showcases various projects of a user and analysis of the last updated temperature, humidity and moisture can be seen along with the past trends in a particular date range.

## Architecture Diagram:

![arch_dgm](https://github.com/archana-kamath/plant-care/assets/27188674/411712b6-82d4-45dc-b9bc-c170d8a300c3)

## Requirements to run the project locally:

* A free tier AWS account with IAM user access.
* AWS Components required are as mentioned in the following section.
* Softwares Required: Node JS, React JS
* Clone this git repository using ```git clone https://github.com/archana-kamath/plant-care.git```
* Install frontend dependencies using ```npm install```
* Then install amplify dependencies using ```npm install aws-amplify```
* Now run ```amplify init``` to initailize amplify
* Run ```npm start``` and now the application starts running at ```localhost:3000```
* Note: Helper lambda functions can be used from ```IoT sensor - SNS Notification.py```

## AWS Components Required:

* Amplify: Amplify Auth helped us to achieve a secure authentication and authorization flow. With the help of Cognito as its main authentication provider, it enables in                  building a  robust user directory service that handles user registration, authentication, account verification and other operations.   

* Cognito: Cognito was used to authorize users by validating the token with the federated identity providers like Facebook and Google received upon login. It creates user                pools to store the registered and logged in users from both, amplify login as well as social providers login.

* API Gateway: This service is used to receive user details from the frontend and act as a integration endpoint for backend resource. It invokes the custom Lambda authorizer                 and passes the token for further validation.

* CloudFormation:  CloudFormation helped us in creating a template of all the resources and its properties generated via Amplify. 

* AWS IoT: AWS IoT Core is a managed cloud service that lets connected devices easily and securely interact with cloud applications and other devices.

* Amazon Dynamo DB: A NoSQL DB used to store IoT sensor data coming from AWS IoT. 

* Lambda: A lambda function which gets triggered once set thresholds of temperature, humidity and moisture are dropped. An emails is sent to user. 

* SNS: A notification service which helps user to monitor and respond immediately if plant needs attention.

* Cloud Watch: A monitoring service to keep track of the health and utilization of resources.

## Application Screenshots:
