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
import { memo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { formatPrice } from "../../app/formatters";
import { addPrices } from "../../app/utils";

const StyledTotal = styled(Typography)`
  margin: 10px;
  padding-right: 20px;
`;

const StyledChild = styled.div`
  margin: 10px;
`;

const StyledButtonGroup = styled.span`
  width: 100%;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: end;
`;

export default memo(function Cart({
  open,
  total,
  products,
  Item,
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
            disabled={disabled}
            selectedConfiguration={product.selectedConfiguration}
          />
        ))}
      </List>
      <StyledButtonGroup>
        <StyledChild>{children}</StyledChild>
        <StyledTotal variant="h6">{total}</StyledTotal>
      </StyledButtonGroup>
      {actions}
    </>
  );
});
