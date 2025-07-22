import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
   username: { type: String, required: true, unique: [true, 'Username already in use!'] },
   email: { type: String, required: true},
   password: { type: String, required: true, minLength: [4, 'Short password!'] },
   problemSolved: {type:Number, default: 0 }
});

const model = mongoose.model('UserSchema', UserSchema);

export default model;