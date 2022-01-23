const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Auth {
        token: ID!
        user: User
    }

    type User {
        _id: ID!
        username: String!
		email: String!
		password: String!
        bookClubs: [BookClub]
    }

    type Query {
        users: [User]
    }

    type BookClub {
        _id: ID
        bookClubName: String!
        createdAt: String
        username: String
        discussionCount: Int
        discussions : [Discussion]
    }
    type Discussion {
        _id: ID
        discussionBody: String
        createdAt: String
        username: String
      }

    type Query {
        users:[User]
        user(username: String!): User
        bookClubs : [BookClub]
        bookClubs(username: String) : [BookClub]
        bookClub(_id: ID!): BookClub
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        signup(username: String!, email: String!, password: String!): Auth
    }

`

module.exports = typeDefs