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
mutation createBookClub($bookClubName : String!, $username:String!){
    createBookClub(bookClubName :$bookClubName, username :$username){
      _id
      bookClubName
      createdBy {
        _id
        username
      }    
            
    }
  }

 `;

export const ADD_DISCUSSION = gql`
mutation addDiscussion ($bookClubId : String!, $discussionBody:String, $username : String!){
    addDiscussion (bookClubId: $bookClubId, discussionBody : $discussionBody,username :$username) {
      _id
      createdAt
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

