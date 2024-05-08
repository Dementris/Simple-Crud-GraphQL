import mongoose from "mongoose";

const ExamsSchema = new mongoose.Schema({
    student: {
        type: String,
        required: true
    },
    group:{
        type: String,
        required: true
    },
    discipline:{
        type: String,
        required: true
    },
    ticket:{
        type: Number,
        required: true
    },
    mark:{
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    teacher:{
        type: String,
        required: true
    },

})
export const Exam = mongoose.model("Exam", ExamsSchema)