import { gql } from "@apollo/client";

const coursesDocument = gql`
  query Courses($authorId: String!) {
    courses(authorId: $authorId) {
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

export default coursesDocument;
