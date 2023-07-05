import { gql } from "@apollo/client";

export const createQuizAttemptDocument = gql`
  mutation CreateQuizAttempt($input: CreateQuizAttemptInput) {
    createQuizAttempt(input: $input) {
      id
      status
      attempt
    }
  }
`;

export default createQuizAttemptDocument;
