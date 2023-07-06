import { gql } from "@apollo/client";

const courseDocument = gql`
  query Course($courseId: String!) {
    course(id: $courseId) {
      id
      createdAt
      updatedAt
      authorId
      title
      description
      prereqs {
        id
        title
        description
        topics {
          id
          title
          description
        }
      }
      units {
        id
        title
        description
        lessons {
          id
          unitId
          title
          topics
          content
          order
        }
        exercises {
          id
          task
        }
        quizzes {
          id
          questions {
            id
            question
            choices
            answer
          }
        }
        order
      }
      public
    }
  }
`;

export default courseDocument;
