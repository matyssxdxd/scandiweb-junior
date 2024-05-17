import useLocalStorageState from "use-local-storage-state";

export default function CartProductCard({ item, index }) {
  const [cart, setCart] = useLocalStorageState("cart");

  function increaseItemCount(index) {
    const updatedCart = [...cart];
    updatedCart[index].count += 1;
    setCart(updatedCart);
  }

  function decreaseItemCount(index) {
    const updatedCart = [...cart];
    if (updatedCart[index].count === 1) {
      updatedCart.splice(index, 1);
    } else {
      updatedCart[index].count -= 1;
    }
    setCart(updatedCart);
  }

  return (
    <div key={index} className="grid grid-cols-7 mb-10 gap-1">
      <div className="col-span-4">
        <p className="--font-raleway font-light text-lg">{item.name}</p>
        <p className="--font-raleway font-normal text-base">
          {item.prices[0].currency.symbol}
          {item.prices[0].amount}
        </p>
        {item.attributes.map((attributeSet) => (
          <div key={attributeSet.id}>
            <p className="--font-raleway font-normal text-sm mb-2">
              {attributeSet.name}:
            </p>
            <div className="flex gap-2 mb-2">
              {attributeSet.items.map((attribute) =>
                item.selectedAttributes.some(
                  (selectedAttr) =>
                    selectedAttr.id === attributeSet.id &&
                    selectedAttr.value === attribute.displayValue
                ) ? (
                  attributeSet.type === "swatch" ? (
                    <div
                      className="h-5 w-5 border border-green-400"
                      style={{
                        backgroundColor: attribute.value,
                        boxShadow: "0 0 0 1px white inset",
                      }}
                    ></div>
                  ) : (
                    <div className="p-1 text-center --font-source-sans-3 border-black border bg-black text-white text-xs">
                      {attribute.value}
                    </div>
                  )
                ) : attributeSet.type === "swatch" ? (
                  <div
                    className="h-5 w-5 border border-white"
                    style={{
                      backgroundColor: attribute.value,
                      boxShadow: "0 0 0 1px white inset",
                    }}
                  ></div>
                ) : (
                  <div className="p-1 text-center --font-source-sans-3 border-black border text-xs">
                    {attribute.value}
                  </div>
                )
              )}
            </div>
          </div>
        ))}
        <div></div>
      </div>
      <div className="col-span-1">
        <div className="flex flex-col justify-between items-center h-full">
          <button
            onClick={() => increaseItemCount(index)}
            className="w-6 h-6 text-center --font-source-sans-3 border-black border text-xs"
          >
            +
          </button>
          <p>{item.count}</p>
          <button
            onClick={() => decreaseItemCount(index)}
            className="w-6 h-6 text-center --font-source-sans-3 border-black border text-xs"
          >
            -
          </button>
        </div>
      </div>
      <img
        className="p col-span-2 h-full w-full object-cover"
        src={item.picture}
        alt="product-img"
      ></img>
    </div>
  );
}
