import { gql } from '@apollo/client';

export const QUERY_BOOKCLUBS = gql`
query bookClubs($bookId: String!){
  bookClubs(bookId: $bookId) {
    clubName
    _id
    meetingDay
    meetingTime
    speed
    members {
      username
    }
    creator
   }
}
`;

export const QUERY_BOOKCLUB = gql`
query bookClub($clubId: ID!) {
  bookClub(clubId: $clubId) {
    clubName
    _id
    meetingDay
    meetingTime
    speed

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

export const QUERY_USER = gql`
query user($userId: ID!) {
  user(userId: $userId) {
    username
    bookClubs {
      clubName
      _id
      authors
      title
    }
  }
}
`