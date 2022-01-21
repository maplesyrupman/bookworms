const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Auth {
        token: ID!
        user: User
    }

    type User {
        _id: ID!
    }

    type Query {
        queryTest: String
    }

    type Mutation {
        mutationTest(testVar: String): String
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
          }

`

module.exports = typeDefs
