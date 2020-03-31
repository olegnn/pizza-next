import PageContainer from "../containers/PageContainer";
import ProductListContainer from "../containers/ProductListContainer";
import { Typography } from "@material-ui/core";

export default function Drinks() {
  return (
    <PageContainer>
      <Typography variant="h3">Drinks</Typography>
      <ProductListContainer category="Drink" />
    </PageContainer>
  );
}
