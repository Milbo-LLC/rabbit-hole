import { gql } from "@apollo/client";

export const updateUserDetailsDocument = gql`
  mutation UpdateUserDetails($userId: String!, $input: UpdateUserDetailsInput) {
    updateUserDetails(userId: $userId, input: $input) {
      id
      firstName
      lastName
      nightMode
    }
  }
`;

export default updateUserDetailsDocument;
