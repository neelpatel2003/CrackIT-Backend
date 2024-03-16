import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
   title: { type: String, required: true , unique: true },
   description: { type: String, required: true },
   level: {type:Number ,minLength:1 , maxLength:5, defaultValue:3}
});

const model  = mongoose.model("QuestionSchema",QuestionSchema);

export default model;