import { memo } from 'react';
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
import { useSelector } from "react-redux";
import styled from "styled-components";

const StyledDrawer = styled(Drawer)`
  min-width: ${props => props.width};
  @media only screen and (max-width: 600px) {
    min-width: 100vw;
  }
`;

const StyledDrawerHeader = styled.div`
  min-width: ${props => props.width};
  @media only screen and (max-width: 600px) {
    min-width: 100vw;
  }
`;

export default memo(function RightDrawer({ open, children, onClickToggle, width }) {
  return (
    <StyledDrawer
      width={width}
      className=""
      variant="persistent"
      anchor="right"
      open={open}
      classes={{
        paper: ""
      }}
    >
      <StyledDrawerHeader width={width}>
        <IconButton onClick={onClickToggle}>
          <ChevronRightIcon />
        </IconButton>
      </StyledDrawerHeader>
      {children}
    </StyledDrawer>
  );
})
