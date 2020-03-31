import Link from "next/link";
import { memo } from "react";
import { Button } from "@material-ui/core";
import { ButtonGroup } from "@material-ui/core";
import styled from "styled-components";

const StyledButton = styled.span`
  margin: 5px;
`;

export default memo(function CartActionGroup({
  show,
  checkoutText,
  clearText,
  checkoutHref,
  onCheckout,
  onClear
}) {
  return show ? (
    <>
      <StyledButton>
        <Link href="/checkout" passHref>
          <Button
            component="a"
            variant="contained"
            onClick={onCheckout}
            color="primary"
          >
            {checkoutText}
          </Button>
        </Link>
      </StyledButton>
      <StyledButton>
        <Button variant="contained" onClick={onClear} color="secondary">
          {clearText}
        </Button>
      </StyledButton>
    </>
  ) : null;
});
