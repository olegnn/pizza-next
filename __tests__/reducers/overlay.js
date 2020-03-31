import overlayReducer from "../../app/reducers/overlay";
import { setProductTopping } from "../../app/actions/overlay";
import { Map } from "immutable";
import { removeAllProductToppings } from "../../app/actions/overlay";
import { ProductConfiguration } from "../../app/types";

describe("overlay reducer", () => {
  const initialState = overlayReducer(void 0, {});
  const withProductTopping = overlayReducer(
    initialState,
    setProductTopping("p0", "t0", 10, [{ currency: "USD", amount: 100 }])
  );

  it("sets topping", () => {
    expect(withProductTopping).toEqual(
      Map({ p0: ProductConfiguration({ toppings: Map({ t0: 10 }) }) })
    );
  });

  it("resets toppings", () => {
    expect(
      overlayReducer(withProductTopping, removeAllProductToppings("p0")).get(
        "p0"
      ).toppings.size
    ).toBe(0);
  });
});
