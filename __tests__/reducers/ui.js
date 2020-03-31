import uiReducer from "../../app/reducers/ui";
import { toggleDrawer, DRAWERS } from "../../app/actions/ui";
import { UI } from "../../app/types";
import { selectProduct } from "../../app/actions/ui";

describe("ui reducer tests", () => {
  const initialState = uiReducer(void 0, {});

  it("checks initial state", () => expect(initialState).toEqual(UI()));

  it("toggles left drawer", () => {
    const toggled = uiReducer(initialState, toggleDrawer(DRAWERS.LEFT));
    expect(toggled.leftDrawerOpen).toBe(true);
    expect(uiReducer(toggled, toggleDrawer(DRAWERS.LEFT)).leftDrawerOpen).toBe(
      false
    );
  });

  it("toggles right drawer", () => {
    const toggled = uiReducer(initialState, toggleDrawer(DRAWERS.RIGHT));
    expect(toggled.rightDrawerOpen).toBe(true);
    expect(uiReducer(toggled, toggleDrawer(DRAWERS.RIGHT)).leftDrawerOpen).toBe(
      false
    );
  });

  it("selects product", () => {
    expect(uiReducer(initialState, selectProduct(25)).selectedElement).toBe(25);
  });
});
