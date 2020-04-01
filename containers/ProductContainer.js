import { useSelector, useDispatch } from "react-redux";
import { useCallback, memo } from "react";
import { injectIntl } from "react-intl";
import {
  overlaySelector,
  selectedElementSelector,
  productAdditionalCostSelector,
  cartCurrencySelector
} from "../app/selectors";
import Product from "../components/ProductList/Product";
import { addProduct } from "../app/actions/cart";
import { Map } from "immutable";
import { setProductConfiguration } from "../app/actions/overlay";
import { pick, propEq } from "ramda";
import { addPrices } from "../app/utils";
import { formatPrice } from "../app/formatters";
import { ProductConfigurationSelection } from "../app/types";

export default memo(
  injectIntl(function ProductContainer({ intl, ...props }) {
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
        dispatch,
        productId,
        prodConfiguration,
        choosenProductConfiguration,
        props.configurations
      ]
    );
    const handleSelectConfiguration = useCallback(
      event =>
        void dispatch(setProductConfiguration(productId, +event.target.value)),
      [productId, dispatch]
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
  })
);
