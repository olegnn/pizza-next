import ToppingItem from "../components/ToppingList/ToppingItem";
import { overlaySelector } from "../src/selectors";
import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { changeToppingAmount } from "../src/actions/overlay";

export default function ToppingSliderContainer({ productId, id, ...props }) {
  const dispatch = useDispatch();
  const currentAmount =
    useSelector(overlaySelector).getIn([productId, "toppings", id]) || 0;
  const handleAmountChange = useCallback(
    (_, amount) =>
      currentAmount !== amount &&
      void dispatch(changeToppingAmount(productId, id, amount, props.prices)),
    [productId, id, currentAmount, props.prices]
  );

  return (
    <ToppingItem
      amount={currentAmount}
      onAmountChange={handleAmountChange}
      {...props}
    />
  );
}
