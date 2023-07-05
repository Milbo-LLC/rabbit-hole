import { gql } from "@apollo/client";

export const createPrereqsJobDocument = gql`
  mutation CreatePrereqsJob($id: String!) {
    createPrereqsJob(id: $id) {
      id
    }
  }
`;

export default createPrereqsJobDocument;
