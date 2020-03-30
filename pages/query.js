import { Typography } from "@material-ui/core";
import styled from "styled-components";

const StyledT = styled.textarea`
  height: 800px;
  width: 100%;
  font-size: 30px;
`;

export default () => {
  const query = `
# Запрос:
query Products {
    products {
        name
        images {
        source
        }
        configurations {
        attr
        prices {
            currency
            amount
        }
        }
    }
}`;
  const mutation = `
# Write your query or mutation here
# Вставка:
mutation addProduct {
    createProduct(
        data: {
        name: "Chili Soup"
        description: "Tasty soup"
        category: Pizza
        configurations: {
            create: [
            {
                id: 0
                capacity: 500
                attr: "0.5l"
                prices: { create: [{ currency: USD, amount: 1000 }, { currency: EUR, amount: 900 }] }
            }
            ]
        }
        images: {
            create: [
            {
                source: "https://aasd"
                alt: "https:///"
                size: 5
            }
            ]
        }
        }
    ) {
        id
        name
        configurations {
        id
        weight
        prices {
            currency
            amount
        }
        }
        images {
        source
        alt
        }
    }
}
`;
  return (
    <StyledT
      value={`      
      ${query}
    
      ${mutation}`}
    ></StyledT>
  );
};
