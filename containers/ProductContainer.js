import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { injectIntl } from "react-intl";
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
import { formatPrice } from "../src/formatters";

export default injectIntl(function ProductContainer({ intl, ...props }) {
  const dispatch = useDispatch();
  const configuration = useSelector(overlaySelector);
  const currency = useSelector(cartCurrencySelector);

  const productId = props.id;
  const prodConfiguration = configuration.get(productId);
  const choosenProductConfiguration =
    (prodConfiguration &&
      props.configurations.find(
        ({ seqId }) => seqId === prodConfiguration.selectedConfiguration
      )) ||
    props.configurations[0];

  const handleAddProduct = useCallback(
    (_, quantity) =>
      void dispatch(
        addProduct(
          {
            id: props.id,
            toppings: prodConfiguration && prodConfiguration.toppings,
            quantity,
            selectedConfiguration: choosenProductConfiguration
          },
          Number.isSafeInteger(props.maxQuantity) && props.maxQuantity > 0
            ? props.maxQuantity
            : void 0,
          props.configurations
        )
      ),
    [productId, prodConfiguration, choosenProductConfiguration]
  );
  const handleSelectConfiguration = useCallback(
    event =>
      void dispatch(setProductConfiguration(productId, +event.target.value)),
    [productId]
  );
  const getAdditionalCost = useSelector(productAdditionalCostSelector);


  const price = formatPrice(
    intl,
    addPrices(
      choosenProductConfiguration.prices.find(propEq("currency", currency)),
      getAdditionalCost(props.id)
    )
  );

  return (
    <Product
      {...props}
      price={price}
      selectedConfiguration={prodConfiguration && prodConfiguration.selectedConfiguration || 0}
      onAddProduct={handleAddProduct}
      onSelectConfiguration={handleSelectConfiguration}
    />
  );
});
