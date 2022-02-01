import { gql } from '@apollo/client';

export const QUERY_BOOKCLUBS = gql`
query{
  bookClubs {
    _id
    username
    bookClubName
    createdAt
    bookId,
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
    meetingDay
    meetingTime
    speed
  
    bookId
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
    events {
      _id
      eventName
      eventDate
      location
      link
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
`;

export const QUERY_POPULAR_CLUBS = gql`
query popularClubs {
  popularClubs {
    clubName
    _id
    meetingDay
    meetingTime
    speed
  
    bookId,
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