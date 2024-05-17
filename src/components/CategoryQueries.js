import { gql } from "@apollo/client";

export const CATEGORY_QUERIES = {
  all: gql`
    query {
      productsByCategory(category: "all") {
        id
        name
        in_stock
        gallery {
          image_url
        }
        prices {
          amount
          currency {
            label
            symbol
          }
        }
        attributes {
          id
          items {
            displayValue
            value
            id
          }
          name
          type
        }
      }
    }
  `,
  clothes: gql`
    query {
      productsByCategory(category: "clothes") {
        id
        name
        in_stock
        gallery {
          image_url
        }
        prices {
          amount
          currency {
            label
            symbol
          }
        }
        attributes {
          id
          items {
            displayValue
            value
            id
          }
          name
          type
        }
      }
    }
  `,
  tech: gql`
    query {
      productsByCategory(category: "tech") {
        id
        name
        in_stock
        gallery {
          image_url
        }
        prices {
          amount
          currency {
            label
            symbol
          }
        }
        attributes {
          id
          items {
            displayValue
            value
            id
          }
          name
          type
        }
      }
    }
  `,
};
