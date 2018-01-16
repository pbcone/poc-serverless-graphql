const AWS = require('aws-sdk');
const promisify = require('./promisify');

const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

const getGreeting = firstName =>
  promisify(callback =>
    dynamoDb.get(
      {
        TableName: process.env.DYNAMODB_TABLE,
        Key: { firstName }
      },
      callback
    )
  )
    .then(result => {
      if (!result.Item) {
        return firstName;
      }
      return result.Item.nickname;
    })
    .then(name => `Hello, ${name}.`);

// add method for updates
const changeNickname = (firstName, nickname) =>
  promisify(callback =>
    dynamoDb.update(
      {
        TableName: process.env.DYNAMODB_TABLE,
        Key: { firstName },
        UpdateExpression: 'SET nickname = :nickname',
        ExpressionAttributeValues: {
          ':nickname': nickname
        }
      },
      callback
    )
  ).then(() => nickname);

module.exports = { getGreeting, changeNickname };
