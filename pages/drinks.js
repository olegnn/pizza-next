import PageContainer from "../containers/PageContainer";
import { ProductListContainerWithPopper } from "../containers/ProductListContainer";
import { Typography } from "@material-ui/core";

export default function Drinks() {
  return (
    <PageContainer>
      <Typography variant="h3"> Drinks </Typography>
      <ProductListContainerWithPopper category="Drink" />
    </PageContainer>
  );
}
