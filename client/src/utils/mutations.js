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
mutation createClub($clubName: String!, $speed: String!, $type: String!, $meetingDay: String!, $meetingTime: String!, $bookId: String!, $title: String!, $description: String!, $authors: [String]!, $imgUrl: String!) {
  createClub(clubName: $clubName, speed: $speed, type: $type, meetingDay: $meetingDay, meetingTime: $meetingTime, bookId: $bookId, title: $title, description: $description, authors: $authors, imgUrl: $imgUrl) {
    clubName
    _id
    creator
    bookId
    title
    description
    authors
    imgUrl
    speed
    type
    meetingDay
    meetingTime
    members{
      username
    }
  }
}
`;

export const ADD_DISCUSSION = gql`
mutation addDiscussion ($bookClubId : String!, $discussionBody:String!){
    addDiscussion (bookClubId: $bookClubId, discussionBody : $discussionBody) {
      _id
      createdAt
      bookClubName
      discussions {
        _id
        createdAt
        username
        discussionBody
      } 
          
    }
  } 
`
export const ADD_BOOK = gql`
mutation addBook($title : String!, $description: String!, $authors :[String!], $imgUrl : String!){
    addBook(title: $title, description :$description, imgUrl: $imgUrl, authors:$authors){ 
      _id
      title
      description
      imgUrl
      authors
    }
}
`

