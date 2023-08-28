import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { sendCartData, fetchCartData } from "./store/cart-actions";

import Notification from "./components/UI/Notification/Notification";

let initialLoadingState = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.showCart);

  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  // sending a PUT request will overwrite the existing data
  // PATCH will edit the data

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    // this make sures that use effect does not run during the initial render
    if (initialLoadingState) {
      initialLoadingState = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
