 let {
    scanDB,
}
= require('./basicConfig.js/basicConfig')

const express = require('express');
const router = express.Router();
router.get('/', async(req, res) =>{
  console.log("users")
    let items = await scanDB("Movie-Application-users")
    res.status(200).json(items.total_items)
  })
router.get('/:id', async (req, res) => {
    if (isNaN(req.params.id)) {
      res.status(500).json({"message":"Invalid User"})
    return
    }
    let user = await scanDB("Movie-Application-users",req.params.id,"id")
   user = user.selected_items[0]
   delete user.password
   delete user.re_password
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
