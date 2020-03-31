import { Drawer, Divider } from "@material-ui/core";
import { List } from "@material-ui/core";
import { ListItemIcon } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { styled as styledJss } from "@material-ui/core/styles";
import { memo } from "react";
import styled from "styled-components";
import Link from "next/link";

const StyledDrawer = styled(Drawer)`
  width: ${props => props.width};
  flex-shrink: 0;
`;

const StyledItem = styled(ListItem)`
  min-width: 200px;
`;

const StyledHead = styledJss(styled.div``)(props => ({
  ...props.theme.mixins.toolbar
}));

export default memo(function LeftDrawer({ items, ...props }) {
  return (
    <StyledDrawer {...props} variant="persistent">
      <StyledHead />
      <Divider />
      <List>
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
