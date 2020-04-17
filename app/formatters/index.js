export const formatPrice = ({ formatNumber }, { currency, amount }) =>
  formatNumber(amount / 100, { style: 'currency', currency });
