models=require('../models')
ImportantFunction = require('../Functions/ImportantFunction')
var Busboy = require('busboy');
var fs = require('fs');

exports.insert =  function(req,res)
{

    //Validating the result
    req.checkBody('text','length should be between 1 to 3000').isLength({ min: 1,max:3001 })
    req.checkBody('title','length should be between 1 to 300').isLength({ min: 1,max:301 })
    req.checkBody('image','url length should be between 1 to 999').isLength({ min: 1,max:1000 })
    req.checkBody('user_id','Should be numeric').isDecimal()

    //Checking weather there is an error
    var errors = req.validationErrors()
    if (errors) {
        send_response=ImportantFunction.fKey(errors[0]['param'] + ' '+errors[0]['msg']  ,[])//first arg is message and second one is data
        return res.json(send_response);
    }

    //Creating post
    models.Post.create(req.body).then(result => {
    
  //Post Created
    if(result)
    {
      console.log('in result')
      send_response=ImportantFunction.sKey('Post created successfully',[])//first arg is message and second one is data
      return res.json(send_response);
     
      }

      send_response=ImportantFunction.fKey('Unable to create post',[])//first arg is message and second one is data
      return res.json(send_response);

    });



}



//This Function is used to upload photo and it will return uploaded url
exports.uploadFile = function(req,res)
{
   //here we will upload file
   image_name=''
   var busboy = new Busboy({ headers: req.headers });
   busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
     //Chaning filename acc to our need
    image_name= Date.now()+filename
     if(fieldname == 'photo')//checking weather photo key is present
     {
         var saveTo = ('./public/images/'+image_name)
         file.pipe(fs.createWriteStream(saveTo));
     }
   
     });
     //When photo will uploaded
     busboy.on('finish', function() {
      send_response=ImportantFunction.sKey('photo uploaded',{'image':'public/images/'+image_name})//first arg is message and second one is data
      return res.json(send_response);

      
     });
     //calling busboy lib to upload photo
    return req.pipe(busboy);
   
}





//This Function is used to update post
exports.update = function(req,res)
{
    id=req.params.id;
//Checking weather the post exist
   models.Post.findOne({ where: { id: id } }).then(function (post) {
  //If post not existed
    if(!post)
    {
        send_response=ImportantFunction.fKey('post not found',[])//first arg is message and second one is data
        return res.json(send_response);  
    }

    //checking the data coming from body
    var body_data=req.body
    //data not to be updated
    delete body_data.id
   //updating post by its instance
    post.update(body_data)
    .then(function (updateuser) {})

   //sending response
    send_response=ImportantFunction.sKey('Post updated',post)//first arg is message and second one is data
    return res.json(send_response);

   })

}



//This function is used to fetch photo
exports.get = function(req,res)
{
    id=req.params.id;
  //Fetching post acc to id
    models.Post.findOne({ where: { id: id } }).then(function (post) {
  //If post not found
    if(!post)
    {
        send_response=ImportantFunction.fKey('Post not found',[])//first arg is message and second one is data
        return res.json(send_response);  
    }

    send_response=ImportantFunction.sKey('Post data fetched',post)//first arg is message and second one is data
    return res.json(send_response);

   })

}



//This function is used to get list of the post
exports.list = function(req,res)
{
  //varible for pagination and ordering
    var page =ImportantFunction.page(req.query.page)
    var per_page =ImportantFunction.per_page(req.query.per_page)
    var order =ImportantFunction.order(req.query.order)
    var order_by =ImportantFunction.order_by(req.query.order_by)

    //Creating const contain query to be run
    const options = {
        "page": page, // Default 1
        "paginate":per_page, // Default 25
        "order": [[order_by, order]]
      
      }

    //Runing query by applying pagination
      models.Post.paginate(options).then(function(data)
      {
       //If no result found
      if(!data)
      {
          send_response=ImportantFunction.fKey('Post not found',[])//first arg is message and second one is data
          return res.json(send_response);  
      }
      
          send_response=ImportantFunction.sKey('Post list fetched',data)//first arg is message and second one is data
          return res.json(send_response);
      })
      

}






