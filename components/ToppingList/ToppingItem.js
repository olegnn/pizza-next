import { memo } from "react";
import { Slider } from "@material-ui/core";
import styled from "styled-components";
import { Typography } from "@material-ui/core";

const ToppingSlider = styled(Slider)`
  min-width: 300px;
`;

export default memo(function ToppingItem({
  id,
  name,
  amount,
  onChangeAmount,
  maxAmount
}) {
  return (
    <div>
      <Typography id="discrete-slider" gutterBottom>
        {name}
      </Typography>
      <ToppingSlider
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        onChange={onChangeAmount}
        value={amount}
        key={name}
        step={1}
        marks
        max={maxAmount || 10}
        min={0}
        label={name}
      />
    </div>
  );
});
