import { gql } from '@apollo/client';

export const QUERY_BOOKCLUBS = gql`
query{
  bookClubs {
    _id
    bookClubName
      members{
      _id
      username
    }
    discussion {
      _id
      discussionBody
      createdAt
      user {
        _id
      }   
    }  
  createdBy{
    _id
   }        
  }
}
`;

export const QUERY_BOOKCLUB = gql`
  query bookClub($id: ID!) {
    bookClub(_id: $id) {
      _id
      bookClubName
      createdAt
      username
      members {
        _id
        username
      }
      discussionCount
      discussions{
          _id
          discussionBody
          username
          createdAt
      }
    }
  }
`;

export const QUERY_USERS = gql`
query {
  users {
  _id
  username
  email
 bookClubs {
    _id
    bookClubName
     }
  }
}
`

export const QUERY_BOOKS = gql`
query{
  books{
    _id
    title
    description
    imgUrl
    authors
  }
}
`

export const QUERY_BOOK = gql`
query ($title: String!){
  book(title: $title){
    _id
    title
    description
    authors
    imgUrl
  }
}
`



