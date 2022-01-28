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

export const CREATE_BOOKClUB = gql`
mutation createBookClub($bookClubName : String!,$title: String!,$authors: [String],$description: String!,$speed: String!, 
    $type: String!,$meetingDay : String!, $meetingTime : String!,$imgUrl: String! ){
      createBookClub(bookClubName :$bookClubName, title: $title, authors: $authors, description: $description,speed:$speed, type:$type,meetingDay:$meetingDay,meetingTime: $meetingTime, imgUrl: $imgUrl){
        _id
        bookClubName
        username
        title
        authors
        description
        imgUrl
        speed
        type
        meetingDay
        meetingTime
        discussions {
          _id
          discussionBody
          username
          createdAt
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

