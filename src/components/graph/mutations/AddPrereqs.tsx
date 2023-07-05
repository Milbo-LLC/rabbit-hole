import { gql } from "@apollo/client";

export const addPrereqsDocument = gql`
  mutation AddPrereqs($id: String!, $prereqs: [PrereqInput]) {
    addPrereqs(id: $id, prereqs: $prereqs) {
      id
    }
  }
`;

export default addPrereqsDocument;
