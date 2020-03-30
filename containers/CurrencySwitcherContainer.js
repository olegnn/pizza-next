import CurrencySwitcher from "../components/CurrencySwitcher";
import { cartCurrencySelector } from "../src/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { setCurrency } from "../src/actions/cart";

export default function CurrencySwitcherContainer(props) {
  const selectedCurrency = useSelector(cartCurrencySelector);
  const dispatch = useDispatch();
  const handleChange = useCallback(event =>
    dispatch(setCurrency(event.target.value))
  );

  return (
    <CurrencySwitcher
      {...props}
      value={selectedCurrency}
      options={[
        { currency: "USD", symbol: "$" },
        { currency: "EUR", symbol: "€" }
      ]}
      onChange={handleChange}
    />
  );
}
