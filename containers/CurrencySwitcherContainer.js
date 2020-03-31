import CurrencySwitcher from "../components/CurrencySwitcher";
import { cartCurrencySelector } from "../src/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { setCurrency } from "../src/actions/cart";

const CURRENCIES = [
  { currency: "USD", symbol: "$" },
  { currency: "EUR", symbol: "€" }
];

export default function CurrencySwitcherContainer(props) {
  const dispatch = useDispatch();
  const selectedCurrency = useSelector(cartCurrencySelector);
  const handleChange = useCallback(event =>
    void dispatch(setCurrency(event.target.value))
  );

  return (
    <CurrencySwitcher
      {...props}
      value={selectedCurrency}
      options={CURRENCIES}
      onChange={handleChange}
    />
  );
}
