import { gql } from "@apollo/client";

export const createUserDetailsDocument = gql`
  mutation CreateUserDetails($userId: String!) {
    createUserDetails(userId: $userId) {
      id
      userId
    }
  }
`;

export default createUserDetailsDocument;
