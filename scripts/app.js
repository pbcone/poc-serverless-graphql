const csvFilePath = './csvFiles/shortTest.csv'
const csv = require('csvtojson')
const { createApolloFetch } = require('apollo-fetch');

const fetch = createApolloFetch({
  uri: 'http://localhost:3000',
});

let sanatizeAction = (lineFromCsvFile) => {
  sanatizedLineFromCsvFile = lineFromCsvFile;
  return sanatizedLineFromCsvFile;
};

let contentFromCsvFileToDynamo = (file) => {
  let actionVariable = null;
  let createActionMutation = `mutation creatingAction($actionJson: JSON) {
    createAction(action: $actionJson)
  }`;
  let checkSum = 0;
    return csv({
      noheaders:true,
      headers:['timeStamp','minutesTrained','topic','blank','email','previousRecordingTimeStamp'],
      ignoreEmpty: true
    })
      .fromFile(file)
      .on('json',(lineFromCsvFile)=>{
        checkSum++;
        lineFromCsvFile = sanatizeAction(lineFromCsvFile);
        actionVariable = {
          actionJson: {
            actionId: Math.random().toString(),
            timeStamp: lineFromCsvFile.timeStamp,
            minutesTrained: lineFromCsvFile.minutesTrained,
            topic: lineFromCsvFile.topic,
            email: lineFromCsvFile.email,
            previousRecordingTimeStamp: lineFromCsvFile.previousRecordingTimeStamp
          }
        }
        fetch({query:createActionMutation, variables:actionVariable }).then(res => {
        }).catch(console.log);

      })
      .on('done',()=>{
        console.log('Finished adding ', checkSum,' items into Dynamo');
        return checkSum;
      })
      .on('error',(err)=>{
        console.log(err)
      })
}

let executeCountQuery = (userId) => {
  return new Promise( (resolve,reject) =>{
    let countQuery = `query counter($userId: ID!) {
      count (user: $userId)
    }`;
    fetch({ query: countQuery, variables: userId })
    .then((res) => {
      if( res.data.count >0 ){
        resolve(res.data.count)
      }else{
        reject(res)
      }
    })
  });
};

module.exports = {sanatizeAction, contentFromCsvFileToDynamo,executeCountQuery};
