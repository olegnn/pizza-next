import { ChevronRight as ChevronRightIcon } from '@material-ui/icons';
import { Drawer, IconButton } from '@material-ui/core';
import { memo } from 'react';
import styled from 'styled-components';

const StyledDrawer = styled(Drawer)`
  min-width: ${props => props.theme.rightDrawerWidth}px;
  @media only screen and (max-width: ${props =>
      props.theme.rightDrawerWidth}px) {
    min-width: 100vw;
    max-width: 100vw;
  }
`;

const StyledDrawerHeader = styled.div`
  min-width: ${props => props.theme.rightDrawerWidth}px;
  @media only screen and (max-width: ${props =>
      props.theme.rightDrawerWidth}px) {
    min-width: 100vw;
    max-width: 100vw;
  }
`;

export default memo(function RightDrawer({ open, children, onClickToggle }) {
  return (
    <StyledDrawer
      className=""
      variant="persistent"
      anchor="right"
      open={open}
      classes={{
        paper: ''
      }}
    >
      <StyledDrawerHeader>
        <IconButton onClick={onClickToggle}>
          <ChevronRightIcon />
        </IconButton>
      </StyledDrawerHeader>
      {children}
    </StyledDrawer>
  );
});
