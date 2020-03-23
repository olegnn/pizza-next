import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { overlaySelector, selectedProductSelector } from "../src/selectors";
import Product from "../components/ProductList/Product";
import { addProduct } from "../src/actions/cart";
import { Map } from "immutable";
import { setProductOption } from "../src/actions/overlay";

export default function ProductContainer(props) {
  const dispatch = useDispatch();
  const configuration = useSelector(overlaySelector);
  const productId = props.id;
  const prodConfiguration = configuration.get(productId);
  const handleAddProduct = useCallback(
    (_, quantity) =>
      void dispatch(
        addProduct(
          {
            id: props.id,
            toppings: prodConfiguration
              ? prodConfiguration.toppings
              : new Map(),
            quantity,
            selectedOption: prodConfiguration
              ? prodConfiguration.selectedOption
              : 0
          },
          Number.isSafeInteger(props.maxQuantity) && props.maxQuantity > 0
            ? props.maxQuantity
            : void 0,
          props.options
        )
      ),
    [productId, prodConfiguration]
  );
  const handleSelectOption = useCallback(
    event => void dispatch(setProductOption(productId, +event.target.value)),
    [productId]
  );

  return (
    <Product
      {...props}
      selectedOption={prodConfiguration ? prodConfiguration.selectedOption : 0}
      onAddProduct={handleAddProduct}
      onSelectOption={handleSelectOption}
    />
  );
}
