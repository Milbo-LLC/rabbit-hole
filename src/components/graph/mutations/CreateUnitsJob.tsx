import { gql } from "@apollo/client";

export const createUnitsJobDocument = gql`
  mutation CreatePrereqsJob($id: String!) {
    createUnitsJob(id: $id) {
      id
    }
  }
`;

export default createUnitsJobDocument;
