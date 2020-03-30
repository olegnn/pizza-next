import { Button } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { CardMedia } from "@material-ui/core";
import { CardActionArea } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { Radio } from "@material-ui/core";
import { RadioGroup } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { memo } from "react";
import { injectIntl } from "react-intl";
import { formatPrice } from "../../src/formatters";

export default memo(function Product({
  id,
  name,
  configurations,
  description,
  images,
  toppings,
  price,
  selectedConfiguration,
  selected,
  onAddProduct,
  onSelectConfiguration,
  onCustomizeToppings
}) {
  return (
    <Card raised={selected}>
      <CardMedia
        component="img"
        alt={description}
        height="140"
        image={images[0].source}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {name} - {price}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
          {configurations.length < 2 ? <> ({configurations[0].attr})</> : null}
        </Typography>
      </CardContent>
      <CardActions>
        {configurations.length > 1 ? (
          <RadioGroup
            value={selectedConfiguration || 0}
            onChange={onSelectConfiguration}
          >
            {configurations.map(conf => (
              <FormControlLabel
                value={conf.seqId}
                control={<Radio />}
                label={conf.attr}
              />
            ))}
          </RadioGroup>
        ) : null}
      </CardActions>
      <CardActions>
        <Button
          onClick={() => void onAddProduct(id, 1)}
          size="small"
          color="primary"
        >
          Add to cart
        </Button>
        {toppings.length > 0 ? (
          <Button
            onClick={event => void onCustomizeToppings(event, id)}
            size="small"
            color="primary"
          >
            Customize toppings
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
});
