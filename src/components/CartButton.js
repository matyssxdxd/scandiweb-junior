import useLocalStorageState from "use-local-storage-state";
import CartIcon from "./CartIcon";

export default function CartButton({ handleCartClick }) {
  const [cart] = useLocalStorageState("cart");

  return (
    <button onClick={handleCartClick}>
      <CartIcon />
      <div
        className={
          "h-5 w-5 inline-flex absolute -right-3 -top-2 bg-black rounded-full items-center justify-center"
        }
      >
        <span className="--font-roboto text-white text-sm font-bold place-self-center">
          {cart.length}
        </span>
      </div>
    </button>
  );
}
