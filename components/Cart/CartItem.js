import { ListItem } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { ListItemIcon } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { memo } from "react";
import styled from "styled-components";

import ProductIcon from "../ProductIcon";

const StyledToppingIcon = styled.img`
  max-height: 30px;
  max-width: 30px;
`;

const StyledProductIcon = styled(ProductIcon)`
  max-height: 30px;
  max-width: 30px;
`;

const StyledItemName = styled(Typography)`
  padding-right: 10px;
`;

const StyledListItem = styled(ListItem)`
  min-width: auto;
`;

const StyledListItemIconStart = styled(ListItemIcon)`
  margin-right: -40px;
  margin-left: -10px;
`;

const StyledListItemIcon = styled(ListItemIcon)`
  margin-right: -20px;
  padding-right: -20px;
`;

const StyledListItemText = styled(ListItemText)`
  margin-right: 20px;
`;

const PriceC = styled(Typography)`
  padding-left: 10px;
  margin-right: 0px;
  right: 0px;
`;

const QuantityInput = styled(TextField)`
  min-width: 10px;
`;

export default memo(function CartItem({
  product: {
    id,
    name,
    category,
    description,
    configurations: availableConfigurations,
    toppings: availableToppings,
    maxQuantity
  } = {},
  selectedConfiguration,
  price,
  toppings,
  quantity,
  onChangeQuantity,
  disabled,
}) {
  const configuration = availableConfigurations.find(
    ({ seqId }) => +seqId === +selectedConfiguration.seqId
  );

  return (
    <StyledListItem>
      <StyledListItemIconStart key="start">
        <StyledProductIcon category={category} />
      </StyledListItemIconStart>
      <StyledListItemText key="text">
        <FormControlLabel
          labelPlacement="start"
          label={
            <StyledItemName>
              {name}
              {configuration && ` (${configuration.attr})`}
            </StyledItemName>
          }
          control={
            <QuantityInput
              type="number"
              size="small"
              value={String(quantity)}
              inputProps={{
                max: maxQuantity,
                min: 0
              }}
              onChange={event => onChangeQuantity(event, maxQuantity, false)}
              onBlur={event => onChangeQuantity(event, maxQuantity, true)}
              InputLabelProps={{
                shrink: true
              }}
            />
          }
        />
      </StyledListItemText>
      {[...toppings.entries()].map(([toppingId, quantity]) => (
        <>
          <StyledListItemIcon key={toppingId}>
            <StyledToppingIcon
              src={
                availableToppings.find(({ id }) => id === toppingId).image
                  .source
              }
            />
          </StyledListItemIcon>
          <Typography key={toppingId + quantity}> x {quantity} </Typography>
        </>
      ))}
      <PriceC variant="h6"> = {price}</PriceC>
    </StyledListItem>
  );
});