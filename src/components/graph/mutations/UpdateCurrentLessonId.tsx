import { gql } from "@apollo/client";

export const updateCurrentLessonIdDocument = gql`
  mutation UpdateCurrentLessonId($input: UpdateCurrentLessonIdInput) {
    updateCurrentLessonId(input: $input) {
      id
    }
  }
`;

export default updateCurrentLessonIdDocument;
