import { formatPrice } from "../app/formatters";

describe("forrmatters tests", () => {
  it("tests `formatPrice` behaviour", () => {
    expect(
      formatPrice(
        { formatNumber: num => String(num) },
        { currency: "USD", amount: 100 }
      )
    ).toBe("1");
    expect(
      formatPrice({ formatNumber: num => String(num) }, { currency: "USD", amount: 0 })
    ).toBe("0");
  });
});
