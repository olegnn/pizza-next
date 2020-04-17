import { Grid } from '@material-ui/core';
import { memo } from 'react';
import styled from 'styled-components';

const StyledGrid = styled(Grid)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export default memo(function ProductList({
  products,
  selected,
  onCustomizeProduct,
  Item,
  ...props
}) {
  return (
    <StyledGrid
      container
      direction="row"
      alignItems="flex-start"
      justify="center"
      spacing={3}
      {...props}
    >
      {products.map(prod => (
        <Grid item sm={6} md={3} xs={12} key={prod.id}>
          <Item
            {...prod}
            selected={selected === prod.id}
            onCustomizeProduct={onCustomizeProduct}
          />
        </Grid>
      ))}
    </StyledGrid>
  );
});
