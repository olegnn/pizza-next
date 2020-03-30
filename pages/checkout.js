import { Button } from "@material-ui/core";
import { RadioGroup } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { Radio } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { Input } from "@material-ui/core";
import { always, path } from "ramda";
import { useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import gql from "graphql-tag";
import { useEffect } from "react";

import PageContainer from "../containers/PageContainer";
import { setDetails } from "../src/actions/details";
import {
  detailsSelector,
  cartTotalSelector,
  cartProductsSelector
} from "../src/selectors";
import { injectIntl } from "react-intl";
import CartContainer from "../containers/CartContainer";
import { removeAllProducts } from "../src/actions/cart";
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

const formMembers = [
  ["name", /^\s*(?:[a-z]+\s?){1,4}$/i],
  ["phone", /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/],
  [
    "email",
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i
  ],
  "address1",
  "address2",
  "payment",
  "time"
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

const initialTouched = Array.from(formMembers, () => false);

const StyledCheckout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default injectIntl(({ intl }) => {
  const details = useSelector(detailsSelector);
  const dispatch = useDispatch();
  const total = useSelector(cartTotalSelector);
  const [createOrder, orderQuery] = useMutation(CREATE_ORDER_MUTATION);
  const [touched, setTouched] = useState(initialTouched);
  const products = useSelector(cartProductsSelector);

  const handlers = useMemo(
    () =>
      formMembers.map((member, index) => {
        let name, validator;
        if (Array.isArray(member)) {
          name = member[0];
          validator = value => member[1].test(value);
        } else {
          name = member;
          validator = always(true);
        }
        return [
          event =>
            setTouched(touched.map((v, i) => v || i === index)) ||
            void dispatch(setDetails(name, event.target.value)),
          validator
        ];
      }),
    touched
  );

  const validations = [];

  const handleSubmit = useCallback(event => {
    event.preventDefault();
    setTouched(Array.from(initialTouched, () => true));
    if (true) {
      createOrder({
        variables: {
          name: details.name,
          products: details.products,
          email: details.email,
          phone: details.phone,
          time: details.time,
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
  });

  const orderId = path(["data", "createOrder", "id"], orderQuery);
  useEffect(() => orderId && void dispatch(removeAllProducts()), [orderId]);

  let content;

  if (orderQuery.loading) {
    content = <CircularProgress />;
  } else if (orderQuery.data) {
    const order = orderQuery.data.createOrder;
    content = (
      <Typography variant="h6">
        Order {order.id} is successfully created at{" "}
        {intl.formatTime(order.createdAt)}.
      </Typography>
    );
  } else {
    content = (
      <StyledCheckout>
        <form onSubmit={handleSubmit}>
          <Typography variant="h3"> Checkout </Typography>
          <CartContainer hideActions />
          <div>
            <StyledTextField
              fullWidth
              required
              label="Name"
              type="name"
              name="name"
              onChange={handlers[0][0]}
              error={touched[0] && !handlers[0][1](details.name)}
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
              error={touched[1] && !handlers[1][1](details.phone)}
            />
            <StyledTextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={details.email}
              onChange={handlers[2][0]}
              error={touched[2] && !handlers[2][1](details.email)}
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
              error={touched[3] && !handlers[3][1](details.address1)}
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
              error={touched[4] && !handlers[4][1](details.address2)}
            />
          </div>
          <RadioGroup
            required
            value="cash"
            label="Payment method"
            name="payment"
            value={details.payment}
            onChange={handlers[5][0]}
            error={touched[5] && !handlers[5][1](details.payment)}
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
              error={touched[6] && !handlers[6][1](details.time)}
            />
          </div>
          <Button type="submit" color="primary" disabled={!total.amount}>
            Submit order
          </Button>
        </form>
      </StyledCheckout>
    );
  }

  return <PageContainer>{content}</PageContainer>;
});