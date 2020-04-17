import { memo, useMemo } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import LeftDrawer from '../components/LeftDrawer';
import { isLeftDrawerOpenSelector } from '../app/selectors';

const StyledMenuIcon = styled.img`
  max-height: 30px;
  max-width: 30px;
`;

const MENU_ITEMS = [
  {
    name: 'Menu',
    icon: <StyledMenuIcon src="/icons/icons8-restaurant-menu-96.png" />,
    path: '/'
  },
  {
    name: 'Pizza',
    icon: <StyledMenuIcon src="/icons/icons8-pizza-96.png" />,
    path: '/pizza'
  },
  {
    name: 'Soups',
    icon: <StyledMenuIcon src="/icons/icons8-soup-plate-96.png" />,
    path: '/soups'
  },
  {
    name: 'Drinks',
    icon: <StyledMenuIcon src="/icons/icons8-soda-bottle-96.png" />,
    path: '/drinks'
  },
  {
    name: 'Desserts',
    icon: <StyledMenuIcon src="/icons/icons8-pancake-96.png" />,
    path: '/desserts'
  },
  {
    name: 'Checkout',
    icon: <StyledMenuIcon src="/icons/icons8-checkout-96.png" />,
    path: '/checkout'
  }
];

export default memo(function LeftDrawerContainer(props) {
  const open = useSelector(isLeftDrawerOpenSelector);
  const router = useRouter();
  const items = useMemo(
    () =>
      MENU_ITEMS.map(item => ({
        ...item,
        selected: Boolean(router) && router.pathname === item.path
      })),
    [router && router.pathname]
  );

  return <LeftDrawer open={open} items={items} {...props} />;
});
