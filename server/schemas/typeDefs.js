const { gql } = require('apollo-server-express')

const typeDefs = gql`


type User {
    _id: ID
    username: String
    email: String
    bookClubs: [BookClub]
    
}

type Discussion {
    _id: ID
    discussionBody: String
    createdAt: String
    username : String  
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
    bookClubName: String
    createdAt: String
    title: String
    username: String
    authors: [String]
    description: String
    imgUrl : String
    speed : String
    type : String
    meetingDay : String
    meetingTime: String
    members: [User]
    discussions: [Discussion]
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
    user(username: String!): User
    books:[Book]
    book(title: String!): Book
    bookClubs: [BookClub]
    bookClub(bookClubName: String!): BookClub
    events:[Event]
}

type Mutation {
    login(email: String!, password: String!): Auth
    signup(username: String!, email: String!, password: String!): Auth
    addBook(title: String!, description: String, authors: [String], imgUrl: String): Book
    createBookClub(bookClubName: String!,title: String!, authors: [String],description: String!, imgUrl: String!,type: String!, speed:String!, meetingDay: String!, meetingTime: String!): BookClub
    joinBookClub(bookClubId: String!, username: String): BookClub
    addDiscussion(bookClubId:String!, discussionBody: String!): BookClub
    addEvent(eventName: String!, eventDate: String, location: String, link: String): Event
}

type Auth {
    token: ID!
    user: User
  }
`

module.exports = typeDefs