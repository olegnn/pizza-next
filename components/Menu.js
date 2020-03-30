import { Drawer } from "@material-ui/core";
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

export default memo(function Menu({ items, ...props }) {
  return (
    <StyledDrawer {...props} variant="permanent">
      <StyledHead />
      <List>
        {items.map(({ name, icon, onClick, selected, path }) => (
          <Link href={path}>
            <StyledItem selected={selected} key={name} button>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText>{name}</ListItemText>
            </StyledItem>
          </Link>
        ))}
      </List>
    </StyledDrawer>
  );
});
