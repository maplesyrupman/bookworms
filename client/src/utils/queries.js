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
query bookClub($clubId: ID!) {
  bookClub(clubId: $clubId) {
    clubName
    _id
    title
    description
    imgUrl
    authors
    createdAt
    creator
    members {
      username
      _id
    }
  }
}
`;
