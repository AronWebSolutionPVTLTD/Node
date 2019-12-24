var bcrypt = require('bcryptjs');
const sequelizePaginate = require('sequelize-paginate')


module.exports = function(sequelize, DataTypes) {

    var User = sequelize.define("User", {
        first_name: { //TABLE ROW
           type: DataTypes.STRING, //EXPECTING A STRING {COLUMN STRUCTURE}
           AllowNull: false, //THIS COLUMN CANNOT BE EMPTY
           validate: { //VALIDATE INFO GOING INTO THE TABLE
             len: [1, 50] //NEEDS TO BE BETWEEN 1 AND 140 CHARACTERS
           } 
         },
         last_name: { //TABLE ROW
            type: DataTypes.STRING, //EXPECTING A STRING {COLUMN STRUCTURE}
            AllowNull: false, //THIS COLUMN CANNOT BE EMPTY
            validate: { //VALIDATE INFO GOING INTO THE TABLE
              len: [1, 50] //NEEDS TO BE BETWEEN 1 AND 140 CHARACTERS
            } 
          },
         email: { //TABLE ROW
           type: DataTypes.BOOLEAN, //EXPECTING A BOOLEAN {COLUMN STRUCTURE}
           defaultValue: false, //THIS COLUMN WILL HAVE A DEFAULT VALUE OF FALSE,
           validate: { //VALIDATE INFO GOING INTO THE TABLE
            len: [1, 100] //NEEDS TO BE BETWEEN 1 AND 140 CHARACTERS
          } 
         },
         password: { //TABLE ROW
            type: DataTypes.BOOLEAN, //EXPECTING A BOOLEAN {COLUMN STRUCTURE}
            defaultValue: false ,//THIS COLUMN WILL HAVE A DEFAULT VALUE OF FALSE
            validate: { //VALIDATE INFO GOING INTO THE TABLE
                len: [1, 900] //NEEDS TO BE BETWEEN 1 AND 140 CHARACTERS
              } 
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
    
       // Instance methods
    User.prototype.validPassword = function validPassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
        
    //here we are aplying the pagination
    sequelizePaginate.paginate(User)
    return User; //RETURN THE TABLE
};
 