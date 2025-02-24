"use client";

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Order {
  id: number;
  status: string;
  date: string;
  total: number;
}

const OrdersPage = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login"); // Redirigir al login si no hay usuario autenticado
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3030/users/orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user, router]);

  return (
    <div className="bg-[#000] min-h-screen p-6">
      <h1 className="text-2xl font-semibold text-white mb-4">Mis Órdenes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map(order => (
          <div
            key={order.id}
            className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-xl shadow-lg p-6 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            onClick={() => router.push(`/dashboard/orders/${order.id}`)}>
            <h3 className="text-xl font-bold">Orden #{order.id}</h3>
            <p className="text-sm">Estado: {order.status}</p>
            <p className="text-sm">
              Fecha: {new Date(order.date).toLocaleDateString()}
            </p>
            <p className="text-sm">Total: ${order.total?.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
