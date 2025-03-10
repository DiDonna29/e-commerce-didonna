"use client";
import React, { useEffect, useState } from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import axios from "@/utils/axiosConfig";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";
import Swal from "sweetalert2";

const metadata: Metadata = {
  title: "Tienda de Tecnología",
};

export default function Landing() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [activeSlide, setActiveSlide] = useState(1);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await axios.get("/products");
      const shuffledProducts = shuffleArray(res.data);
      setProducts(shuffledProducts);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  // Llama a la función solo en el cliente
  if (typeof window !== "undefined") {
    fetchProducts();
  }
}, []);

  const shuffleArray = array => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const handleScroll = () => {
      const welcomeSection = document.getElementById("welcome-section");
      const productsSection = document.getElementById("products-section");

      const welcomeBottom = welcomeSection.getBoundingClientRect().bottom;
      const productsTop = productsSection.getBoundingClientRect().top;

      if (welcomeBottom <= 0) {
        setIsAtTop(false);
      } else if (productsTop >= window.innerHeight) {
        setIsAtTop(true);
      }

      setIsScrolling(true);
      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(window.scrollTimeout);
    };
  }, []);

  const handleAddToCart = product => {
    if (isAuthenticated) {
      addToCart(product);
    } else {
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
            text: "serás redirigido para iniciar sesión.",
            icon: "info",
            showConfirmButton: false,
            timer: 1000,
          });
          window.location.href = "/SignIn";
        }
      });
    }
  };

  const scrollToSection = direction => {
    const nextSection =
      direction === "down" ? "products-section" : "welcome-section";
    const section = document.getElementById(nextSection);
    section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-black overflow-hidden">
      {/* Sección 1 */}
      <div
        id="welcome-section"
        className="flex flex-col md:flex-row gap-4 items-center justify-between pt-6 pb-10 md:px-6 px-4 mb-2 h-screen">
        {/* Texto de bienvenida */}
        <div className="md:w-1/3 flex flex-col ml-8">
          <h2 className="text-4xl capitalize font-semibold dark:text-white">
            Explora la Tecnología con Nosotros
          </h2>
          <p className="mt-2 dark:text-gray-400">
            Descubre los últimos productos tecnológicos que mejorarán tu vida
            diaria. Con una amplia variedad de artículos, estamos aquí para
            satisfacer todas tus necesidades tecnológicas.
          </p>
          <Link
            href="/SignIn"
            className="w-fit px-4 py-2 rounded mt-4 font-semibold bg-blue-600 text-white hover:bg-white hover:text-blue-600">
            Aprende Más
          </Link>
        </div>

        {/* Imagen superior */}
        <img
          className="md:w-1/2 w-full h-auto rounded-2xl mr-8"
          src="https://img.freepik.com/premium-photo/online-shopping-icon-smart-phone-global-concept_117856-2469.jpg?w=740"
          alt="Top Image"
        />
      </div>

      {/* Sección 2: Productos destacados */}
      <div
        id="products-section"
        className="container mx-auto px-4 flex flex-col items-center justify-center h-screen">
        <h2 className="text-3xl font-bold text-white-900 mb-8">
          Productos Destacados
        </h2>
        <div className="max-w-4xl mx-auto w-full h-[40vh] relative">
          {/* Slides */}
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`h-full w-full flex items-center bg-black via-black to-blue-950 text-white rounded-lg ${
                activeSlide === index + 1 ? "block" : "hidden"
              }`}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                style={{ objectFit: "contain" }}
                className="rounded-4xl"
              />
            </div>
          ))}

          {/* Prev/Next Arrows */}
          <div className="absolute inset-0 flex">
            <div className="flex items-center justify-start w-1/2">
              <button
                className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-white hover:text-green-500 font-bold hover:shadow-lg rounded-full w-12 h-12 -ml-6"
                onClick={() =>
                  setActiveSlide(
                    activeSlide === 1 ? products.length : activeSlide - 1
                  )
                }>
                &#8592;
              </button>
            </div>
            <div className="flex items-center justify-end w-1/2">
              <button
                className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-white hover:text-green-500 font-bold hover:shadow rounded-full w-12 h-12 -mr-6"
                onClick={() =>
                  setActiveSlide(
                    activeSlide === products.length ? 1 : activeSlide + 1
                  )
                }>
                &#8594;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Botones de navegación */}
      {!isScrolling && (
        <div className="fixed inset-x-0 flex justify-center">
          {isAtTop ? (
            <button
              onClick={() => scrollToSection("down")}
              className="fixed bottom-0 bg-transparent text-white font-bold rounded-full p-6 shadow-lg hover:bg-transparent transition duration-200">
              ↓
            </button>
          ) : (
            <button
              onClick={() => scrollToSection("up")}
              className="fixed top-0 bg-transparent text-white font-bold rounded-full p-6 shadow-lg hover:bg-transparent transition duration-200">
              ↑
            </button>
          )}
        </div>
      )}
    </div>
  );
}
