import Router, { useRouter } from "next/router";
import { useCallback, useMemo, memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Container } from "@material-ui/core";

import AppBar from "../components/AppBar";
import Cart from "../components/Cart/Cart";
import BadgeCartContainer from "../containers/BadgeCartContainer";
import CartItemContainer from "../containers/CartItemContainer";
import { removeAllProducts } from "../app/actions/cart";
import { toggleDrawer, DRAWERS } from "../app/actions/ui";
import {
  cartTotalSelector,
  isRightDrawerOpenSelector,
  isLeftDrawerOpenSelector
} from "../app/selectors";
import CartContainer from "./CartContainer";
import RightDrawerContainer from "./RightDrawerContainer";
import LeftDrawerContainer from "./LeftDrawerContainer";

const StyledWrapper = styled.div`
  padding-left: ${props =>
    ((props.leftOpen && props.theme.leftDrawerWidth) || 0) + 5}px;
`;

const StyledContainer = styled(Container)`
  margin-top: 100px;
  min-width: ${props => props.theme.containerWidth}px;
  @media only screen and (max-width: ${props => props.theme.containerWidth}px) {
    min-width: 100vw;
    max-width: 100vw;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  vertical-align: middle;
`;

export default memo(function PageContainer({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleToggleRightDrawer = useCallback(
    () => void dispatch(toggleDrawer(DRAWERS.RIGHT)),
    [dispatch]
  );
  const handleToggleLeftDrawer = useCallback(
    () => void dispatch(toggleDrawer(DRAWERS.LEFT)),
    [dispatch]
  );
  const isLeftDrawerOpen = useSelector(isLeftDrawerOpenSelector);
  const isRightDrawerOpen = useSelector(isRightDrawerOpenSelector);

  const handleCheckout = useCallback(
    route =>
      route === "/checkout" && isRightDrawerOpen && handleToggleRightDrawer(),
    [isRightDrawerOpen, handleToggleLeftDrawer]
  );

  useEffect(() => {
    Router.events.on("routeChangeStart", handleCheckout);

    return () => Router.events.off("routeChangeStart", handleCheckout);
  });

  return (
    <>
      <AppBar
        leftOpen={isLeftDrawerOpen}
        rightOpen={isRightDrawerOpen}
        onToggleRight={handleToggleRightDrawer}
        onToggleLeft={handleToggleLeftDrawer}
        header="Pizza store"
      />
      <LeftDrawerContainer />
      <StyledWrapper leftOpen={isLeftDrawerOpen}>
        <StyledContainer>{children}</StyledContainer>
      </StyledWrapper>
      <RightDrawerContainer>
        <CartContainer showActions />
      </RightDrawerContainer>
    </>
  );
});
