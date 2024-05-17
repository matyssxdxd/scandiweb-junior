import { useMutation } from "@apollo/client";
import useLocalStorageState from "use-local-storage-state";
import { PLACE_ORDER_MUTATION } from "./PlaceOrder";
import CartProductCard from "./CartProductCard";

export default function Cart() {
  const [cart, setCart] = useLocalStorageState("cart");

  const [placeOrder] = useMutation(PLACE_ORDER_MUTATION);

  function handlePlaceOrder() {
    const cartItems = cart.map((item) => ({
      id: item.id,
      count: item.count,
      attributes: item.selectedAttributes.map((attribute) => ({
        attribute_id: attribute.value,
        attribute_set_id: attribute.id,
      })),
    }));

    placeOrder({
      variables: {
        order: cartItems,
      },
    }).then(() => {
      setCart([]);
    });
  }

  return (
    <div
      className="absolute bg-white z-20 right-0 top-20 p-4 overflow-y-auto"
      style={{ width: "325px", maxHeight: "calc(100vh - 120px)" }}
    >
      <h2 className="--font-raleway font-bold text-base mb-8">
        My Bag,{" "}
        <span className="font-medium">
          {cart.length} {cart.length === 1 ? "item" : "items"}
        </span>
      </h2>
      {cart.map((item, index) => (
        <CartProductCard key={item.id} item={item} index={index} />
      ))}
      <div className="flex justify-between mb-8">
        <p>Total</p>
        <p>
          $
          {cart.reduce((total, item) => {
            return total + item.prices[0].amount * item.count;
          }, 0)}
        </p>
      </div>
      <button
        onClick={handlePlaceOrder}
        className={`--font-raleway w-full leading-5 mb-8 py-3 px-4 text-sm font-semibold ${
          cart.length === 0
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-green-400 text-white"
        }`}
        disabled={cart.length === 0}
      >
        PLACE ORDER
      </button>
    </div>
  );
}
