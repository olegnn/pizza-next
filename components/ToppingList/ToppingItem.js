import { memo } from 'react';
import styled from 'styled-components';
import { Slider, Typography } from '@material-ui/core';

const ToppingSlider = styled(Slider)`
  min-width: 300px;
`;

export default memo(function ToppingItem({
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
