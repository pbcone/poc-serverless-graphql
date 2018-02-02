const {sanatizeAction, contentFromCsvFileToDynamo,executeCountQuery} = require('./app.js');
//
// var chai = require('chai');
// var assert = chai.assert

var assert = require('assert');

test('Sucessfully sanatizes an input', () => {
    expect(sanatizeAction('Input')).toBe('Input');
});

test('Can input data to Dynamo when provided a CSV file', () => {
    let inputCsv = './csvFiles/shortTest.csv';
    let foo = contentFromCsvFileToDynamo(inputCsv)
    expect(false).toBe(true);
    //TODO: once api built to read objects in Dynamo finish this test
})

test('Can Read from the COUNT table', function () {
    let userId = {
        userId: "c796d733-9779-45c5-a130-20fd1fd0b652"
    };
    expect.assertions(1);
    return expect(executeCountQuery(userId)).resolves.toEqual(4);

});
