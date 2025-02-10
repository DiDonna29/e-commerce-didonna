"use client";
import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import axios from "@/utils/axiosConfig";
import Swal from "sweetalert2";
import { getCountriesWithFlags } from "@/data/countries"; // Importar el nuevo archivo de países
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const countriesData = getCountriesWithFlags(); // Obtener los países con banderas

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      address: "",
      phone: "",
    },
    onSubmit: async values => {
      setLoading(true);
      try {
        const updatedValues = {
          ...values,
          address: selectedCountry,
        };
        const response = await axios.post("/users/register", updatedValues);
        console.log(response.data);
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: "Usuario creado correctamente.",
          showConfirmButton: false,
          timer: 1500,
        });
        router.push("/SignIn");
      } catch (error) {
        setLoading(false);
        if (error.response && error.response.status === 409) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "El usuario ya existe. Por favor, elige otro.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al crear el usuario.",
          });
        }
      }
    },
  });

  const handleClearFields = () => {
    formik.resetForm();
    setSelectedCountry("");
    setSearchTerm("");
  };

  const handleCountryChange = country => {
    setSelectedCountry(country);
    formik.setFieldValue("address", country);
    setDropdownOpen(false);
  };

  const handleSearchClear = () => {
    setSearchTerm("");
  };

  const filteredCountries = countriesData.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-[#13131a] min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[1200px] bg-[#000] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 relative">
          <a
            href="/"
            className="absolute top-6 left-6 text-white text-2xl font-bold z-10">
            DonnaTech
          </a>
          <div className="relative h-full">
            <img
              src="https://res.cloudinary.com/de41faltu/image/upload/v1738789748/Carrinho_de_compras_em_um_laptop_Conceito_de_compras_online_IA_generativa___Foto_Premium_nyymni.jpg"
              alt="Desert landscape"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-indigo-600/10"></div>
            <div className="absolute bottom-12 left-12 text-white">
              <h2 className="text-2xl md:text-4xl font-semibold mb-2">
                Tu Tienda
              </h2>
              <h2 className="text-2xl md:text-4xl font-semibold">
                de tecnología 💻
              </h2>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-12">
          <div className="max-w-md mx-auto">
            <h1 className="text-white text-2xl md:text-4xl font-semibold mb-2">
              Crear una cuenta
            </h1>
            <p className="text-gray-400 mb-8">
              ¿Ya tienes una cuenta?
              <button
                className="text-blue-700 hover:text-blue-300 ml-3"
                onClick={() => router.push("/SignIn")}>
                Inicia sesión
              </button>
            </p>

            <form className="space-y-4" onSubmit={formik.handleSubmit}>
              <input
                type="text"
                placeholder="Nombre Completo"
                className="w-full bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="name"
                required
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              <input
                type="email"
                placeholder="Correo"
                className="w-full bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="email"
                required
                onChange={formik.handleChange}
                value={formik.values.email}
              />

              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  className="w-full bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-white rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  name="password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
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
                      className="h-5 w-5 text-gray-400"
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

              <div className="relative mb-4" ref={dropdownRef}>
                <div
                  className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-white rounded-lg p-3 cursor-pointer"
                  onClick={() => setDropdownOpen(!isDropdownOpen)}>
                  {selectedCountry ? (
                    <div className="flex items-center">
                      <img
                        src={
                          countriesData.find(c => c.code === selectedCountry)
                            ?.flag
                        }
                        alt={selectedCountry}
                        className="inline-block w-4 h-4 mr-2"
                      />
                      {
                        countriesData.find(c => c.code === selectedCountry)
                          ?.name
                      }
                    </div>
                  ) : (
                    "Selecciona un país"
                  )}
                </div>
                {isDropdownOpen && (
                  <div className="absolute bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 rounded-md shadow-lg mt-1 w-full z-10 max-h-60 overflow-y-auto">
                    <input
                      type="text"
                      placeholder="Buscar país..."
                      className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-gray-200 border-0 rounded-md p-4 w-full focus:bg-blue-700 focus:outline-none"
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-2 text-gray-400"
                      onClick={handleSearchClear}
                      hidden={!searchTerm}>
                      X
                    </button>
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map(country => (
                        <div
                          key={country.code}
                          className="flex items-center p-4 hover:bg-gradient-to-t from-blue-500 via-blue-800 to-blue-700 cursor-pointer"
                          onClick={() => handleCountryChange(country.code)}>
                          <img
                            src={country.flag}
                            alt={country.name}
                            className="w-4 h-4 mr-2"
                          />
                          {country.name}
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-gray-400">
                        No se encontraron países
                      </div>
                    )}
                  </div>
                )}
              </div>

              <input
                type="tel"
                placeholder="Teléfono"
                name="phone"
                className="w-full bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-white rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                pattern="[0-9]*"
                onChange={formik.handleChange}
                value={formik.values.phone}
              />

              <div className="flex space-x-4">
                <button
                  className={`bg-blue-ring-blue-400 text-white font-bold py-2 px-4 rounded-lg mt-4 hover:bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 transition-colors ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  type="submit"
                  disabled={loading}>
                  {loading ? "Registrando..." : "Crear cuenta"}
                </button>
                <button
                  type="button"
                  className="bg-red-950 text-white font-bold py-2 px-4 rounded-lg mt-4 hover:bg-red-600 transition-colors"
                  onClick={handleClearFields}>
                  Limpiar Campos
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
