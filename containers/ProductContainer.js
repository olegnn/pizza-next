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
import { ProductConfigurationSelection } from '../src/types';

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

    if (props.name.includes('Carb')) {
  
      console.log(
        prodConfiguration,
        props.configurations,
        choosenProductConfiguration
      );
    }

  const handleAddProduct = useCallback(
    () =>
      void dispatch(
        addProduct(
          {
            id: props.id,
            toppings: prodConfiguration && prodConfiguration.toppings,
            quantity: 1,
            selectedConfiguration: ProductConfigurationSelection(
              choosenProductConfiguration
            )
          },
          Number.isSafeInteger(props.maxQuantity) && props.maxQuantity > 0
            ? props.maxQuantity
            : void 0,
          props.configurations
        )
      ),
    [
      productId,
      prodConfiguration,
      choosenProductConfiguration,
      props.configurations
    ]
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
      addToCartText="Add to cart"
      customizeProductText="Customize toppings"
      customizable={!!props.toppings.length}
      price={price}
      selectedConfiguration={
        (prodConfiguration && prodConfiguration.selectedConfiguration) || 0
      }
      onAddProduct={handleAddProduct}
      onSelectConfiguration={handleSelectConfiguration}
    />
  );
});
