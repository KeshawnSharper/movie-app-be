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
const getStringCharacterType = (value) => {
  if (!isNaN(value)){
    return "Number"
  }
  if (value.toLowerCase() == value && /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g.test(value) === false ){
    return "Lowercase String"
    
  }
   if (value.toUpperCase() == value && /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g.test(value) === false){
    return "Uppercase String"
  }
  if ( /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g.test(value)){
    return "Symbol"
  }
}
const checkUser = (user) => {
  let missingFields = returnMissingFields(["first_name", "last_name", "email","password","re_password","picture","user_name"],user)
  if (missingFields.length > 0) {
      return {status:false,message:"Missing key properties"}
    }
    let checkedPassword = checkPassword(user)
    let verifiedEmail = verifyEmail(user.email)

    if(checkedPassword.status === false) {
      return checkedPassword
    }
    
    if(verifiedEmail.status === false) {
      return verifiedEmail
    }
    for (const [key, value] of Object.entries(user)) {
      if (getPrimitiveType(value) !== 'string'){
        return {status:false,message:"All user properties must be a string"}
     }
    
  }
}

const verifyEmail = (email) => {
  if (email.includes('@') && email.includes('.com') && email.length > 7){
    return true
  }
  return {status:false,message:"Email not valid"}
}

const checkPassword = ({password,re_password}) => {
  if(getPrimitiveType(password) !== 'string' || getPrimitiveType(re_password) !== 'string' ){
    return {status:false,message:"Password fields must be a string"}
  }
  if (password !== re_password){
    return {status:false,message:"password and re_password must be the same"}
  }
  let password_req = {cap:false,low:false,char:false,num:false,}
  if (password.length < 7){
    return {status:false,message:"Password not secure enough"}
  }

  for (let i = 0; i < password.length; i++) {
    
    if (getStringCharacterType(password[i]) === "Lowercase String"){
      password_req["low"] = true
      
    }
     if (getStringCharacterType(password[i]) === "Uppercase String"){
      password_req["cap"] = true
    }
    if (getStringCharacterType(password[i]) === "Symbol"){
      password_req["char"] = true
    }

    if (getStringCharacterType(password[i]) === "Number"){
      password_req["num"] = true
    }
  }
  return password_req["num"] === true && password_req['cap'] === true && password_req['low'] === true && password_req['char'] === true ?  true  : {status:false,message:"Password not secure enough"}

}


module.exports = {getPrimitiveType:getPrimitiveType,checkUser:checkUser}