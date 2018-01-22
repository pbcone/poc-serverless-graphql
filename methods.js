const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

const getCount = userId =>
  dynamoDb
    .get({
      TableName: process.env.DYNAMODB_TABLE,
      Key: { userId }
    })
    .promise()
    .then(result => {
      if (!result.Item) {
        return 0;
      }
      return result.Item.age;
    });

const incrementCount = (userId, n) =>
  getCount(userId).then(currentCount => {
    const nextCount = currentCount + n;
    return dynamoDb
      .update({
        TableName: process.env.DYNAMODB_TABLE,
        Key: { userId },
        UpdateExpression: 'SET age = :age',
        ExpressionAttributeValues: {
          ':age': nextCount
        }
      })
      .promise()
      .then(_ => nextCount);
  });

const decrementCount = (userId, n) =>
  getCount(userId).then(currentCount => {
    const nextCount = currentCount - n;
    return dynamoDb
      .update({
        TableName: process.env.DYNAMODB_TABLE,
        Key: { userId },
        UpdateExpression: 'SET age = :age',
        ExpressionAttributeValues: {
          ':age': nextCount
        }
      })
      .promise()
      .then(_ => nextCount);
  });

module.exports = { getCount, incrementCount, decrementCount };
