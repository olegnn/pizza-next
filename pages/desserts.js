import PageContainer from "../containers/PageContainer";
import ProductListContainer from "../containers/ProductListContainer";
import { Typography } from "@material-ui/core";

export default function Desserts() {
  return (
    <PageContainer>
      <Typography variant="h3">Desserts</Typography>
      <ProductListContainer category="Dessert" />
    </PageContainer>
  );
}
