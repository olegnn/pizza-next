import {
  Button,
  IconButton,
  AppBar as MAppBar,
  Toolbar,
  Typography
} from "@material-ui/core";
import { omit, pipe } from "ramda";
import MenuIcon from "@material-ui/icons/Menu";
import { memo } from "react";
import styled from "styled-components";

import BadgeCartContainer from "../containers/BadgeCartContainer";

const StyledAppBar = styled(
  pipe(omit(["leftOpen", "rightOpen"]), props => <MAppBar {...props} />)
)`
  margin-top: 0px;
  padding-left: ${({ leftOpen, theme }) =>
    (leftOpen && theme.leftDrawerWidth) || 0}px;
  padding-right: ${({ rightOpen, theme }) =>
    (rightOpen && theme.rightDrawerWidth) || 0}px;
`;

const MenuButton = styled(Button)`
  margin-right: 30rem;
`;

const Header = styled(Typography)`
  flex-grow: 7;
`;

const LoginButton = styled(Button)`
  color: inherit;
`;

export default memo(function AppBar({
  header,
  leftOpen,
  rightOpen,
  onToggleLeft,
  onToggleRight
}) {
  return (
    <StyledAppBar leftOpen={leftOpen} rightOpen={rightOpen} position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onToggleLeft}
          edge="start"
          className=""
        >
          <MenuIcon />
        </IconButton>
        <Header variant="h6">{header}</Header>
        <IconButton aria-label="cart" onClick={onToggleRight}>
          <BadgeCartContainer />
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  );
});
