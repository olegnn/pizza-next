import { useDispatch, useSelector } from "react-redux";
import { Slider, Typography, Paper } from "@material-ui/core";

import { useQuery } from "@apollo/react-hooks";
import { memo } from "react";
import { Button } from "@material-ui/core";

export default memo(function ToppingList({
  header,
  toppings,
  Item,
  onReset,
  ...props
}) {
  return (
    <div>
      <Typography variant="h6">{header}</Typography>
      {toppings.map(itemProps => (
        <Item {...itemProps} />
      ))}
      <Button onClick={onReset} color="secondary">
        Reset
      </Button>
    </div>
  );
});
