import { gql } from "@apollo/client";

export const updateQuizAttemptStatusDocument = gql`
  mutation UpdateQuizAttemptStatus($id: String!, $status: Status) {
    updateQuizAttemptStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;

export default updateQuizAttemptStatusDocument;
