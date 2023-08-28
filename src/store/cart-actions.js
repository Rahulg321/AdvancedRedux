import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

// a func that returns another function
// which in return gets executed at a later stage
// redux toolkit will automatically execute that returned function
// the dispatch arguement is already given by redux

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "sending data.....",
        message: "data is being sent",
      })
    );
    

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-cb681-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("something went wrong");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "sent data.....",
          message: "data has been successfully sent",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Send Cart Error",
          message: error.message || "could not send cart data",
        })
      );
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-cb681-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch data");
      }
      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();

      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "recieved cart data",
          message: "successfully recieved/replaced cart data",
        })
      );
    } catch (e) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Fetch Cart Error..",
          message: e.message || "could not fetch cart data",
        })
      );
    }
  };
};
