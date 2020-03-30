///import { Checkbox } from "@material-ui/core";
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
  margin: 5px;
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
  padding-right: -40px;
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
`;

const QuantityInput = styled(TextField)`
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
  //elseformatPrice(intl, price)

  /*return (
      <ListItem button>
        <ExpansionPanel>
          <ExpansionPanelSummary>
            {/*<FormControlLabel
          aria-label="Acknowledge"
          onClick={event => event.stopPropagation()}
          onFocus={event => event.stopPropagation()}
          control={<Checkbox />}
          label={name}
        />}
            <Grid container spacing={3}>
              <Grid item xs={2} spacing={1}>
                <Typography>{name}</Typography>
                <TextField
                  id="standard-number"
                  label="Quantity"
                  type="number"
                  value={quantity}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={4} spacing={1}>
                {[...toppings.values()].map((/*{ quantity, icon } v) => (
                  <>
                    <StyledToppingIcon src="/icons/icons8-bacon-96.png" />
                    <Typography>x {3}</Typography>
                  </>
                ))}
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography color="textSecondary">
              The click event of the nested action will propagate up and expand
              the panel unless you explicitly stop it.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </ListItem>
    );*/
  /*
    return <ListItem button key={name}>
        <ListItemIcon>{id % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
        <ListItemText primary={name} />
    </ListItem>;*/
});

/*
        <Grid container spacing={3}>
          <Grid item xs={2} spacing={1}>
            <Typography>{name}</Typography>
            <TextField
              id="standard-number"
              label="Quantity"
              type="number"
              value={quantity}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid item xs={4} spacing={1}>
            {[...toppings.values()].map((/*{ quantity, icon } v) => (
              <>
                <StyledToppingIcon src="/icons/icons8-bacon-96.png" />
                <Typography>x {3}</Typography>
              </>
            ))}
          </Grid>
        </Grid>*/
