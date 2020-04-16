import Link from "next/link";
import { memo } from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";

const StyledButton = styled(Button)`
  min-height: 40px;
  margin: 10px !important;
`;

export default memo(function CartActionGroup({
  show,
  checkoutText,
  clearText,
  checkoutHref,
  onClickClear
}) {
  return show ? (
    <>
      <Link href="/checkout" passHref>
        <StyledButton component="a" variant="contained" color="primary">
          {checkoutText}
        </StyledButton>
      </Link>
      <StyledButton
        variant="contained"
        onClick={onClickClear}
        color="secondary"
      >
        {clearText}
      </StyledButton>
    </>
  ) : null;
});
