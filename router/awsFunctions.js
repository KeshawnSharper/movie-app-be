const AWS = require("aws-sdk");
const { AWS_ACCESS, AWS_SECRET,AWS_REGION_ID} =
  process.env;
  AWS.config.update({
    accessKeyId: AWS_ACCESS,
    secretAccessKey: AWS_SECRET,
    region: AWS_REGION_ID
})

const dynamoDB = new AWS.DynamoDB.DocumentClient()
const globalFunctions = require('./globalFunctions')
const {getPrimitiveType} = globalFunctions
module.exports ={
scanDB: async (table,filterID,filterProp) => {
    if (getPrimitiveType(table) !== 'string') {
      return `ScanDB's parameter Table name must be a string recieved a(n) ${getPrimitiveType(table)}`
    }
    if (typeof filterProp !== "string"){
        return `ScanDB's parameter filterProp must be a string recieved a(n) ${getPrimitiveType(filterProp)}`
    }
    let items = await dynamoDB.scan({TableName: table}).promise()
    items = items["Items"]
    if (filterID !== null){
      items = items.filter(item => item[`${filterProp}`] === filterID)
    }
    return items
  }
}