var bcrypt = require('bcryptjs');
const sequelizePaginate = require('sequelize-paginate')


module.exports = function(sequelize, DataTypes) {

    var Post = sequelize.define("Post", {
        title: { //TABLE ROW
           type: DataTypes.STRING, //EXPECTING A STRING {COLUMN STRUCTURE}
           AllowNull: false, //THIS COLUMN CANNOT BE EMPTY
           validate: { //VALIDATE INFO GOING INTO THE TABLE
             len: [1, 50] //NEEDS TO BE BETWEEN 1 AND 140 CHARACTERS
           } 
         },
         text: { //TABLE ROW
            type: DataTypes.STRING, //EXPECTING A STRING {COLUMN STRUCTURE}
            AllowNull: false, //THIS COLUMN CANNOT BE EMPTY
            validate: { //VALIDATE INFO GOING INTO THE TABLE
              len: [1, 50] //NEEDS TO BE BETWEEN 1 AND 140 CHARACTERS
            } 
          },
         image: { //TABLE ROW
           type: DataTypes.BOOLEAN, //EXPECTING A BOOLEAN {COLUMN STRUCTURE}
           defaultValue: false, //THIS COLUMN WILL HAVE A DEFAULT VALUE OF FALSE,
           validate: { //VALIDATE INFO GOING INTO THE TABLE
            len: [1, 600] //NEEDS TO BE BETWEEN 1 AND 140 CHARACTERS
          } 
         },
         user_id: { //TABLE ROW
            type: DataTypes.BOOLEAN, //EXPECTING A BOOLEAN {COLUMN STRUCTURE}
            defaultValue: false ,//THIS COLUMN WILL HAVE A DEFAULT VALUE OF FALSE
           
          },
          created_at: { //TABLE ROW
            type: DataTypes.DATE
          },
          updated_at: { //TABLE ROW
            type: DataTypes.DATE
         
          },
         
        
       }
       , {

      
        timestamps: false
    });
    

    //here we are aplying the pagination
    sequelizePaginate.paginate(Post)
    return Post; //RETURN THE TABLE
};
 