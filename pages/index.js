import { Typography, ButtonBase } from "@material-ui/core";
import { ListSubheader } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Link from "next/link";
import styled from "styled-components";

import PageContainer from "../containers/PageContainer";
import withApollo from '../hocs/withApollo';

const menuData = [
  {
    name: "Pizza",
    description: "",
    route: "/pizza",
    img: "/pizza.jpg"
  },
  {
    name: "Soups",
    description: "",
    route: "/soups",
    img: "/soup.jpg"
  },
  {
    name: "Desserts",
    description: "",
    route: "/desserts",
    img: "/dessert.jpg"
  },
  {
    name: "Drinks",
    description: "",
    route: "/drinks",
    img: "/drinks.jpg"
  }
];

const StyledImg = styled.img`
  height: inherit;
  min-width: 100%;
  background-size: cover;
`;

const StyledButton = styled(ButtonBase)`
  height: inherit;
  min-width: 100%;
`;

export default withApollo(function Index() {
  return (
    <PageContainer>
      <GridList cellHeight={360} className="">
        <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          <Typography variant="h3">Menu</Typography>
        </GridListTile>
        {menuData.map(item => {
          return (
            <GridListTile key={item.name}>
              <Link href={item.route} passHref>
                <StyledButton component="a">
                  <StyledImg src={item.img} alt={item.name} />
                  <GridListTileBar
                    title={item.name}
                    subtitle={<span>{item.description}</span>}
                    actionIcon={null}
                  />
                </StyledButton>
              </Link>
            </GridListTile>
          );
        })}
      </GridList>
    </PageContainer>
  );
});