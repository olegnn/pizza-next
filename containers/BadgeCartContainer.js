import { useSelector } from 'react-redux';
import { Badge } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { productInCartCountSelector } from '../app/selectors';

export default function BadgeCartContainer({ onClick }) {
  const amount = useSelector(productInCartCountSelector);

  return (
    <Badge badgeContent={amount} color="secondary">
      <ShoppingCartIcon onClick={onClick} />
    </Badge>
  );
}
