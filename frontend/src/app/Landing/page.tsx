"use client";
import { useEffect, useState } from "react";
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
            text: "serás redirigido para iniciar sesion.",
            icon: "info",
            showConfirmButton: false,
            timer: 1000,
          });
          window.location.href = "/SignIn"; // Redirigir a la página de inicio de sesión
        }
        // Si se cancela, simplemente se cierra el alert
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-black">
      <div className="flex flex-col gap-4 items-center justify-center pt-6 pb-10 md:px-6 px-4">
        {/* Imagen superior */}
        <img
          className="w-full h-[60vh] rounded"
          src="https://img.freepik.com/premium-psd/horizontal-website-banne_451189-113.jpg?w=826"
          alt="Top Image"
        />

        {/* Texto de bienvenida */}
        <div className="w-full flex gap-2 items-center justify-between">
          <div className="ld:w-1/3 flex flex-col">
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
              className="w-fit px-4 py-2 rounded mt-4 font-semibold bg-green-600 text-white">
              Aprende Más
            </Link>
          </div>

          {/* Imagen adicional */}
          <img
            className="lg:block hidden w-[16rem] h-[18rem] border-[12px] border-gray-300 dark:border-gray-950"
            src="https://img.freepik.com/free-vector/abstract-landing-pages-with-technology-devices_23-2148126250.jpg?t=st=1739155187~exp=1739158787~hmac=26a919dd3ea1a8cad9b334e80aafb4ccd67a86ef0efdd34884f5948f5a19fbc4&w=740"
            alt="image"
          />
        </div>
      </div>

      {/* Sección de productos destacados */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Productos Destacados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-700 text-base">
                    {product.description}
                  </p>
                  <p className="text-lg font-semibold text-black my-3">
                    ${product.price}
                  </p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-indigo-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-indigo-600">
                    Añadir al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
