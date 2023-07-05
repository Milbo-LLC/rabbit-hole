import { gql } from "@apollo/client";

const allCoursesDocument = gql`
  query AllCourses {
    allCourses {
      id
      createdAt
      updatedAt
      authorId
      title
      description
      public
    }
  }
`;

export default allCoursesDocument;
