import { gql } from "apollo-boost";

// See more example queries on https://thegraph.com/explorer/subgraph/paulrberg/create-eth-app

export const GET_INDEX_HISTORIES = gql`
  query IndexHistories($pctDiff: String!){
    indexHistories(
      first: 1000,
      orderBy:timestamp,
      orderDirection:desc,
      where:{ 
        pctDiff_gt:$pctDiff
      }
    ) {
      id
      pctDiff
      timestamp
      dpiValue
      tokenSumValue
    }
  }
`;
