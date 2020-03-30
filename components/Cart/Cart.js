import { List } from "@material-ui/core";
import { ListItemIcon } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Drawer } from "@material-ui/core";
import { ButtonGroup } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from "@material-ui/icons";
import { map, pipe, toPairs, propEq } from "ramda";
import Link from 'next/Link';
import { memo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { injectIntl } from "react-intl";
import { formatPrice } from "../../src/formatters";
import { addPrices } from "../../src/utils";

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

const StyledButton = styled(Button)`
  margin: 5px;
`;

const StyledChild = styled.div`
  margin: 10px;
`;

export default memo(function Cart({
  open,
  total,
  products,
  onClearCart,
  onCheckout,
  Item,
  intl,
  children,
  disabled,
  actions
}) {
  return (
    <>
      <List>
        {[...products.entries()].map(([productKey, product]) => (
          <Item
            key={productKey}
            productKey={productKey}
            id={product.id}
            toppings={product.toppings}
            quantity={product.quantity}
            disabled
            selectedConfiguration={product.selectedConfiguration}
          />
        ))}
      </List>
      <StyledChild>{children}</StyledChild>
      <StyledTotal variant="h6">{total}</StyledTotal>
      {actions}
    </>
  );
});

/*        
  <List>
    {[...products.values()].map((product) =>
      <Item key={product.id} id={product.id} toppings={product.toppings} quantity={product.quantity} />
    )}
  </List> */
