import { Button } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { CardMedia } from "@material-ui/core";
import { CardActionArea } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { memo } from "react";
import { Radio } from "@material-ui/core";
import { RadioGroup } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { CardContent } from "@material-ui/core";

export default memo(function Product({
  id,
  name,
  options,
  description,
  images,
  onAddProduct,
  onSelectOption,
  onCustomizeToppings,
  selectedOption,
  selected
}) {
  return (
    <Card raised={selected}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={images[0].source}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <RadioGroup value={selectedOption || 0} onChange={onSelectOption}>
          {options.map(option => (
            <FormControlLabel
              value={option.id}
              control={<Radio />}
              label={option.attr}
            />
          ))}
        </RadioGroup>
      </CardActions>
      <CardActions>
        <Button
          onClick={() => void onAddProduct(id, 1)}
          size="small"
          color="primary"
        >
          Add to cart
        </Button>
        <Button
          onClick={event => void onCustomizeToppings(event, id)}
          size="small"
          color="primary"
        >
          Customize toppings
        </Button>
      </CardActions>
    </Card>
  );
});
