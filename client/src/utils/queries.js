import { gql } from '@apollo/client';

export const QUERY_BOOKCLUBS = gql`
query{
  bookClubs {
    _id
    username
    bookClubName
    createdAt
    title
    description
    authors
    imgUrl
    discussions{
      _id
       discussionBody
       createdAt
       username
                   
     }
   }
}
`;

export const QUERY_BOOKCLUB = gql`
query($bookClubName: String!) {
  bookClub(bookClubName: $bookClubName) {
    _id
    username
    createdAt
    bookClubName
    title
    authors
    description
    imgUrl
    discussions {
      discussionBody
      createdAt
      username
    }
     
  }
}
`;

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
`;

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

`;



