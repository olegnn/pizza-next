import {
  IconButton,
  AppBar as MAppBar,
  Toolbar,
  Typography
} from '@material-ui/core';
import { omit, pipe } from 'ramda';
import MenuIcon from '@material-ui/icons/Menu';
import { memo } from 'react';
import styled from 'styled-components';

const StyledAppBar = styled(
  pipe(omit(['leftOpen', 'rightOpen']), props => <MAppBar {...props} />)
)`
  margin-top: 0px;
  padding-left: ${({ leftOpen, theme }) =>
    (leftOpen && theme.leftDrawerWidth) || 0}px;
  padding-right: ${({ rightOpen, theme }) =>
    (rightOpen && theme.rightDrawerWidth) || 0}px;
`;

const Header = styled(Typography)`
  flex-grow: 7;
`;

export default memo(function AppBar({
  header,
  leftOpen,
  rightOpen,
  onToggleLeft,
  onToggleRight,
  iconBadge
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
          {iconBadge}
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  );
});
