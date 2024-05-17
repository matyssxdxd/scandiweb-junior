import Logo from "./Logo";
import NavButton from "./NavButton";
import Cart from "./Cart";
import CartButton from "./CartButton";

export default function Navbar({ handleCartClick, isCartHidden }) {
  return (
    <div className="fixed bg-white w-full flex justify-center h-20 z-20">
      <div className="grid grid-cols-3 col-auto items-center container relative">
        <div className="flex h-full justify-self-start">
          <NavButton
            className="--font-raleway text-base font-normal"
            url="/"
            text="ALL"
          />
          <NavButton
            className="--font-raleway text-base font-normal"
            url="/clothes"
            text="CLOTHES"
          />
          <NavButton
            className="--font-raleway text-base font-normal"
            url="/tech"
            text="TECH"
          />
        </div>
        <div className="justify-self-center">
          <Logo />
        </div>
        <div className="justify-self-end relative">
          <CartButton handleCartClick={handleCartClick} />
        </div>
        {!isCartHidden && <Cart />}
      </div>
    </div>
  );
}
