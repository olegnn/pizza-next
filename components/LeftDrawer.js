import { styled as styledJss } from "@material-ui/core/styles";
import { memo } from "react";
import styled from "styled-components";
import Link from "next/link";
import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";

const StyledDrawer = styled(Drawer)`
  width: ${props => props.theme.rightDrawerWidth}px;
  flex-shrink: 0;
`;

const StyledItem = styled(ListItem)`
  min-width: ${props => props.theme.leftDrawerWidth}px;
`;

const StyledHead = styledJss(styled.div``)(props => ({
  ...props.theme.mixins.toolbar
}));

export default memo(function LeftDrawer({ items, ...props }) {
  return (
    <StyledDrawer {...props} variant="persistent">
      <StyledHead />
      <Divider />
      <List component="div">
        {items.map(({ name, icon, selected, path }) => (
          <Link href={path} passHref key={path}>
            <StyledItem component="a" selected={selected} key={name} button>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText>{name}</ListItemText>
            </StyledItem>
          </Link>
        ))}
      </List>
    </StyledDrawer>
  );
});
