import { useQuery } from "@apollo/client";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { CATEGORY_QUERIES } from "../components/CategoryQueries";
import useLocalStorageState from "use-local-storage-state";
import { useState } from "react";
import Loading from "../components/Loading";

export default function CategoryPage({ category }) {
  const QUERY = CATEGORY_QUERIES[category];

  const { data, loading, error } = useQuery(QUERY);
  let products;
  if (data) {
    products = data.productsByCategory;
    console.log(products);
  }

  const [cart, setCart] = useLocalStorageState("cart", []);
  const [isCartHidden, setIsCartHidden] = useState(true);

  function handleCartClick() {
    setIsCartHidden(!isCartHidden);
    console.log(products);
  }

  function handleAddToCart(event, product) {
    event.preventDefault();

    const existingProductIndex = cart.findIndex(
      (item) =>
        item.id === product.id &&
        JSON.stringify(item.selectedAttributes) ===
          JSON.stringify(
            product.attributes.map((attribute) => ({
              id: attribute.id,
              value: attribute.items[0].id,
            }))
          )
    );

    setCart((prevCart) => {
      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].count += 1;
        return updatedCart;
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            attributes: product.attributes,
            selectedAttributes: product.attributes.map((attribute) => ({
              id: attribute.id,
              value: attribute.items[0].id,
            })),
            prices: product.prices,
            picture: product.gallery[0].image_url,
            count: 1,
          },
        ];
      }
    });
  }

  return (
    <>
      <Navbar handleCartClick={handleCartClick} isCartHidden={isCartHidden} />
      <div className="bg-white flex justify-center h-auto pt-5">
        {!isCartHidden && (
          <button
            onClick={() => !isCartHidden && setIsCartHidden(true)}
            className="fixed bg-black opacity-75 h-full w-full z-10"
          ></button>
        )}
        <div className="container relative">
          <h2 className="--font-raleway text-5xl font-normal mt-40 mb-40">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20 place-items-center mb-60">
            {loading ? (
              <Loading />
            ) : data ? (
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.name}
                  price={`${product.prices[0].currency.symbol} ${product.prices[0].amount}`}
                  imageUrl={product.gallery[0].image_url}
                  outOfStock={!product.in_stock}
                  product={product}
                  handleClick={handleAddToCart}
                />
              ))
            ) : error ? (
              <p>{error.message}</p>
            ) : (
              <p>No data</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
