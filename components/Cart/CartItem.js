///import { Typography } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";
import { ExpansionPanel } from "@material-ui/core";
import {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { ListItemIcon } from "@material-ui/core";
import {
  Mail as MailIcon,
  Inbox as InboxIcon,
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon
} from "@material-ui/icons";
import styled from "styled-components";
import { memo } from "react";
import { Typography } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Grid } from "@material-ui/core";

const StyledToppingIcon = styled.img`
  max-height: 30px;
  max-width: 30px;
`;

const StyledItemName = styled(Typography)`
  padding-right: 10px;
`;

const StyledListItem = styled(ListItem)`
  width: auto;
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

export default memo(function CartItem({
  product: { id, name, description, availableOptions, maxQuantity } = {},
  selectedOption,
  price,
  toppings,
  quantity,
  onChangeQuantity
}) {
  console.log("render");
  // if (false)
  return (
    <StyledListItem>
      <StyledListItemIconStart>
        <StyledToppingIcon src="/icons/icons8-pizza-96.png" />
      </StyledListItemIconStart>
      <StyledListItemText>
        <FormControlLabel
          labelPlacement="start"
          label={
            <StyledItemName>
              {name} (
              {availableOptions.find(({ id }) => id === selectedOption).attr})
            </StyledItemName>
          }
          control={
            <TextField
              id="standard-number"
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
        {/*<ListItemIcon>{id % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>*/}
      </StyledListItemText>
      {[...toppings.values()].map((/*{ quantity, icon }*/ v, i) => (
        <>
          <StyledListItemIcon>
            <StyledToppingIcon src={`/icons/icons8-${icons[i]}-96.png`} />
          </StyledListItemIcon>
          <Typography> x {v} </Typography>
        </>
      ))}
      <PriceC variant="h6">= {price}</PriceC>
    </StyledListItem>
  );
  //else

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
