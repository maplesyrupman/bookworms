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
    maxMembers
    
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

discussion {
      _id
      body
      createdAt
      user {
        username
      }
    }
  }
}
`;

export const QUERY_USER = gql`
query user($userId: ID!) {
  user(userId: $userId) {
    username
    bio
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
  }
}
`;

export const FAV_BOOK = gql`
  query favBook($bookId: String!) {
    favBook(bookId: $bookId) {
      title
      authors
      imgUrl
      description
    }
  }
`