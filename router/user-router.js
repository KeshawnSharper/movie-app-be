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
= require('./basicConfig.js/basicConfig')

let userRouter = router
router.get('/', async(req, res) =>{
    let items = await scanDB("Movie-Application-users")
    console.log(items)
    res.status(200).json(items.total_items)
  })
router.get('/:id', async (req, res) => {
    if (isNaN(req.params.id)) {
      res.status(500).json({"message":"Invalid User"})
    return
    }
    let user = await scanDB("Movie-Application-users",req.params.id,"id")
    console.log("313",)
   user = user.selected_items[0]
   delete user.password
   delete user.re_password
   console.log("313",user)
  res.status(200).json(user)
  })
 router.put('/:id', async (req, res) => {
   await editDB("Movie-Application-users",req.params.id,req.body)
   let user = await scanDB("Movie-Application-users",req.params.id,"id")
   user  = user[0]
  //  delete user.password
  res.status(201).json({"user":user})
  })

  module.exports = router;
