import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux/es/hooks/useSelector";

const Cart = (props) => {
   const cartItems = useSelector((state) => {
    return state.cart.items;
  });

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => {
          return (
            <CartItem
              key={item.id}
              title={item.title}
              price={item.price}
              id={item.id}
              quantity={item.quantity}
              total={item.totalPrice}
            />
          );
        })}
      </ul>
    </Card>
  );
};

export default Cart;
