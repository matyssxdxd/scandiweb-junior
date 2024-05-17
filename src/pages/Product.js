import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { gql, useQuery } from "@apollo/client";
import parse from "html-react-parser";
import Slider from "../components/Slider";
import useLocalStorageState from "use-local-storage-state";

export default function Product() {
  let { productId } = useParams();

  const PRODUCT_QUERY = gql`
    query {
      productById(id: "${productId}") {
        id
        name
        in_stock
        description
        gallery {
          image_url
        }
        prices {
          amount
          currency {
            label
            symbol
          }
        }
        attributes {
          id
          items {
            displayValue
            value
            id
          }
          name
          type
        }
      }
    }
  `;

  const { data, loading, error } = useQuery(PRODUCT_QUERY);
  const [cart, setCart] = useLocalStorageState("cart", []);
  const [isCartHidden, setIsCartHidden] = useState(true);
  const [selectedAttributes, setSelectedAttributes] = useState([]);

  let product;

  if (data) {
    product = data.productById;
  }

  function handleCartClick() {
    setIsCartHidden(!isCartHidden);
  }

  function handleAddToCart(event, product) {
    event.preventDefault();

    const existingProductIndex = cart.findIndex(
      (item) =>
        item.id === product.id &&
        JSON.stringify(item.selectedAttributes) ===
          JSON.stringify(
            selectedAttributes.map((attribute) => ({
              id: attribute.id,
              value: attribute.value,
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
            selectedAttributes: selectedAttributes,
            prices: product.prices,
            picture: product.gallery[0].image_url,
            count: 1,
          },
        ];
      }
    });

    setIsCartHidden(false);
  }

  function handleAttributeClick(attributeSetId, attributeId) {
    setSelectedAttributes((prevSelectedAttributes) => {
      const existingAttributeSetIndex = prevSelectedAttributes.findIndex(
        (attr) => attr.id === attributeSetId
      );

      if (existingAttributeSetIndex !== -1) {
        const updatedAttributes = [...prevSelectedAttributes];
        updatedAttributes[existingAttributeSetIndex] = {
          ...updatedAttributes[existingAttributeSetIndex],
          value: attributeId,
        };
        return updatedAttributes;
      } else {
        return [
          ...prevSelectedAttributes,
          {
            id: attributeSetId,
            value: attributeId,
          },
        ];
      }
    });
  }

  return (
    <>
      <Navbar handleCartClick={handleCartClick} isCartHidden={isCartHidden} />
      <div className="bg-white flex justify-center h-auto">
        {!isCartHidden && (
          <button
            onClick={() => !isCartHidden && setIsCartHidden(true)}
            className="fixed bg-black opacity-75 h-full w-full z-10"
          ></button>
        )}
        <div className="container relative pt-28">
          {loading ? (
            <p>Loading</p>
          ) : data ? (
            <div className="grid grid-cols-5 mt-16">
              <div className="col-span-3">
                <Slider gallery={product.gallery} />
              </div>
              <div className="col-span-2">
                <h1 className="--font-raleway text-3xl font-semibold mb-8">
                  {product.name}
                </h1>
                {product.attributes.map((attributeSet) => (
                  <div key={attributeSet.id}>
                    <h2 className="--font-roboto-condensed text-lg font-bold">
                      {attributeSet.name.toUpperCase()}:
                    </h2>
                    <div className="flex gap-1">
                      {attributeSet.items.map((attribute, index) =>
                        attributeSet.type === "swatch" ? (
                          <button
                            onClick={() =>
                              handleAttributeClick(
                                attributeSet.id,
                                attribute.id
                              )
                            }
                            className={`border text-base font-normal ${
                              selectedAttributes.find(
                                (attr) =>
                                  attr.id === attributeSet.id &&
                                  attr.value === attribute.id
                              )
                                ? "border-green-400"
                                : "border-white"
                            }`}
                            key={attribute.id}
                            style={{
                              height: "36px",
                              width: "36px",
                              backgroundColor: attribute.value,
                              boxShadow: "0 0 0 1px white inset",
                            }}
                          />
                        ) : (
                          <button
                            onClick={() =>
                              handleAttributeClick(
                                attributeSet.id,
                                attribute.id
                              )
                            }
                            className={`border border-black text-base font-normal font-sans ${
                              selectedAttributes.find(
                                (attr) =>
                                  attr.id === attributeSet.id &&
                                  attr.value === attribute.id
                              )
                                ? "bg-black text-white"
                                : "bg-white text-black"
                            }`}
                            key={index}
                            style={{ height: "45px", width: "63px" }}
                          >
                            {attribute.value}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                ))}
                <h2 className="--font-roboto-condensed text-lg font-bold">
                  PRICE:
                </h2>
                <p className="--font-raleway text-2xl font-bold mb-8">{`${product.prices[0].currency.symbol} ${product.prices[0].amount}`}</p>
                <button
                  onClick={(event) => handleAddToCart(event, product)}
                  disabled={!product.in_stock || selectedAttributes.length !== product.attributes.length}
                  className={`--font-raleway leading-5 mb-8 py-4 px-8  text-base font-semibold ${
                    !product.in_stock || selectedAttributes.length !== product.attributes.length
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-green-400 text-white"
                  }`}
                  style={{ width: "292px" }}
                >
                  ADD TO CART
                </button>
                <div className="--font-roboto font-normal text-base">
                  {parse(product.description)}
                </div>
              </div>
            </div>
          ) : error ? (
            <p>{error.message}</p>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </>
  );
}
