"use client";
import React, { useContext } from "react";
import { FaUserCheck, FaUserEdit, FaUserSlash } from "react-icons/fa";
import { FaClipboardUser, FaUserTag } from "react-icons/fa6";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { AuthContext } from "@/app/context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext); // Obtener datos del usuario desde el contexto

  return (
    <div className="bg-[#000] min-h-screen overflow-x-hidden">
      <div className="pt-6 max-w-7xl mx-auto flex">
        <aside className="sidebar fixed lg:static w-[240px] bg-[#000] h-[calc(100vh-4rem)] lg:h-auto transform -translate-x-full lg:translate-x-0 transition-transform duration-300 z-45 overflow-y-auto p-4">
          <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 rounded-xl shadow-lg mb-6 p-4 rounded-xl shadow-lg mb-6 p-4">
            <a
              href="/home"
              className="flex items-center text-white hover:text-white py-4 transition-all duration-300">
              <FaUserCheck className="m-4 h-8 w-8 hover:text-blue-600" />
              Perfil
            </a>
            <a
              href="/dashboard/orders"
              className="flex items-center text-white hover:text-white py-4 transition-all duration-300">
              <FaClipboardUser className="m-4 h-8 w-8 hover:text-blue-600" />
              Órdenes
            </a>
            <a
              href="/Product"
              className="flex items-center text-white hover:text-white py-4 transition-all duration-300">
              <FaUserTag className="m-4 h-8 w-8 hover:text-blue-600" />
              Favoritos
            </a>
          </div>

          <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 rounded-xl shadow-lg mb-6 p-4 rounded-xl shadow-lg p-4">
            <a
              href="#"
              className="flex items-center text-white hover:text-white py-4 transition-all duration-300">
              <FaUserEdit className="m-4 h-8 w-8 hover:text-blue-600" />
              Editar Perfil
            </a>
            <a
              href="#"
              className="flex items-center text-white hover:text-white py-4 transition-all duration-300">
              <FaUserSlash className="m-4 h-8 w-8 hover:text-blue-600" />
              Darse de baja
            </a>
            <a
              href="#"
              className="flex items-center text-white hover:text-white py-4 transition-all duration-300">
              <RiLogoutBoxRFill className="m-4 h-8 w-8 hover:text-blue-600" />
              Cerrar Sesión
            </a>
          </div>
        </aside>

        <main className="flex-1 p-4">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 bg-indigo-100 border border-indigo-200 rounded-xl p-6">
              <h2 className="text-4xl md:text-5xl text-blue-900">
                Bienvenido <br />
                <strong>{user?.name || "User"}</strong>
              </h2>
              <span className="inline-block mt-8 px-8 py-2 rounded-full text-xl font-bold text-white bg-blue-800">
                01:51
              </span>
            </div>

            <div className="flex-1 bg-blue-100 border border-blue-200 rounded-xl p-6">
              <h2 className="text-4xl md:text-5xl text-blue-900">
                Ordenes <br />
                <strong>3</strong>
              </h2>
              <a
                href="#"
                className="inline-block mt-8 px-8 py-2 rounded-full text-xl font-bold text-white bg-blue-800 hover:bg-blue-900 transition-transform duration-300 hover:scale-105">
                ver ordenes
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-xl shadow-lg mb-6 p-4 rounded-xl shadow-lg p-6 h-64 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <h3 className="text-xl font-bold text-white">Favorito 1</h3>
            </div>
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-xl shadow-lg mb-6 p-4 rounded-xl shadow-lg p-6 h-64 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <h3 className="text-xl font-bold text-white">Favorito 2</h3>
            </div>
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-xl shadow-lg mb-6 p-4 rounded-xl shadow-lg p-6 h-64 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <h3 className="text-xl font-bold text-white">Favorito 3</h3>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
