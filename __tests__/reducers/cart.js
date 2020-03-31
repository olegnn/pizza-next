import cartReducer from '../../app/reducers/cart';
import {
  setCurrency,
  addProduct,
  removeProduct,
} from "../../app/actions/cart";
import { setProductTopping } from '../../app/actions/overlay'
import { Map, OrderedMap } from 'immutable';
import { calcProductPrice } from '../../app/selectors/product';

describe('cart reducer tests', () => {
    const initialState = cartReducer(void 0, {});

    it('should set currency', () => {
        expect(initialState.currency).toBe('USD');
        expect(cartReducer({ currency: 'USD' }, setCurrency('EUR')).currency).toBe('EUR');
    });

    it('should add and remove product', () => {
        expect(initialState.products).toBe(new OrderedMap);
        const withProduct = cartReducer(initialState, addProduct({ id: 'p0', toppings: new Map({ 0: 1 }) }, 10, [{ seqId: 0, prices: [{ currency: 'USD', amount: 500 }]}]));
        expect(withProduct.products.size).toBe(1);
        expect(
          cartReducer(
            withProduct,
            removeProduct([...withProduct.products.keys()][0])
          ).products.size
        ).toBe(0);
    });

    it('should set prices and calculate product price', () => {
        const withTopping = cartReducer(initialState, setProductTopping('p0', 't0', 10, [{ currency: 'USD', amount: 100 }]));
        const withProduct = cartReducer(
          withTopping,
          addProduct(
            { id: "p0", quantity: 10, toppings: new Map({ t0: 10 }) },
            10,
            [{ seqId: 0, prices: [{ currency: "USD", amount: 500 }] }]
          )
        );
        
        expect(withProduct.prices.size).toBe(2);
        expect(
          calcProductPrice(
            [...withProduct.products.values()][0],
            withProduct.prices,
            "USD"
          )
        ).toEqual(6000);
        
    });
});