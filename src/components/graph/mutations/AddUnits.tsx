import { gql } from "@apollo/client";

export const addUnitsDocument = gql`
  mutation AddUnits($id: String!, $units: [UnitInput]) {
    addUnits(id: $id, units: $units) {
      id
    }
  }
`;

export default addUnitsDocument;
