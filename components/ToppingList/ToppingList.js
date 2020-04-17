import { memo } from 'react';
import { Typography } from '@material-ui/core';

export default memo(function ToppingList({ header, toppings, Item, actions }) {
  return (
    <div>
      <Typography variant="h6">{header}</Typography>
      {toppings.map(itemProps => (
        <Item key={itemProps.id} {...itemProps} />
      ))}
      {actions}
    </div>
  );
});
