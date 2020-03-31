import {
  Typography
} from "@material-ui/core";
import styled from "styled-components";

import PageContainer from "../containers/PageContainer";
import ProductListContainer from "../containers/ProductListContainer";
import ToppingsListContainer from "../containers/ToppingListContainer";
import withApollo from '../hocs/withApollo';

export default withApollo(function Pizza() {
  return (
    <PageContainer>
      <Typography variant="h3">Pizza</Typography>
      <ProductListContainer category="Pizza" />
    </PageContainer>
  );
});
