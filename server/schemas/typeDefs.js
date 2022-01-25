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

    type Discussion {
        _id: ID
        discussionBody: String
        createdAt: String
        user: User
    }

    type Book {
        _id: ID!
        title: String!
        authors: [String]
        description: String
        imgUrl: String
        createdAt: String
    }

    type BookClub {
        _id: ID
        bookClubName: String!
        createdAt: String
        createdBy: User
        members: [User]
        readBooks: [Book]
        discussion: [Discussion]
    }

    type Query {
        users:[User]
        user(username: String!): User
        books:[Book]
        book(title: String!): [Book]
        bookClubs: [BookClub]
        bookClub(name: String!): [BookClub]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        signup(username: String!, email: String!, password: String!): Auth
        addBook(title: String!, description: String, authors: [String], imgUrl: String): Book
        createBookClub(bookClubName: String!, username:String): BookClub
        joinBookClub(bookClubId: String!, username: String): BookClub
        addDiscussion(bookClubId:String, discussionBody: String, username: String): BookClub
    }

`

module.exports = typeDefs