import ToppingItem from "../components/ToppingList/ToppingItem";
import { overlaySelector } from "../app/selectors";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, memo } from "react";
import { setProductTopping } from "../app/actions/overlay";

export default memo(function ToppingSliderContainer({
  productId,
  id,
  name,
  prices,
  maxQuantity
}) {
  const dispatch = useDispatch();
  const currentAmount =
    useSelector(overlaySelector).getIn([productId, "toppings", id]) || 0;
  const handleAmountChange = useCallback(
    (_, amount) =>
      currentAmount !== amount &&
      void dispatch(setProductTopping(productId, id, amount, prices)),
    [dispatch, productId, id, currentAmount, prices]
  );

  return (
    <ToppingItem
      id={id}
      name={name}
      amount={currentAmount}
      onChangeAmount={handleAmountChange}
      maxAmount={maxQuantity}
    />
  );
});
