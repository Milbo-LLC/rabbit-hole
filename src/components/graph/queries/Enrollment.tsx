import { gql } from "@apollo/client";

const enrollmentDocument = gql`
  query Enrollment($userId: String!, $courseId: String!) {
    enrollment(userId: $userId, courseId: $courseId) {
      id
      createdAt
      updatedAt
      userId
      courseId
      course {
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
      progress {
        id
        lessonsCompleted
        exercisesCompleted
        quizAttempts {
          id
          status
          attempt
          responses {
            id
            response
            questionId
            question {
              id
              question
              choices
              answer
            }
            quizAttemptId
          }
          quizId
          courseProgressId
        }
        status
        currentLessonId
      }
    }
  }
`;

export default enrollmentDocument;
