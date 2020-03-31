import ToppingItem from "../components/ToppingList/ToppingItem";
import { overlaySelector } from "../src/selectors";
import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { changeToppingAmount } from "../src/actions/overlay";

export default function ToppingSliderContainer({
    productId,
    id,
    name,
    prices,
    maxQuantity
}) {
  const dispatch = useDispatch();
  const currentAmount =
    useSelector(overlaySelector).getIn([
      productId,
      "toppings",
      id
    ]) || 0;
  const handleAmountChange = useCallback(
    (_, amount) => console.log(amount, currentAmount) ||
      currentAmount !== amount &&
      void dispatch(
        changeToppingAmount(productId, id, amount, prices)
      ),
    [productId, id, currentAmount, prices]
  );

  console.log(maxQuantity);

  return (
    <ToppingItem
      id={id}
      name={name}
      amount={currentAmount}
      onChangeAmount={handleAmountChange}
      maxAmount={maxQuantity}
    />
  );
}
