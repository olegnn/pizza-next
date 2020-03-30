const ICONS_BY_CAREGORY = {
  Pizza: "/icons/icons8-pizza-96.png",
  Drink: "/icons/icons8-soda-bottle-96.png",
  Soup: "/icons/icons8-soup-plate-96.png",
  Dessert: "/icons/icons8-pancake-96.png"
};

export function ProductIcon({ category, ...props }) {
  return <img src={ICONS_BY_CAREGORY[category]} {...props} />;
}
