let {
    express,
    router,
    bcrypt,
    jwt,
    multer,
    axios,
    v4,
    nodemailer,
    scanDB,
    storage,
    response,
    AWS_ACCESS, AWS_SECRET,AWS_REGION_ID,
    checkUser, checkAWSCreds, checkGlobalUser,getPrimitiveType
} 
= require('../basicConfig.js/basicConfig')


router.post(`/`, async(req, res) => {
    try{
    let user = req.body
    if (getPrimitiveType(user.email) === 'string') {
      user.email = user.email.toString().toLowerCase()
    }
    let checkedGlobalUser = checkGlobalUser(user,{"email":"string","password":"string"})
    if (checkedGlobalUser.status === false) {
      res.status(500).json({"message":checkedGlobalUser.message})
      return
    } 
      
  let userFound
  
  if (storage.getItem(user.email) !== undefined){
    userFound = JSON.parse(storage.getItem(user.email))
  }
  else{
    userFound = await scanDB("Movie-Application-users",user.email,"email")
    userFound = userFound.selected_items
   if (userFound.length === 0) {
    res.status(500).json({"message":"User doesnt exist"})
    return
   }
   userFound = userFound[0]
  }
  if (userFound && bcrypt.compareSync(user.password,userFound.password)){
      let loggedIn = {
      first_name: userFound.first_name,
      id: userFound.id,
      email: userFound.email,
      picture: userFound.picture,
      user_name: userFound.user_name,
      last_name:userFound.last_name
     }
     storage.setItem(userFound.email, JSON.stringify(userFound))
          const payload = {userid:loggedIn.id,username:loggedIn.user_name}
          const options = {expiresIn:"1d"}
          loggedIn.token = jwt.sign(payload,"secret",options)
     res.status(201).json(loggedIn)
     return
  }
   else{
    res.status(500).json({message:`Invalid Credentials`})
    return
   }
  }
  catch(err){
    console.log(err)
  }
  });

  module.exports = router;
