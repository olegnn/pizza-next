import { Button } from "@material-ui/core";
import { RadioGroup } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { Radio } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { Input } from "@material-ui/core";
import { always, path, and } from "ramda";
import { useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import gql from "graphql-tag";
import { useEffect } from "react";

import PageContainer from "../containers/PageContainer";
import { setDetails } from "../app/actions/details";
import {
  detailsSelector,
  cartTotalSelector,
  cartProductsSelector
} from "../app/selectors";
import { injectIntl } from "react-intl";
import CartContainer from "../containers/CartContainer";
import { removeAllProducts } from "../app/actions/cart";
import { timeStringToDate } from "../app/utils";
import withApollo from '../hocs/withApollo';
import { getCurrentTimeString } from '../app/utils';
import { CircularProgress } from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";

const StyledTextField = styled(TextField)`
  padding: 2px;
  margin: 4px;
  & .MuiTextField-root {
    margin: 4px;
    width: 25ch;
  }
`;

const FORM_MEMBERS = [
  ["name", /^\s*(?:[a-z]+\s?){1,4}$/i],
  ["phone", /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/],
  [
    "email",
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i
  ],
  ["address1", /^(?:[\w0-9,\.]+\s?)+$/],
  ["address2", /^(?:[\w0-9,\.]+\s?)+$/],
  ["payment"],
  ["time"]
];

const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder(
    $products: ProductOrderCreateManyInput!
    $email: String!
    $phone: String!
    $name: String!
    $time: DateTime
    $address1: String!
    $address2: String!
    $payment: String!
  ) {
    createOrder(
      data: {
        name: $name
        products: $products
        email: $email
        phone: $phone
        time: $time
        address1: $address1
        address2: $address2
        payment: $payment
      }
    ) {
      id
      createdAt
    }
  }
`;

const returnTrue = always(true);

const { test } = RegExp.prototype;

const ALL_TOUCHED = Array.from(FORM_MEMBERS, returnTrue);

const StyledCheckout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 10px;
`;

const StyledSubmit = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 5px;
`;

export default withApollo(injectIntl(({ intl }) => {
  const dispatch = useDispatch();
  const details = useSelector(detailsSelector);
  const total = useSelector(cartTotalSelector);
  const products = useSelector(cartProductsSelector);
  const [createOrder, orderMutation] = useMutation(CREATE_ORDER_MUTATION);
  const [touched, setTouched] = useState(
    Array.from(FORM_MEMBERS, ([member]) => !!details.get(member))
  );

  const handlers = useMemo(
    () =>
      FORM_MEMBERS.map(([name, reg], index) => {
        return [
          event =>
            setTouched(touched.map((v, i) => v || i === index)) ||
            void dispatch(setDetails(name, event.target.value)),
          reg ? test.bind(reg) : returnTrue,
          name
        ];
      }),
    touched.concat(dispatch)
  );

  const validations = handlers.map(([_, validator, member]) =>
    validator(details.get(member))
  );

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();
      setTouched(ALL_TOUCHED);

      if (validations.reduce(and, true)) {
        createOrder({
          variables: {
            name: details.name,
            products: details.products,
            email: details.email,
            phone: details.phone,
            time: timeStringToDate(details.time || getCurrentTimeString()),
            address1: details.address1,
            address2: details.address2,
            payment: details.payment,
            products: {
              create: [...products.values()].map(product => ({
                product: { connect: { id: product.id } },
                quantity: product.quantity,
                configuration: {
                  connect: { id: product.selectedConfiguration.id }
                },
                toppings: {
                  create: [...product.toppings.entries()].map(
                    ([id, quantity]) => ({
                      topping: { connect: { id } },
                      quantity
                    })
                  )
                }
              }))
            }
          }
        });
      }
    },
    [validations, products, details]
  );

  const orderId = path(["data", "createOrder", "id"], orderMutation);
  useEffect(() => orderId && void dispatch(removeAllProducts()), [dispatch, orderId]);

  let content;

  if (orderMutation.loading) {
    content = <CircularProgress />;
  } else if (orderMutation.error) {
    const error = orderMutation.error.message;
    content = (
      <Typography variant="h6">
        An unexpected error occured: {error}. Please, try again.
      </Typography>
    );
  } else if (orderMutation.data) {
    const order = orderMutation.data.createOrder;
    content = (
      <Typography variant="h6">
        Order {order.id} was successfully created at{" "}
        {intl.formatTime(order.createdAt)}.
      </Typography>
    );
  } else {
    content = (
      <StyledCheckout>
        <form onSubmit={handleSubmit}>
          <Typography variant="h3">Checkout</Typography>
          <CartContainer />
          <div>
            <StyledTextField
              fullWidth
              required
              label="Name"
              type="name"
              name="name"
              onChange={handlers[0][0]}
              error={touched[0] && !validations[0]}
              value={details.name}
            />
            <StyledTextField
              fullWidth
              required
              label="Phone"
              type="phone"
              name="phone"
              onChange={handlers[1][0]}
              value={details.phone}
              error={touched[1] && !validations[1]}
            />
            <StyledTextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={details.email}
              onChange={handlers[2][0]}
              error={touched[2] && !validations[2]}
            />
          </div>
          <div>
            <StyledTextField
              required
              fullWidth
              label="Address 1"
              multiline
              rowsMax={2}
              name="address1"
              value={details.address1}
              onChange={handlers[3][0]}
              error={touched[3] && !validations[3]}
            />
          </div>
          <div>
            <StyledTextField
              required
              fullWidth
              label="Address 2"
              multiline
              rowsMax={2}
              name="address2"
              value={details.address2}
              onChange={handlers[4][0]}
              error={touched[4] && !validations[4]}
            />
          </div>
          <RadioGroup
            required
            value="cash"
            label="Payment method"
            name="payment"
            value={details.payment}
            onChange={handlers[5][0]}
          >
            <FormControlLabel value="cash" control={<Radio />} label="Cash" />
            <FormControlLabel value="card" control={<Radio />} label="Card" />
          </RadioGroup>
          <div>
            <StyledTextField
              label="Time"
              fullWidth
              type="time"
              name="time"
              onChange={handlers[6][0]}
              error={touched[6] && !validations[6]}
              value={details.time}
            />
          </div>
          <StyledSubmit>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={!total.amount}
            >
              Submit order
            </Button>
          </StyledSubmit>
        </form>
      </StyledCheckout>
    );
  }

  return <PageContainer>{content}</PageContainer>;
}));
