"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "@/utils/axiosConfig";
import Swal from "sweetalert2";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext"; // Importar el hook useAuth

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useAuth(); // Obtener la función login del contexto

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async values => {
      try {
        const response = await axios.post("/users/login", values);
        console.log(response.data);

        if (response.data.login) {
          login(response.data.token); // Usar la función login del contexto
          Swal.fire({
            icon: "success",
            title: "Inicio de sesión exitoso",
            text: "Bienvenido de nuevo.",
            showConfirmButton: false,
            timer: 1000,
          });
          router.push("/home");
        } else {
          throw new Error("Error en el inicio de sesión");
        }
      } catch (error) {
        console.error("Error de inicio de sesión:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Credenciales incorrectas. Intenta de nuevo.",
        });
      }
    },
  });
  return (
    <div className="bg-[#13131a] min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[1200px] bg-[#000] rounded-3xl overflow-hidden shadow-2xl flex flex-col-reverse md:flex-row">
        {/* Right Section */}
        <div className="w-full md:w-1/2 p-6 md:p-12">
          <div className="max-w-md mx-auto">
            <h1 className="text-white text-2xl md:text-4xl font-semibold mb-2">
              Iniciar Sesión
            </h1>
            <p className="text-white mb-8">
              ¿No tienes una cuenta?
              <Link
                href="/SignUp"
                className="text-blue-700 hover:text-blue-300 ml-3">
                Regístrate
              </Link>
            </p>

            <form className="space-y-4" onSubmit={formik.handleSubmit}>
              <input
                type="email"
                placeholder="Email address"
                name="email"
                className="w-full bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  className="w-full bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-white rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                      />
                      <line x1="2" x2="22" y1="2" y2="22" />
                    </svg>
                  )}
                </button>
              </div>
              <button
                className="bg-gradient-to-r from-blue-900 to-blue-500 text-white font-bold py-3 px-4 rounded-lg mt-4 hover:bg-indigo-600 hover:to-blue-700 transition ease-in-out duration-150"
                type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
        {/* Left Section */}
        <div className="w-full md:w-1/2 relative">
          <a
            href="/"
            className="absolute top-6 right-6 text-white text-2xl font-bold z-10">
            DonnaTech
          </a>
          <div className="relative h-full">
            <img
              src="https://res.cloudinary.com/de41faltu/image/upload/v1738789748/Carrinho_de_compras_em_um_laptop_Conceito_de_compras_online_IA_generativa___Foto_Premium_nyymni.jpg"
              alt="Desert landscape"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-indigo-600/10"></div>
            <div className="absolute bottom-12 right-12 text-white">
              <h2 className="text-2xl md:text-4xl font-semibold mb-2">
                Tu Tienda
              </h2>
              <h2 className="text-2xl md:text-4xl font-semibold">
                de tecnología 💻
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
