import json
import boto3

def lambda_handler(event, context):
     # Create an instance of the DynamoDB client
    dynamodb = boto3.client('dynamodb')
    
    # Create an instance of the SNS client
    sns = boto3.client('sns')
    
     # Define the name of the DynamoDB table to read data from
    table_name = 'sensorData-dev'
  
    
    # Define the name of the SNS topic to send notifications to
    topic_arn = 'arn:aws:sns:us-east-1:902331659163:limekaalarm'
    
    def get_project_details(project_id):
        
        dynamodb = boto3.client('dynamodb')
        query_params = {
          'TableName': 'project-dev',
          'KeyConditionExpression': 'project_id = :project_id',
          'ExpressionAttributeValues': {
              ':project_id': {'S': project_id}
            }
        }
        response = dynamodb.query(**query_params)
        items = response['Items']
        print("project items are ",items)
        return items
    
    
    
    def get_items_by_node_id(node_id):
        print("node id in function", node_id)
        dynamodb = boto3.client('dynamodb')
        table_name = 'nodetable-dev'
        query_params = {
          'TableName': table_name,
          'KeyConditionExpression': 'node_id = :node_id',
          'ExpressionAttributeValues': {
              ':node_id': {'S': node_id}
            }
        }
        response = dynamodb.query(**query_params)
        print(response)
        items = response['Items']
        print(items)
        return items

    # Loop through each record in the event
    for record in event['Records']:
        # Check if the record is an INSERT operation
        if record['eventName'] == 'INSERT':
            # Extract the new item from the record
            new_item = record['dynamodb']['NewImage']
            
            if 'moisture' in new_item and 'S' in new_item['moisture']:
                moisture = int(new_item['moisture']['S'])
                print("moisture: ",moisture)
            if 'node' in new_item and 'S' in new_item['node']:
                node = new_item['node']['S']
                print("node: ",node)
                
                 
                items = get_items_by_node_id(node)
                print(items)
                moisture_threshold = items[0]['moisture_threshold']['S']
                print("Moisture threshold :",moisture_threshold)
                plant_type = items[0]['plant_type']['S']
                print("Type of Plant :",plant_type)
                
                project_id=items[0]['project_id']['S']
                print("Project Id :", project_id)
                
                project_item=get_project_details(project_id)
                proj_name = project_item[0]['proj_name']['S']
                user_id = project_item[0]['user_id']['S']
                
            
            
            
              
            if 'moisture' in new_item and int(new_item['moisture']['S']) < int(moisture_threshold):
                # If the condition is met, send an SNS notification
                    subject="Alert from your Plant Care Project: " + proj_name
                    message=='Hello'+user_id+'\nMoisture content is low : ' + str(moisture) + ' for ' +plant_type
                    sns.publish(
                    TopicArn=topic_arn,
                    Subject=subject,
                    Message=message
                    )

    
    # Return a success message
    return {
        'statusCode': 200,
        'body': 'nwjwqcj'
    }
