import { memo } from "react";
import { Button } from "@material-ui/core";

export default memo(function ResetButton({ onClickReset, resetText }) {
  return (
    <Button onClick={onClickReset} color="secondary">
      {resetText}
    </Button>
  );
});
