const AWS = require("aws-sdk");
const { AWS_ACCESS, AWS_SECRET,AWS_REGION_ID} =
  process.env;
  AWS.config.update({
    accessKeyId: AWS_ACCESS,
    secretAccessKey: AWS_SECRET,
    region: AWS_REGION_ID
})

const dynamoDB = new AWS.DynamoDB.DocumentClient()
module.exports ={
scanDB: async (table,filterID,filterProp) => {
    if (table instanceof String === false){
      return `Table name is not a string it is a ${typeof table}`
    }
    let items = await dynamoDB.scan({TableName: table}).promise()
    items = items["Items"]
    if (filterID !== null){
      items = items.filter(item => item[`${filterProp}`] === filterID)
    }
    return items
  }
}