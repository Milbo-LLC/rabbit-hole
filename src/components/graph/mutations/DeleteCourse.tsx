import { gql } from "@apollo/client";

export const deleteCourseDocument = gql`
  mutation DeleteCourse($id: String!) {
    deleteCourse(id: $id) {
      id
    }
  }
`;

export default deleteCourseDocument;
