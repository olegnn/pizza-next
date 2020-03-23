import { List } from "@material-ui/core";
import { ListItemIcon } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Drawer } from "@material-ui/core";
import styled from "styled-components";
import { cartProductsSelector } from "../../src/selectors";
import { useSelector } from "react-redux";
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon
} from "@material-ui/icons";
import { memo } from "react";
import { Typography } from "@material-ui/core";
import { ButtonGroup } from "@material-ui/core";
import { Button } from "@material-ui/core";

const StyledDrawer = styled(Drawer)`
  min-width: 600px;
`;

const StyledList = styled(List)`
  min-width: 600px;
`;

const StyledButton = styled(Button)`
  margin: 5px;
`;

const StyledButtonGroup = styled(ButtonGroup)`
  width: 100%;
  display: flex;
  align-items: space-around;
  flex-direction: row;
  justify-content: center;
`;

const StyledTotal = styled(Typography)`
  margin: 10px;
`;

export default memo(function Cart({
  open,
  total,
  onToggleCart,
  onClearCart,
  onCheckout,
  Item
}) {
  const products = useSelector(cartProductsSelector);

  return (
    <StyledDrawer
      className=""
      variant="persistent"
      anchor="right"
      open={open}
      classes={{
        paper: ""
      }}
    >
      <IconButton onClick={onToggleCart}>
        <ChevronRightIcon />
      </IconButton>
      <StyledList>
        {[...products.entries()].map(([productKey, product]) => (
          <Item
            key={productKey}
            productKey={productKey}
            id={product.id}
            toppings={product.toppings}
            quantity={product.quantity}
            selectedOption={product.selectedOption}
          />
        ))}
      </StyledList>
      <StyledTotal variant="h6">Total: {total} </StyledTotal>
      {/*<StyledButtonGroup size="large" variant="contained">*/}
      <StyledButton variant="contained" onClick={onCheckout} color="primary">
        Checkout
      </StyledButton>
      <StyledButton variant="contained" onClick={onClearCart} color="secondary">
        Clear
      </StyledButton>
      {/*</StyledButtonGroup>*/}
    </StyledDrawer>
  );
});

/*        
  <List>
    {[...products.values()].map((product) =>
      <Item key={product.id} id={product.id} toppings={product.toppings} quantity={product.quantity} />
    )}
  </List> */
