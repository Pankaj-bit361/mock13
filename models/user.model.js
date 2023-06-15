
const mongoose=require('mongoose')

const UserScehma=mongoose.Schema({
    "username":{type:String,required:true},
    "email":{type:String,required:true},
    "avatar":{type:String,required:true},
    "password":{type:String,required:true}
},{
    versionKey:false
})

const UserModel=mongoose.model("users",UserScehma)

module.exports={
    UserModel
}