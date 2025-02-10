"use client";

import { lusitana } from "@/app/ui/fonts";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const metadata: Metadata = {
  title: "Products",
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart(); // Obtener addToCart
  const { token } = useAuth(); // Obtener token del contexto

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/products`
        );
        setProducts(res.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = product => {
    if (!token) {
      Swal.fire({
        title: "Necesitas iniciar sesión",
        text: "¿Deseas ir a iniciar sesión o seguir viendo productos?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Iniciar sesión",
        cancelButtonText: "Seguir viendo productos",
      }).then(result => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Vamos a conectarnos!",
            text: "serás redirigido para iniciar sesion.",
            icon: "info",
            showConfirmButton: false,
            timer: 1000,
          });
          window.location.href = "/SignIn"; // Redirigir a la página de inicio de sesión
        }
        // Si se cancela, simplemente se cierra el alert
      });
      return;
    }

    if (token) {
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
          addToCart(product); // Añadir al carrito sin redirigir
        }
      });
    }
  };

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="text-center p-10">
        <h1 className="font-bold text-4xl mb-4">Explora Nuestros Productos</h1>
        <h2 className="text-3xl">Lo Mejor en Tecnología</h2>
      </div>

      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center gap-y-20 gap-x-14 mt-10 mb-5">
        {products.map(product => (
          <div
            className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            key={product.id}>
            <Link href={`/Product/${product.id}`}>
              <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="object-cover h-full w-full"
                  width={500}
                  height={300}
                />
                <span className="absolute top-0 left-0 m-2 rounded-full bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 px-2 text-center text-sm font-medium text-white">
                  39% OFF
                </span>
              </div>
            </Link>
            <div className="mt-4 px-5 pb-5 flex flex-col justify-between h-full">
              <Link href={`/Product/${product.id}`}>
                <h5 className="text-xl tracking-tight text-white">
                  {product.name}
                </h5>
              </Link>
              <div className="mt-2 mb-5 flex items-center justify-between">
                <p>
                  <span className="text-3xl font-bold text-white">
                    ${product.price}
                  </span>
                </p>
                <div className="flex items-center">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <span className="mr-2 ml-3 rounded bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 px-2.5 py-0.5 text-xs font-semibold">
                    5.0
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-auto flex items-center justify-center rounded-md bg-black px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Añadir al carrito
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
