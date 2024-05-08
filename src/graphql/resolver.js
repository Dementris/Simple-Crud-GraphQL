import {Exam} from "../models/exams.js";

export const resolvers = {
    Query: {
        async getAllExams(_, __, context) {
            return Exam.find({});
        },
        async getExamByID(_, { id }, context) {
            return Exam.findById(id);
        }
    },
    Mutation: {
        async createExam(_, {student, group, discipline, ticket, mark, teacher}, context){
            const newExam = new Exam({student, group, discipline, ticket, mark, teacher});
            await newExam.save();
            return newExam;
        },
        async deleteExam(_, {id}, context){
            const del = await Exam.findByIdAndDelete(id);
            return await Exam.findById(id) === null && del !== null
        },
        async updateExam(_, {id, student, group, discipline, ticket, mark, teacher}, context){
            return Exam.findByIdAndUpdate(id, {student, group, discipline, ticket, mark, teacher}, {
                new: true, // Return the updated document
                runValidators: true // Run validators on the update
            });
        }
    }

}