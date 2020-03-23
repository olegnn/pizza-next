import PageContainer from "../containers/PageContainer";
import { ProductListContainerWithPopper } from "../containers/ProductListContainer";

export default function Drinks() {
  return (
    <PageContainer>
      <ProductListContainerWithPopper category="Drink" />
    </PageContainer>
  );
}
