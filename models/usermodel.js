const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type : String, 
        required : [true , " please add the user name "],
    },
    email:{
        type: String,
        required: [true ,"please add the user email address"],
        unique: [true, "email address is already tKEN"],
    },
    password:{
        type: String,
        required: [true, "please add the user password"],
    },
},
{
    timestamps: true ,
}
);

module.exports= mongoose.model("User" , userSchema);