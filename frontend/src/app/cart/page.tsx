"use client";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Cart() {
  const { cartItems, removeFromCart, updateCartItem, clearCart } = useCart();
  const { token } = useAuth();
  const [quantities, setQuantities] = useState({});
  const router = useRouter();
  const cartRef = useRef(cartItems);

  useEffect(() => {
    cartRef.current = cartItems;
  }, [cartItems]);

  // Sincronizar el estado global (CartProvider) con el estado local (quantities)
  useEffect(() => {
    Object.entries(quantities).forEach(([id, qty]) => {
      updateCartItem(Number(id), qty);
    });
  }, [quantities]);

  const shippingOptions = [
    { label: "Sencillo (Nacional) - $5.00", value: 5 },
    { label: "Express (Nacional) - $10.00", value: 10 },
    { label: "Express Internacional - $20.00", value: 20 },
  ];

  const [selectedShipping, setSelectedShipping] = useState(
    shippingOptions[0].value
  );

  const safeCartItems = cartRef.current || [];

  const subtotal = safeCartItems.reduce((total, item) => {
    const qty = quantities[item.id] || 1;
    return total + item.price * qty;
  }, 0);

  const taxes = subtotal * 0.1;
  const total = subtotal + taxes + selectedShipping;

  const handleQuantityChange = (id, change) => {
    setQuantities(prev => {
      const currentQty = prev[id] || 1;
      const newQty = Math.max(1, Math.min(5, currentQty + change));
      return { ...prev, [id]: newQty };
    });
  };

  const handleRemoveFromCart = id => {
    removeFromCart(id);
    setQuantities(prev => {
      const newQuantities = { ...prev };
      delete newQuantities[id];
      return newQuantities;
    });
  };

  const handleCreateOrder = async () => {
    const productIds = safeCartItems.map(item => item.id);

    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "No estás autenticado",
        text: "Por favor, inicia sesión para realizar una compra.",
      });
      return;
    }

    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta es una pre-compra de los productos que vas a adquirir.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, realizar compra",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.post(
          "http://localhost:3030/orders",
          {
            products: productIds,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );

        // Limpiar el carrito
        clearCart();

        // Mostrar SweetAlert2 con el GIF y botones
        Swal.fire({
          title: "¡Compra realizada con éxito!",
          text: "Gracias por tu compra. ¿Qué deseas hacer ahora?",
          imageUrl:
            "https://cdn.pixabay.com/animation/2023/03/10/13/25/13-25-13-552_512.gif",
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: "Compra exitosa",
          showCancelButton: true,
          confirmButtonText: "Ver factura",
          cancelButtonText: "Ir al inicio",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then(result => {
          if (result.isConfirmed) {
            router.push(`/dashboard/orders/${response.data.id}`); // Redirigir a la página de la factura
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            router.push("/home"); // Redirigir al inicio
          }
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error al realizar la compra",
          text:
            error.response?.data?.message ||
            "Por favor intenta de nuevo más tarde.",
        });
      }
    }
  };

  return (
    <div className="bg-[#000] min-h-screen py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold text-white mb-4">
          Carrito de compras
        </h1>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-3/4">
            <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 backdrop-blur-md rounded-lg shadow-md p-6 mb-4">
              {safeCartItems.length === 0 ? (
                <p className="text-center text-white">
                  Primero debe adquirir algún producto.
                </p>
              ) : (
                <table className="w-full text-white">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">Producto</th>
                      <th className="text-left font-semibold">Precio</th>
                      <th className="text-left font-semibold">Cantidad</th>
                      <th className="text-left font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {safeCartItems.map(item => {
                      const qty = quantities[item.id] || 1;
                      return (
                        <tr key={item.id}>
                          <td className="py-4">
                            <div className="flex items-center p-4">
                              <Image
                                className="h-20 w-20 mr-20"
                                src={item.image}
                                alt={item.name}
                                width={400}
                                height={200}
                              />
                              <span className="font-semibold">{item.name}</span>
                            </div>
                          </td>
                          <td className="py-4">${item.price.toFixed(2)}</td>
                          <td className="py-4">
                            <div className="flex items-center">
                              <button
                                className="border border-indigo-600 rounded-md py-2 px-4 mr-2 bg-white text-black font-bold hover:bg-red-500"
                                onClick={() =>
                                  handleQuantityChange(item.id, -1)
                                }>
                                -
                              </button>
                              <span className="text-center w-8">{qty}</span>
                              <button
                                className="border border-indigo-600 rounded-md py-2 px-4 ml-2 bg-white text-black font-bold hover:bg-green-500"
                                onClick={() =>
                                  handleQuantityChange(item.id, 1)
                                }>
                                +
                              </button>
                            </div>
                          </td>
                          <td className="py-4">
                            ${(item.price * qty).toFixed(2)}
                          </td>
                          <td className="py-4">
                            <button
                              className="text-red-500 hover:text-red-600"
                              onClick={() => handleRemoveFromCart(item.id)}>
                              <FaTrashAlt />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <div className="md:w-1/3">
            <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 backdrop-blur-md rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Resumen</h2>
              <div className="flex justify-between mb-2">
                <span className="text-white">Base Imponible</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-white">Impuestos</span>
                <span className="text-white">${taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-white">Envío</span>
                <select
                  className="border border-white rounded-md p-1 bg-blue-950 text-white min-w-4"
                  value={selectedShipping}
                  onChange={e => setSelectedShipping(Number(e.target.value))}>
                  {shippingOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <hr className="my-2 border-white" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-white">Total a pagar</span>
                <span className="font-semibold text-white">
                  ${total.toFixed(2)}
                </span>
              </div>
              <button
                className="bg-white text-blue-600 font-bold py-4 px-4 rounded-lg mt-2 w-full hover:bg-black hover:text-white"
                onClick={handleCreateOrder}>
                Realizar compra
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
