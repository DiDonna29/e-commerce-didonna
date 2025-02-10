"use client";

import { useCart } from "../context/CartContext"; // Importar el contexto
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa"; // Importar el icono de papelera

export default function Cart() {
  const { cartItems, removeFromCart, updateCartItem } = useCart(); // Obtener los productos del contexto
  const [quantities, setQuantities] = useState({});
  const shippingOptions = [
    { label: "Sencillo (Nacional) - $5.00", value: 5 },
    { label: "Express (Nacional) - $10.00", value: 10 },
    { label: "Express Internacional - $20.00", value: 20 },
  ];
  const [selectedShipping, setSelectedShipping] = useState(
    shippingOptions[0].value
  );

  // Asegurarse de que cartItems sea un arreglo
  const safeCartItems = cartItems || [];

  // Calcular subtotal, impuestos y total
  const subtotal = safeCartItems.reduce((total, item) => {
    const qty = quantities[item.id] || 1; // Obtener cantidad o usar 1 por defecto
    return total + item.price * qty;
  }, 0);

  const taxes = subtotal * 0.1; // Suponiendo un 10% de impuestos
  const total = subtotal + taxes + selectedShipping;

  const handleQuantityChange = (id, change) => {
    setQuantities(prev => {
      const currentQty = prev[id] || 1;
      const newQty = Math.max(1, Math.min(5, currentQty + change)); // Limitar entre 1 y 5
      updateCartItem(id, newQty); // Actualizar la cantidad en el contexto
      return { ...prev, [id]: newQty };
    });
  };

  const handleRemoveFromCart = id => {
    removeFromCart(id); // Eliminar el producto del contexto
    setQuantities(prev => {
      const newQuantities = { ...prev };
      delete newQuantities[id];
      return newQuantities;
    });
  };

  return (
    <div className="bg-[#000] h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold text-white mb-4">
          Carrito de compras
        </h1>
        <div className="flex flex-col md:flex-row gap-4">
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
                      <th className="text-left font-semibold ">Producto</th>
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
                            <div className="flex items-center">
                              <img
                                className="h-16 w-16 mr-10"
                                src={item.image}
                                alt={item.name}
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
              <button className="bg-white text-blue-600 font-bold py-4 px-4 rounded-lg mt-2 w-full hover:bg-black hover:text-white">
                Realizar compra
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
