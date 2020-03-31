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
import { formatPrice } from "../../app/formatters";
import { useCallback } from "react";

export default memo(function Product({
  id,
  name,
  configurations,
  description,
  images,
  selectedConfiguration,
  selected,
  customizable,
  price,
  addToCartText,
  customizeProductText,
  onAddProduct,
  onCustomizeProduct,
  onSelectConfiguration
}) {
  const handleCustomizeProduct = useCallback(
    event =>
      console.log(selected) ||
      (!selected && void onCustomizeProduct(event, id)),
    [onCustomizeProduct, id, selected]
  );

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
          {configurations.length < 2 ? <>({configurations[0].attr})</> : null}
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
                key={conf.seqId}
                value={conf.seqId}
                control={<Radio />}
                label={conf.attr}
              />
            ))}
          </RadioGroup>
        ) : null}
      </CardActions>
      <CardActions>
        <Button onClick={onAddProduct} size="small" color="primary">
          {addToCartText}
        </Button>
        {customizable ? (
          <Button onClick={handleCustomizeProduct} size="small" color="primary">
            {customizeProductText}
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
});
