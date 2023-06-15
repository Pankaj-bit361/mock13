




const mongoose=require('mongoose')

const BlogScehma=mongoose.Schema({
    "username":{type:String,required:true},
    "avatar":{type:String,required:true},
    "UserId":{type:String,required:true},
    "title":{type:String,required:true},
    "content":{type:String,required:true},
    "category":{type:String,required:true},
    "date":{type:String,required:true},
    "comment":{type:String},
    "like":{type:Number}
},{
    versionKey:false
})

const BlogModel=mongoose.model("Blog",BlogScehma)

module.exports={
    BlogModel
}











// - Username (should be automatically fetched from the signed in user data, should not be able to modify this field)
// - Title
// - Content (Should be a **textarea** input field)
// - Category (Should be a **select tag** with “Business”, “Tech”, “Lifestyle”, and “Entertainment” as options).
// - Date (Can be implemented from backend)