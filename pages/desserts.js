import PageContainer from "../containers/PageContainer";
import { ProductListContainerWithPopper } from "../containers/ProductListContainer";
import { Typography } from "@material-ui/core";

export default function Desserts() {
  return (
    <PageContainer>
      <Typography variant="h3"> Desserts </Typography>
      <ProductListContainerWithPopper category="Dessert" />
    </PageContainer>
  );
}
