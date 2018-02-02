var dynamodb = require('serverless-dynamodb-client').doc;

const COUNT_TABLE = process.env.COUNT_TABLE;
const LEDGER_TABLE = process.env.LEDGER_TABLE;

const getCount = userId =>
  dynamodb
    .get({
      TableName: COUNT_TABLE,
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
    return dynamodb
      .update({
        TableName: COUNT_TABLE,
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
    return dynamodb
      .update({
        TableName: COUNT_TABLE,
        Key: { userId },
        UpdateExpression: 'SET age = :age',
        ExpressionAttributeValues: {
          ':age': nextCount
        }
      })
      .promise()
      .then(_ => nextCount);
  });


const createAction = action =>
  dynamodb.put({
      TableName: LEDGER_TABLE,
      Item:{
        "actionId": action.actionId,
        "timeStamp": action.timeStamp,
        "minutesTrained": action.minutesTrained,
        "topic": action.topic,
        "email": action.email,
        "previoupreviousRecordingTimeStampsTimeStamp": action.previousRecordingTimeStamp
      }
    })
    .promise()
    .then(_=> 1);



module.exports = { getCount, incrementCount, decrementCount, createAction };
