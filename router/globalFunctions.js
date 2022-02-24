const getPrimitiveType = (value) => {
    if (typeof value === "object"){
      if (Array.isArray(value)){
        return `array`
      }
      if (value === null){
        return `null`
      }
    }
  return `${typeof value}`
}
const returnMissingFields = (arr,obj) => {
let res = []
for (let i = 0; i < arr.length; i++){
  if (arr[i] in obj === false){
    res.push(arr[i])
  }
}
return res
}
const checkUser = (user) => {
  
  let missingFields = returnMissingFields(["first_name", "last_name", "email","password","re_password","picture","user_name"],user)
  if (missingFields.length > 0) {
      return {status:false,message:"Missing key properties"}
    }
    for (const [key, value] of Object.entries(user)) {
      if (getPrimitiveType(value) !== 'string'){
        return {status:false,message:"All user properties must be a string"}
     }
    
  }
    
}
module.exports = {getPrimitiveType:getPrimitiveType,checkUser:checkUser}