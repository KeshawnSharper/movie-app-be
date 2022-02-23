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

const checkUser = (user) => {
    if (!user.user_name || !user.email || !user.password || !user.re_password || !user.first_name || !user.last_name || !user.picture){
      return {status:false,message:"Missing key properties"}
    }
    for (const [key, value] of Object.entries(user)) {
      if (getPrimitiveType(value) !== 'string'){
        return {status:false,message:"All user properties must be a string"}
     }
    
  }
    
}
module.exports = {getPrimitiveType:getPrimitiveType,checkUser:checkUser}