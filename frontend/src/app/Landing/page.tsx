"use client";
import React, { useEffect, useState } from "react"; // Asegúrate de importar React
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import axios from "@/utils/axiosConfig";
import { useCart } from "@/app/context/CartContext"; // Importar el contexto del carrito
import { useAuth } from "@/app/context/AuthContext"; // Importar el contexto de autenticación
import Swal from "sweetalert2";

const metadata: Metadata = {
  title: "Tienda de Tecnología",
};

export default function Landing() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth(); // Obtener el estado de autenticación
  const [activeSlide, setActiveSlide] = useState(1);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false); // Estado para controlar la visibilidad de los botones

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const welcomeSection = document.getElementById("welcome-section");
      const productsSection = document.getElementById("products-section");

      const welcomeBottom = welcomeSection.getBoundingClientRect().bottom;
      const productsTop = productsSection.getBoundingClientRect().top;

      // Verificar si estamos en la parte superior o inferior
      if (welcomeBottom <= 0) {
        setIsAtTop(false); // Estamos en la sección de productos
      } else if (productsTop >= window.innerHeight) {
        setIsAtTop(true); // Estamos en la sección de bienvenida
      }

      // Detectar si el usuario está scrolleando
      setIsScrolling(true);
      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(() => {
        setIsScrolling(false); // Ocultar botones después de dejar de scrollear
      }, 150); // Tiempo de espera para ocultar los botones
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(window.scrollTimeout); // Limpiar el timeout al desmontar
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
          window.location.href = "/SignIn"; // Redirigir a la página de inicio de sesión
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
        <div className="max-w-4xl mx-auto w-full h-[60vh] relative">
          {/* Slides */}
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`h-full w-full flex items-center bg-black text-white rounded-lg ${
                activeSlide === index + 1 ? "block" : "hidden"
              }`}>
              <Image
                src={product.image}
                alt={product.name}
                layout="fill" // Asegura que la imagen llene el contenedor
                objectFit="contain" // Mantiene la proporción de la imagen
                className="rounded-3xl"
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

          {/* Buttons */}
          {/* <div className="absolute w-full flex items-center justify-center px-4">
            {products.map((product, index) => (
              <button
                key={product.id}
                className={`flex-1 w-4 h-2 mt-4 mx-2 mb-0 rounded-full overflow-hidden transition-colors duration-200 ease-out hover:bg-teal-600 hover:shadow-lg ${
                  activeSlide === index + 1 ? "bg-indigo-600" : "bg-blue-300"
                }`}
                onClick={() => setActiveSlide(index + 1)}></button>
            ))}
          </div> */}
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
