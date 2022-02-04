import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
        mutation login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
                token
                user {
                    _id
                    username
                }
            }
        }
    `

export const SIGNUP_USER = gql`
        mutation signup($email: String!, $username: String!, $password: String!) {
            signup(email: $email, password: $password, username: $username) {
                token 
                user {
                    _id
                    username
                }
            }
        }
    `;

export const CREATE_ClUB = gql`
mutation createClub($clubName: String!, $speed: String!, $type: String!, $meetingDay: String!, $meetingTime: String!, $maxMembers: Int!, $bookId: String!, $title: String!, $description: String!, $authors: [String]!, $imgUrl: String!) {
  createClub(clubName: $clubName, speed: $speed, type: $type, meetingDay: $meetingDay, meetingTime: $meetingTime, maxMembers: $maxMembers, bookId: $bookId, title: $title, description: $description, authors: $authors, imgUrl: $imgUrl) {
    clubName
    _id
    creator
    bookId
    title
    description
    authors
    imgUrl
    speed
    maxMembers
    type
    meetingDay
    meetingTime
    members{
      username
    }
  }
}
`;

export const ADD_MESSAGE = gql`
mutation AddMessage($clubId: ID!, $body: String!) {
  addMessage(clubId: $clubId, body: $body) {
    _id
    clubName
    discussion {
      _id
      body
    }
    createdAt
  }
}
`

export const JOIN_CLUB = gql`
  mutation joinClub ($clubId: ID!) {
    joinClub(clubId: $clubId) {
      clubName
    }
  }
`
export const ADD_EVENT = gql`
mutation AddEvent($eventName: String!, $clubId: ID!, $eventDate: String, $location: String, $link: String) {
  addEvent(eventName: $eventName, clubId: $clubId, eventDate: $eventDate, location: $location, link: $link) {
    eventName
    createdAt
    eventDate
    link
    location
    _id
  }
}
`
