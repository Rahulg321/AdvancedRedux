import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "./store/ui-slice";

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
    dispatch( 
      uiActions.showNotification({
        status: "pending",
        title: "sending data.....",
        message: "data is being sent",
      })
    );

    async function saveCart() {
      const response = await fetch(
        "https://react-http-cb681-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("something went wrong");
      }
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "sent data.....",
          message: "data has been successfully sent",
        })
      );
    }

    if (initialLoadingState) {
      initialLoadingState = false;
      return;
    }

    saveCart().catch((e) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Errorrrrrrr.....",
          message: e.message,
        })
      );
    });
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
