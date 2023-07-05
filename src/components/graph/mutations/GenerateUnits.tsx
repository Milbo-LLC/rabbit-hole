import { gql } from "@apollo/client";

export const generateUnitsDocument = gql`
  mutation GenerateUnits($id: String!) {
    generateUnits(id: $id) {
      id
      title
      description
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
        quizzes {
          id
          questions {
            id
            question
            choices
            answer
          }
        }
      }
    }
  }
`;

export default generateUnitsDocument;
