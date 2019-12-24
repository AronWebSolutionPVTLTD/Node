express = require('express')

router = express.Router()

//including controller
UserController=require('../Controllers/UserController')
PostController=require('../Controllers/PostController')





//============Routes startfrom here==========

//==================User=======================
router.post('/register',UserController.register)
router.post('/login',UserController.login)
router.put('/user/:id',UserController.update)
router.get('/user/:id',UserController.get)
router.get('/list',UserController.list)



//================Post=====================
router.post('/post',PostController.insert)
router.put('/post/:id',PostController.update)
router.get('/post/:id',PostController.get)
router.get('/post',PostController.list)
router.post('/upload',PostController.uploadFile)



module.exports = router