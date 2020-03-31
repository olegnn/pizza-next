import { median } from "ramda";
import { Grid } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { CardMedia } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { CardActionArea } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { GridListTileBar } from "@material-ui/core";
import { GridListTile, GridList } from "@material-ui/core";
import { memo } from "react";
import styled from "styled-components";

const StyledGrid = styled(Grid)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export default memo(function ProductList({
  products,
  selected,
  onSelect,
  Item
}) {
  return (
    <StyledGrid
      container
      direction="row"
      alignItems="start"
      justify="center"
      spacing={3}
    >
      {products.map(prod => (
        <Grid item sm={4} md={3} xs={12} key={prod.id}>
          <Item
            {...prod}
            selected={selected === prod.id}
            onCustomizeProduct={onSelect}
          />
        </Grid>
      ))}
    </StyledGrid>
  );
});
