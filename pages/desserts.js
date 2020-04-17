import { Typography } from '@material-ui/core';
import PageContainer from '../containers/PageContainer';
import ProductListContainer from '../containers/ProductListContainer';
import withApollo from '../hocs/withApollo';

export default withApollo(function Desserts() {
  return (
    <PageContainer>
      <Typography variant="h3">Desserts</Typography>
      <ProductListContainer category="Dessert" />
    </PageContainer>
  );
});
