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
  injectIntl(function ProductContainer({ intl, id, ...props }) {
    const dispatch = useDispatch();
    const configuration = useSelector(overlaySelector);
    const currency = useSelector(cartCurrencySelector);

    const prodConfiguration = configuration.get(id);
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
              id,
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
        id,
        prodConfiguration,
        choosenProductConfiguration,
        props.configurations
      ]
    );
    const handleSelectConfiguration = useCallback(
      event => void dispatch(setProductConfiguration(id, +event.target.value)),
      [id, dispatch]
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
        id={id}
        addToCartText="Add to cart"
        customizeProductText="Customize toppings"
        customizable={!!props.toppings.length}
        price={price}
        selectedConfiguration={
          (prodConfiguration && prodConfiguration.selectedConfiguration) || 0
        }
        onAddProduct={handleAddProduct}
        onSelectConfiguration={handleSelectConfiguration}
        {...props}
      />
    );
  })
);
