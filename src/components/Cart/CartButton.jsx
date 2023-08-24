import classes from "./CartButton.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { uiActions } from "../../store/ui-slice";

const CartButton = (props) => {
  const dispatch = useDispatch();

  const totalQuantity = useSelector((state) => {
    return state.cart.totalQuantity;
  });

  const toggleCartHandler = () => {
    console.log("show cart button clicked");
    dispatch(uiActions.toggleCart());
  };

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
