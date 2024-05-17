import { gql } from "@apollo/client";

export const PLACE_ORDER_MUTATION = gql`
  mutation PlaceOrder($order: [OrderInput!]!) {
    newOrder(order: $order)
  }
`;
