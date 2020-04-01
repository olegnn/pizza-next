import Link from "next/link";
import { memo } from "react";
import { Button } from "@material-ui/core";
import { ButtonGroup } from "@material-ui/core";
import styled from "styled-components";

const StyledButton = styled(Button)`
  margin: 5px !important;
`;

export default memo(function CartActionGroup({
  show,
  checkoutText,
  clearText,
  checkoutHref,
  onClear
}) {
  return show ? (
    <>
      <Link href="/checkout" passHref>
        <StyledButton component="a" variant="contained" color="primary">
          {checkoutText}
        </StyledButton>
      </Link>
      <StyledButton variant="contained" onClick={onClear} color="secondary">
        {clearText}
      </StyledButton>
    </>
  ) : null;
});
