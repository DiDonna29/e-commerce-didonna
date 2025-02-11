"use client";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";

const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

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

  return (
    <div className="bg-black text-white overflow-hidden">
      {" "}
      {/* Eliminado h-screen aquí */}
      {/* Sección de productos */}
      {products.map((product, index) => (
        <section
          key={product.id}
          className="scroll-section relative h-screen flex flex-col md:flex-row snap-start ml-20 mr-20 rounded-md">
          {" "}
          {/* snap-start */}
          {/* Imagen del producto (alternando lados) */}
          <div
            className={`w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden group shine-effect rounded-2xl ${
              index % 2 === 0 ? "order-1" : "order-2"
            }`}>
            <div className="relative w-full h-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/20 transition-opacity duration-500 group-hover:opacity-0"></div>
            </div>
          </div>
          {/* Información del producto */}
          <div
            className={`w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-8 bg-black rounded-2xl ${
              index % 2 === 0 ? "order-2" : "order-1"
            }`}>
            <div className="max-w-lg float-animation">
              <span className="text-neutral-400 tracking-wider text-sm font-mono">
                {index + 1} / {products.length}
              </span>
              <h2 className="mt-4 text-5xl md:text-7xl font-bold leading-none bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                {product.name}
              </h2>
              <p className="mt-6 text-neutral-400 text-lg leading-relaxed">
                {product.description}
              </p>
              <p className="text-lg font-semibold text-white my-3">
                ${product.price}
              </p>
              <button
                onClick={() => addToCart(product)}
                className="bg-white text-black font-bold px-4 py-2 rounded-md mt-4 hover:bg-blue-600 hover:text-white">
                Añadir al carrito
              </button>
              <Link href={`/Product/${product.id}`}>
                <button className="ml-6 mt-4 px-6 bg-gradient-to-b from-blue-950 via-blue-900 to-blue-600  py-3 bg-white/0 hover:bg-blue-500/10 rounded-md text-sm font-medium transition-all duration-300 hover:tracking-wider">
                  Ver detalle de producto →
                </button>
              </Link>
            </div>
          </div>
        </section>
      ))}
      {/* Navegación de secciones */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className="w-3 h-3 rounded-full bg-white/20 hover:bg-white transition-colors hover:scale-150"
            title={`Ir a la sección ${index + 1}`}></button>
        ))}
      </div>
    </div>
  );
}

function scrollToSection(index) {
  const sections = document.querySelectorAll(".scroll-section");
  sections[index].scrollIntoView({ behavior: "smooth" });
}
