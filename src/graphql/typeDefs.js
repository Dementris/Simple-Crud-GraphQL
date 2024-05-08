import { gql } from "apollo-server"
export const typeDefs = gql`
    type Exam {
        _id: ID!
        student: String!,
        group: String!,
        discipline: String!,
        ticket: Int!,
        mark: Int!,
        teacher: String!
    }
    
    type Query {
        getAllExams: [Exam]
        getExamByID(id:ID!): Exam
    }

    type Mutation {
        createExam(student: String!, group: String!, discipline: String!, ticket: Int!, mark: Int!, teacher: String!): Exam
        deleteExam(id: ID!): Boolean
        updateExam(id: ID! student: String!, group: String!, discipline: String!, ticket: Int!, mark: Int!, teacher: String!): Exam
    }
`;