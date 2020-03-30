import { Checkbox } from "@material-ui/core";
import { ExpansionPanel } from "@material-ui/core";
import {
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { ListItemIcon } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Inbox as InboxIcon,
  Mail as MailIcon
} from "@material-ui/icons";
import { memo } from "react";
import styled from "styled-components";

import { ProductIcon } from "../ProductIcon";
import { injectIntl } from "react-intl";
import { formatPrice } from "../../src/formatters";

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
  margin-left: -15px;
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
  intl
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
              {name} ({configuration && configuration.attr})
            </StyledItemName>
          }
          control={
            <QuantityInput
              type="number"
              size="small"
              value={quantity}
              inputProps={{
                max: maxQuantity,
                min: 0
              }}
              onChange={event => onChangeQuantity(event, maxQuantity)}
              InputLabelProps={{
                shrink: true
              }}
            />
          }
        />
      </StyledListItemText>
      {[...toppings.entries()].map((/*{ quantity, icon }*/ [i, v]) => (
        <>
          <StyledListItemIcon key={i}>
            <StyledToppingIcon
              src={availableToppings.find(({ id }) => id === i).image.source}
            />
          </StyledListItemIcon>
          <Typography> x {v} </Typography>
        </>
      ))}
      <PriceC variant="h6"> = {price}</PriceC>
    </StyledListItem>
  );
});