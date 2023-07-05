import { gql } from "@apollo/client";

export const generateExercisesDocument = gql`
  mutation GenerateExercises($id: String!) {
    generateExercises(id: $id) {
      id
      task
    }
  }
`;

export default generateExercisesDocument;
