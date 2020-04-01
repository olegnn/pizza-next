import { memo } from "react";
import { RadioGroup, Radio } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";

export default memo(function CurrencySwitcher({ options, value, onChange }) {
  return (
    <RadioGroup row value={value} onChange={onChange}>
      {options.map(({ currency, symbol }) => (
        <FormControlLabel
          key={currency}
          value={currency}
          control={<Radio />}
          label={symbol}
        />
      ))}
    </RadioGroup>
  );
});
