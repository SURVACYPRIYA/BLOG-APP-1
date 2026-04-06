import exp from "express";
import { authenticate, register } from "../Services/authService.js";
import { ArticleModel } from "../models/ArticleModel.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import {upload} from "../config/multer.js"
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";
import cloudinary from "../config/cloudinary.js"

export const userRoute=exp.Router()

//Register user
userRoute.post("/users",upload.single("profileImageUrl"),async (req, res, next) => {
        let cloudinaryResult;

            try {
                //get user obj
                let userObj = req.body;

                //  Step 1: upload image to cloudinary from memoryStorage (if exists)
                if (req.file) {
                cloudinaryResult = await uploadToCloudinary(req.file.buffer);
                }

                // Step 2: call existing register()
                const newUserObj = await register({
                ...userObj,
                role: "USER",
                profileImageUrl: cloudinaryResult?.secure_url,
                });

                res.status(201).json({
                message: "user created",
                payload: newUserObj,
                });

            } catch (err) {

                // Step 3: rollback 
                if (cloudinaryResult?.public_id) {
                await cloudinary.uploader.destroy(cloudinaryResult.public_id);
                }

                next(err); // send to your error middleware
            }

        }
        );



//Read all articles(protected route)

userRoute.get('/articles',verifyToken("USER"),async(req,res)=>{
    let articles=await ArticleModel.find({isArticleActive:true}).populate("comment.user")
    res.status(200).json({message:"Articles",payload:articles})
})

//Add comment to an article

userRoute.post('/articles/:articleId',verifyToken("USER"),async(req,res)=>{
    const {user, articleId,comment}=req.body
    console.log(req.user)
    if (user != req.user.userId){
        return res.status(403).json({messsage: "Forbidden"})
    }
    let articleOfDB=await ArticleModel.findOne({_id:articleId})
    if(!articleOfDB){
        return res.status(404).json({message:"Article not found"})
    }
    //update the article
    let updatedArticle=await ArticleModel.findByIdAndUpdate(articleId,
        {$push:{ comments:{user, comment }}},
        { new:true, runValidators: true});
        //send res(updated article)
     res.status(200).json({message:"Article updated",payload:updatedArticle})
})