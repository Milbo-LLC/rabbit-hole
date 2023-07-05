import { gql } from "@apollo/client";

export const updateCompletedLessonsDocument = gql`
  mutation UpdateCompletedLessons($input: UpdateCompletedLessonsInput) {
    updateCompletedLessons(input: $input) {
      id
      lessonsCompleted
    }
  }
`;

export default updateCompletedLessonsDocument;
