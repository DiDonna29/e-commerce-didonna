"use client";

import { Metadata } from "next";
import Image from "next/image"; // Importar el componente Image
import { useCart } from "../../context/CartContext";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const metadata: Metadata = {
  title: "Product Details",
};

export default function ProductDetails({ params }) {
  const { id } = React.use(params); // Desenvuelve params directamente
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
            <Image
              src={product.image}
              alt={product.name}
              className="f-full h-auto rounded-lg shadow-md mb-4 object-contain"
              width={400} // Especifica el ancho
              height={200} // Especifica la altura
              id="mainImage"
            />
            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              {product.additionalImages?.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                  width={100}
                  height={100}
                />
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/2 px-4 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
            <div className="mb-4">
              <span className="text-2xl font-bold mr-2">${product.price}</span>
            </div>
            <p className="text-neutral-200 mb-6">{product.description}</p>
            <div className="flex space-x-4 mb-6">
              <button
                onClick={handleAddToCart}
                className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Add to Cart
              </button>
              <button className="bg-gray-200 flex gap-2 items-center text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                Añadir a Favorito ❤️
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
