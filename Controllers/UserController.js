models=require('../models')
ImportantFunction = require('../Functions/ImportantFunction')
var bcrypt = require('bcryptjs');


//This function is used to  register new user
exports.register =async function(req,res)
{

 //Validating the result
    req.checkBody('first_name','length should be between 2 to 50').isLength({ min: 3,max:51 })
    req.checkBody('first_name','Should be Alphabetic').isAlpha()
    req.checkBody('last_name','length should be between 2 to 50').isLength({ min: 3,max:51 })
    req.checkBody('last_name','Should be Alphabetic').isAlpha()
    req.checkBody('email','Should be valid').isEmail()
    req.checkBody('password','length should be between 5 to 41').isLength({ min: 6,max:40 })
//Checking weather there is an error
    var errors = req.validationErrors()
    if (errors) {
        send_response=ImportantFunction.fKey(errors[0]['param'] + ' '+errors[0]['msg']  ,[])//first arg is message and second one is data
        return res.json(send_response);
    }


    let promise = new Promise((resolve, reject) => {
        models.User.findOne({ where: { email: req.body.email } }).then(function (user_exist) {
            if(user_exist) return resolve(1)
            return resolve(0)
         })
    });

    let exist = await promise; // wait until the promise resolves (*)

    if(exist)
    {
        send_response=ImportantFunction.fKey('Email Already taken',[])//first arg is message and second one is data
        return res.json(send_response);//sending response
    }



//If there is no error than the following code will execute
 
  //Hashing the password for safety
    const salt = bcrypt.genSaltSync();
    req.body.password = bcrypt.hashSync(req.body.password, salt);

  //Inserting data in users table using orm sequelize
     models.User.create(req.body).then(result => {
      //If data inserted successfully
         if(result)
         {
            send_response=ImportantFunction.sKey('User register successfully',[])//first arg is message and second one is data
            return res.json(send_response);//sending response
         }
         send_response=ImportantFunction.fKey('User register failed',[])//first arg is message and second one is data
         return res.json(send_response);//sending response

      });

      
}


//This function is used to login user via email and password 
exports.login = function(req,res)
{

    //Validating the result
    req.checkBody('email','should be present').notEmpty()
    req.checkBody('password','should be present').notEmpty()

//Checking weather there is an error
    var errors = req.validationErrors()
    if (errors) {
        send_response=ImportantFunction.fKey(errors[0]['param'] + ' '+errors[0]['msg']  ,[])//first arg is message and second one is data
        return res.json(send_response);
    }

    email=req.body.email
    password=req.body.password

    //Checking weather user have valid email and passwords
    models.User.findOne({ where: { email: email } }).then(function (user) {
    
    if(user.validPassword(password))//There is an instance method in model
    {
        send_response=ImportantFunction.sKey('Login successfully',user)//first arg is message and second one is data
        return res.json(send_response);
    }
   
    send_response=ImportantFunction.fKey('Please enter correct email and password',[])//first arg is message and second one is data
    return res.json(send_response);
    
   })

}




//This function is used to update user data
exports.update = function(req,res)
{

    //Validating the result
    
    req.checkBody('first_name','Should be Alphabetic').isAlpha()
    req.checkBody('last_name','Should be Alphabetic').isAlpha()

    //Checking weather there is an error
    var errors = req.validationErrors()
    if (errors) {
        send_response=ImportantFunction.fKey(errors[0]['param'] + ' '+errors[0]['msg']  ,[])//first arg is message and second one is data
        return res.json(send_response);
    }


    //Fetching id of the user from the url
    id=req.params.id;

 //Checking weather user exist or not
   models.User.findOne({ where: { id: id } }).then(function (user) {

   //User not found in db
    if(!user)
    {
        send_response=ImportantFunction.fKey('User not found',[])//first arg is message and second one is data
        return res.json(send_response);  
    }

    //checking the data coming from body
    var body_data=req.body
    //data not to be updated
    delete body_data.email
    delete body_data.password
    delete body_data.id
   
   
  //Updating user by its instance
    user.update(body_data)
    .then(function (updateuser) {})

   //After updating sending response
    send_response=ImportantFunction.sKey('User updated',user)//first arg is message and second one is data
    return res.json(send_response);

    
   })

}



//This Function is used to get user details
exports.get = function(req,res)
{
    id=req.params.id;
   //   Fetching deatil from user table
    models.User.findOne({ where: { id: id } }).then(function (user) {
  //If no result found
    if(!user)
    {
        send_response=ImportantFunction.fKey('User not found',[])//first arg is message and second one is data
        return res.json(send_response);  
    }

    send_response=ImportantFunction.sKey('User data fetched',user)//first arg is message and second one is data
    return res.json(send_response);

   })

}



//This function is used to fetch the list of the user
exports.list = function(req,res)
{
//Ordering and paginating data acc to the need
    var page =ImportantFunction.page(req.query.page)
    var per_page =ImportantFunction.per_page(req.query.per_page)
    var order =ImportantFunction.order(req.query.order)
    var order_by =ImportantFunction.order_by(req.query.order_by)

 //declaring const to rub query in user model
    const options = {
        "attributes": ['id', 'first_name','last_name','email','created_at','updated_at'],
        "page": page, // Default 1
        "paginate":per_page, // Default 25
        "order": [[order_by, order]]
      
      }

   //Paginating the data acc to the requirement
    models.User.paginate(options).then(function(data)
      {
        if(!data)
        {
            send_response=ImportantFunction.fKey('User not found',[])//first arg is message and second one is data
            return res.json(send_response);  
        }
       
            send_response=ImportantFunction.sKey('Users list fetched',data)//first arg is message and second one is data
            return res.json(send_response);
      })
      

}






