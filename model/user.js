import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
   username: { type: 'string', required: true,unique: true },
   email: { type: 'string', required: true,unique: true},
   password: { type: 'string', required: true }
});

const model = mongoose.model('UserSchema', UserSchema);

export default model;