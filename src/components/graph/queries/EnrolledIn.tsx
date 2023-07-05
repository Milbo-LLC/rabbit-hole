import { gql } from "@apollo/client";

const enrolledInDocument = gql`
  query EnrolledIn($userId: String!) {
    enrolledIn(userId: $userId) {
      id
      createdAt
      updatedAt
      userId
      courseId
      course {
        id
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
            title
            topics
            content
          }
          quizzes {
            id
            questions {
              id
            }
          }
        }
        public
      }
    }
  }
`;

export default enrolledInDocument;
