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

export default memo(function ProductList({
  products,
  selectedId,
  onSelectId,
  Item
}) {
  return (
    <Grid
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
            selected={selectedId === prod.id}
            onCustomizeToppings={onSelectId}
          />
        </Grid>
      ))}
    </Grid>
  );
});

/*                <img src={images[0].source} alt={name} />
                <GridListTileBar
                    title={name}
                    subtitle={category}
                    actionIcon={
                        <IconButton aria-label={`Customize`} className={""}>
                        { /*<SettingsIcon onClick={handleClick(id)} />  }
                        </IconButton>
                    }
                />*/
