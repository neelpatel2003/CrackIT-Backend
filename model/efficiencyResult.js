import mongoose from "mongoose";

const EfficiencyResultSchema = new mongoose.Schema({
    email: { type: String, required: true },
    efficiency: { type: mongoose.Schema.Types.Mixed, required: true },
    createdAt: { type: Date, default: Date.now }
});

const model = mongoose.model('EfficiencyResult', EfficiencyResultSchema);
export default model;