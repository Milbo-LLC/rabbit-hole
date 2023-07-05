import { gql } from "@apollo/client";

const userDetailsDocument = gql`
  query UserDetails($userId: String!) {
    userDetails(userId: $userId) {
      id
      userId
      firstName
      lastName
      nickname
      dob
      educationLevel
      interests
      nightMode
    }
  }
`;

export default userDetailsDocument;
