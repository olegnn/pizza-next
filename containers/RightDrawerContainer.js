import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RightDrawer from '../components/RightDrawer';
import { toggleDrawer, DRAWERS } from '../app/actions/ui';
import { isRightDrawerOpenSelector } from '../app/selectors';

export default memo(function RightDrawerContainer({ children, ...props }) {
  const dispatch = useDispatch();
  const isRightDrawerOpen = useSelector(isRightDrawerOpenSelector);
  const handleToggle = useCallback(
    () => void dispatch(toggleDrawer(DRAWERS.RIGHT)),
    [dispatch]
  );

  return (
    <RightDrawer
      open={isRightDrawerOpen}
      onClickToggle={handleToggle}
      {...props}
    >
      {children}
    </RightDrawer>
  );
});
