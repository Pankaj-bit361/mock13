const express = require("express");
const { BlogModel } = require("../models/blog.model");
const { UserRouter } = require("./user.routes");
const { auth } = require("../middleware/auth.middleware");

const BlogRouter = express.Router();



BlogRouter.get("/", async (req, res) => {
  let { page, title, category, limit, sort, order } = req.query;

  let params = {};

  if (title) {
    params.title = title;
  }
  if (category) {
    params.category = category;
  }
  if (!limit) {
    limit = 5;
  }

  if (page && page <= 1) {
    page = 1;
  }
  let skipval = (page - 1) * limit;
  if (order == "asc") {
    order = 1;
  } else if (order == "desc") {
    order = -1;
  }

  try {
    let find = await BlogModel.find(params)
      .sort({ date: order })
      .skip(skipval)
      .limit(5);
    res.send(find);
  } catch (error) {
    res.send(error);
  }
});
BlogRouter.patch("/like/:id",async(req,res)=>{
    const {id}=req.params
    console.log(id)
    try {
        let user=await BlogModel.findByIdAndUpdate({_id:id},req.body)
        res.send({msg:"like patched successfully",user})
    } catch (error) {
        res.send(error)
    }
})


BlogRouter.patch("/comment/:id",async(req,res)=>{
    const {id}=req.params
    console.log(id)
    console.log(id)
    try {
        let user=await BlogModel.findByIdAndUpdate({_id:id},req.body)
        res.send({msg:"comment patched successfully",user})
    } catch (error) {
        res.send(error)
    }
})


BlogRouter.use(auth);


BlogRouter.post("/", async (req, res) => {
    try {
      let newuser = new BlogModel(req.body);
      await newuser.save();
      res.send({ msg: "blog created successfully" });
    } catch (error) {
      res.send(error);
    }
  });
BlogRouter.patch("/:id",async(req,res)=>{
    const {id}=req.params


    const {UserId}=req.body
    let find=await BlogModel.findOne({_id:id})

if(UserId==find.UserId){
    
    try {
        let user=await BlogModel.findByIdAndUpdate({_id:id},req.body)
        res.send({msg:"user updated successfully",user})
    } catch (error) {
        res.send(error)
    }
}else{
    res.send({"msg":"you are not authorized for this operation"})
}

})

BlogRouter.delete("/:id",async(req,res)=>{
    const {id}=req.params
const {UserId}=req.body
let find=await BlogModel.findOne({_id:id})
  
if(UserId==find.UserId){
    try {
        let user=await BlogModel.findByIdAndDelete({_id:id})
        res.send({msg:"user deleted successfully",user})
    } catch (error) {
        res.send(error)
    }
}else{
res.send({msg:"you are not authorized for this operation"})
}


   
})


module.exports = {
  BlogRouter,
};
