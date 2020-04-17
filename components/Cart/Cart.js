import { memo } from 'react';
import { Typography, List } from '@material-ui/core';
import styled from 'styled-components';

const StyledTotal = styled(Typography)`
  margin: 10px;
  padding-right: 20px;
`;

const StyledChild = styled.div`
  margin: 10px;
`;

const StyledChildContainer = styled.span`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: end;
`;

const StyledList = styled(List)`
  @media only screen and (max-width: ${props =>
      props.theme.rightDrawerWidth}px) {
    min-width: 100vw;
    max-width: 100vw;
  }
`;

export default memo(function Cart({
  total,
  products,
  Item,
  children,
  disabled,
  actions
}) {
  return (
    <>
      <StyledList>
        {[...products.entries()].map(([productKey, product]) => (
          <Item
            key={productKey}
            productKey={productKey}
            id={product.id}
            toppings={product.toppings}
            quantity={product.quantity}
            disabled={disabled}
            selectedConfiguration={product.selectedConfiguration}
          />
        ))}
      </StyledList>
      <StyledChildContainer>
        <StyledChild>{children}</StyledChild>
        <StyledTotal variant="h6">{total}</StyledTotal>
        <StyledChild>{actions}</StyledChild>
      </StyledChildContainer>
    </>
  );
});
