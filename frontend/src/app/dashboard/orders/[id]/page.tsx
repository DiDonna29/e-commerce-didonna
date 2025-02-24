"use client";

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderDetails {
  status?: string;
  date?: string;
  user?: {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
    role: string;
  };
  products?: Product[];
  total?: number;
  id?: number;
}

const OrderDetailsPage = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const params = useParams();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    if (!user) {
      router.push("/login"); // Redirigir al login si no hay usuario autenticado
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3030/orders/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setOrderDetails(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [user, router, params.id]);

  if (!orderDetails) return <p>Cargando...</p>;

  return (
    <div className="bg-[#000] min-h-screen p-6">
      <h1 className="text-2xl font-semibold text-white mb-4">
        Detalles de la Orden #{orderDetails.id}
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-blue-600">
          Detalles de la Compra
        </h2>
        <p className="text-black font-medium">
          Número de Orden: {orderDetails.id}
        </p>
        <p className="text-black font-medium">Estado: {orderDetails.status}</p>
        <p className="text-black font-medium">
          Fecha y Hora: {new Date(orderDetails.date || "").toLocaleString()}
        </p>

        <div className="mt-4">
          <h3 className="text-black font-semibold">Detalles del Usuario:</h3>
          <p className="text-black">Nombre: {orderDetails.user?.name}</p>
          <p className="text-black">Email: {orderDetails.user?.email}</p>
          <p className="text-black">Dirección: {orderDetails.user?.address}</p>
          <p className="text-black">Teléfono: {orderDetails.user?.phone}</p>
        </div>

        <div className="mt-4">
          <h3 className="text-black font-semibold">
            Detalles de los Productos:
          </h3>
          <div className="flex flex-col space-y-2 mt-2">
            {orderDetails.products?.map(product => (
              <div key={product.id} className="flex items-center">
                <Image
                  alt={product.name}
                  className="h-16 w-16 object-cover object-center mr-2"
                  src={product.image}
                  width={64}
                  height={64}
                />
                <div>
                  <p className="text-black font-medium">{product.name}</p>
                  <p className="text-black">Precio: ${product.price}</p>
                  <p className="text-black">Cantidad: {product.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 border-t pt-4">
          <p className="text-slate-800 font-semibold">
            Total Gastado: ${orderDetails.total?.toFixed(2) || "0.00"}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center pt-4 justify-end">
          <button
            className="rounded-md border border-transparent py-2 px-4 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={() => router.push("/dashboard/orders")}>
            Volver a Mis Órdenes
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
