import Link from 'next/Link';
import { memo } from 'react';
import { Button } from '@material-ui/core';
import { ButtonGroup } from '@material-ui/core';
import styled from "styled-components";

const StyledButtonGroup = styled(ButtonGroup)`
  width: 100%;
  display: flex;
  align-items: space-around;
  flex-direction: row;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  margin: 5px;
`;

export default memo(function CartActionGroup({ show, checkoutText, clearText, checkoutHref, onCheckout, onClear }) {
    return show ? (
      <>
        <Link href="/checkout" passHref>
          <StyledButton component="a" variant="contained" onClick={onCheckout} color="primary">
            {checkoutText}
          </StyledButton>
        </Link>
        <StyledButton
          variant="contained"
          onClick={onClear}
          color="secondary"
        >
          {clearText}
        </StyledButton>
      </>
    ): null;
});