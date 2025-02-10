"use client";

import { Metadata } from "next";
import Image from "next/image";
import { useCart } from "../../context/CartContext";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const metadata: Metadata = {
  title: "Product Details",
};

export default function ProductDetails({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`http://localhost:3030/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    Swal.fire({
      title: "¿Deseas agregar este producto al carrito?",
      text: "Puedes seguir explorando otros productos.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, agregar",
      cancelButtonText: "Cancelar",
    }).then(result => {
      if (result.isConfirmed) {
        addToCart(product);
      }
    });
  };

  if (!product) {
    return <div>Cargando producto...</div>;
  }

  return (
    <div className="bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-8">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-md mb-4"
              id="mainImage"
            />
            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              {product.additionalImages?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                />
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">SKU: {product.sku}</p>
            <div className="mb-4">
              <span className="text-2xl font-bold mr-2">${product.price}</span>
              <span className="text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            </div>
            <div className="flex items-center mb-4">
              <span className="text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Color:</h3>
              <div className="flex space-x-2">
                {product.colors?.map((color, index) => (
                  <button
                    key={index}
                    className="w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2"
                    style={{ backgroundColor: color }}></button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                defaultValue="1"
                className="w-12 text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            <div className="flex space-x-4 mb-6">
              <button
                onClick={handleAddToCart}
                className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Add to Cart
              </button>
              <button className="bg-gray-200 flex gap-2 items-center text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                Wishlist
              </button>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
              <ul className="list-disc list-inside text-gray-700">
                {product.features?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
