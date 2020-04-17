import { Typography } from '@material-ui/core';

import PageContainer from '../containers/PageContainer';
import ProductListContainer from '../containers/ProductListContainer';
import withApollo from '../hocs/withApollo';

export default withApollo(function Pizza() {
  return (
    <PageContainer>
      <Typography variant="h3">Pizza</Typography>
      <ProductListContainer category="Pizza" />
    </PageContainer>
  );
});
