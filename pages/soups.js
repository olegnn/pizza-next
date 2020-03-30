import PageContainer from "../containers/PageContainer";
import { ProductListContainerWithPopper } from "../containers/ProductListContainer";
import { Typography } from "@material-ui/core";

export default function Soups() {
  return (
    <PageContainer>
      <Typography variant="h3"> Soups </Typography>
      <ProductListContainerWithPopper category="Soup" />
    </PageContainer>
  );
}
