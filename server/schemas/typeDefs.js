const { gql } = require('apollo-server-express')

const typeDefs = gql`

type Auth {
    token: ID!
    user: User
  }

type User {
        _id: ID!
        username: String
		email: String
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

        clubName: String
        speed: String
        type: String
        meetingDay: String
        meetingTime: String

        bookId: String!
        title: String
        description: String
        imgUrl: String
        authors: [String]
        bookId: String

        createdAt: String
        creator: String
        members: [User]
        membersCount: Int
        discussion: [Discussion]
    }

    type Event {
        _id: ID
        eventName: String!
        createdAt: String
        eventDate: String
        location: String
        link: String
    }

    type Query {
        users:[User]
        user(userId: ID!): User
        bookClubs(bookId: String!): [BookClub]
        bookClub(clubId: ID!): BookClub
        popularClubs: [BookClub]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        signup(username: String!, email: String!, password: String!): Auth
        createClub(clubName: String!, speed: String!, type: String!, meetingDay: String!, meetingTime: String!, bookId: String!, title: String!, description: String!, authors: [String]!, imgUrl: String!): BookClub
        joinClub(clubId: ID!): BookClub
        addDiscussion(bookClubId:String, discussionBody: String, username: String): BookClub
        addEvent(eventName: String!, eventDate: String, location: String, link: String): Event
    }

`

module.exports = typeDefs