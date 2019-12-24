express = require('express')

app=express()

//Body parser for parsing body
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// parse application/json
app.use(bodyParser.json())
//End of the bodyparser






//For validating the data
var expressValidator = require('express-validator');
app.use(expressValidator())


//Including router file 
route=require('./Routes/route')
app.use(route) 



app.listen(5000, () =>
  console.log(' app listening on port 5000!'),
);
