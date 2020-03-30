import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import {
  overlaySelector,
  selectedProductSelector,
  productAdditionalCostSelector,
  cartCurrencySelector
} from "../src/selectors";
import Product from "../components/ProductList/Product";
import { addProduct } from "../src/actions/cart";
import { Map } from "immutable";
import { setProductConfiguration } from "../src/actions/overlay";
import { pick, propEq } from "ramda";
import { addPrices } from "../src/utils";

export default function ProductContainer(props) {
  const dispatch = useDispatch();
  const configuration = useSelector(overlaySelector);
  const currency = useSelector(cartCurrencySelector);

  const productId = props.id;
  const prodConfiguration = configuration.get(productId);
  const handleAddProduct = useCallback(
    (_, quantity) =>
      void dispatch(
        addProduct(
          {
            id: props.id,
            toppings: prodConfiguration && prodConfiguration.toppings,
            quantity,
            selectedConfiguration: prodConfiguration
              ? prodConfiguration.selectedConfiguration
              : pick(["id", "seqId"], props.configurations[0])
          },
          Number.isSafeInteger(props.maxQuantity) && props.maxQuantity > 0
            ? props.maxQuantity
            : void 0,
          props.configurations
        )
      ),
    [productId, prodConfiguration]
  );
  const handleSelectConfiguration = useCallback(
    event =>
      void dispatch(
        setProductConfiguration(
          productId,
          props.configurations.find(
            ({ seqId }) => seqId === +event.target.value
          )
        )
      ),
    [productId]
  );
  const getAdditionalCost = useSelector(productAdditionalCostSelector);

  const selectedConfiguration =
    (prodConfiguration &&
      props.configurations.find(
        ({ seqId }) => seqId === prodConfiguration.selectedConfiguration.seqId
      )) ||
    props.configurations[0];

  return (
    <Product
      {...props}
      price={addPrices(
        selectedConfiguration.prices.find(propEq("currency", currency)),
        getAdditionalCost(props.id)
      )}
      selectedConfiguration={selectedConfiguration}
      onAddProduct={handleAddProduct}
      onSelectConfiguration={handleSelectConfiguration}
    />
  );
}
