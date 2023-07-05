import { gql } from "@apollo/client";

export const updateQuizAttemptDocument = gql`
  mutation UpdateQuizAttempt($id: String!, $input: UpdateQuizAttemptInput) {
    updateQuizAttempt(id: $id, input: $input) {
      id
      status
      attempt
      responses {
        id
        response
      }
    }
  }
`;

export default updateQuizAttemptDocument;
