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
    <div className="bg-[#000] min-h-screen flex items-center justify-center p-4 mb-4">
      <div className="w-full max-w-[1300px] bg-[#000] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 relative">
          <a
            href="/"
            className="absolute top-6 left-6 text-white text-2xl font-bold z-10">
            <div className="relative mb-2">
              <svg
                className="relative w-8 sm:w-10 h-8 sm:h-10 text-white transform group-hover:scale-110 transition-transform duration-300"
                width="215px"
                height="215px"
                viewBox="0 0 24.00 24.00"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff">
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                  stroke="#ffffff"
                  stroke-width="1.44"></circle>
                <path
                  d="M14.5 7L16 5"
                  stroke="#ffffff"
                  stroke-width="1.44"
                  stroke-linecap="round"></path>
                <path
                  opacity="0.5"
                  d="M19 7L20 6"
                  stroke="#ffffff"
                  stroke-width="1.44"
                  stroke-linecap="round"></path>
                <path
                  d="M12 5L11 4"
                  stroke="#ffffff"
                  stroke-width="1.44"
                  stroke-linecap="round"></path>
                <path
                  opacity="0.5"
                  d="M10.5 7L9.13397 7.36603"
                  stroke="#ffffff"
                  stroke-width="1.44"
                  stroke-linecap="round"></path>
                <path
                  opacity="0.5"
                  d="M7 5L6 4"
                  stroke="#ffffff"
                  stroke-width="1.44"
                  stroke-linecap="round"></path>
                <path
                  d="M6.79245 9.14385L6.20722 7.85641"
                  stroke="#ffffff"
                  stroke-width="1.44"
                  stroke-linecap="round"></path>
                <path
                  d="M12.5 22L12.5343 22.7492C12.811 22.7365 13.0582 22.5724 13.1772 22.3222C13.2963 22.0721 13.2677 21.7768 13.103 21.554L12.5 22ZM12.944 19.6276L13.3899 20.2306L12.944 19.6276ZM19.4787 14.7949L19.0327 14.1919L19.4787 14.7949ZM14.6191 18.8552L15.2221 18.4092L15.2221 18.4092L14.6191 18.8552ZM15.3194 16.0052L15.7654 16.6083L15.3194 16.0052ZM18.2495 16.1704L18.8525 15.7244L18.8525 15.7244L18.2495 16.1704ZM21.6265 14.7168L21.14 15.2876C21.3346 15.4534 21.6002 15.5087 21.8447 15.4343C22.0893 15.36 22.2792 15.1662 22.3484 14.9201L21.6265 14.7168ZM18.584 16.6226L17.9809 17.0686C18.1107 17.2441 18.3106 17.3544 18.5283 17.3706C18.746 17.3868 18.9599 17.3073 19.1143 17.153L18.584 16.6226ZM18.6854 16.5212L19.2157 17.0515C19.3871 16.8801 19.4651 16.6365 19.4251 16.3974L18.6854 16.5212ZM14.6191 19.291L14.3938 20.0064C14.6605 20.0904 14.9517 20.019 15.1494 19.8213L14.6191 19.291ZM14.8044 19.1057L15.3347 19.6361C15.5973 19.3735 15.6282 18.9583 15.4074 18.6598L14.8044 19.1057ZM12 21.25C6.89137 21.25 2.75 17.1086 2.75 12H1.25C1.25 17.9371 6.06294 22.75 12 22.75V21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM12 2.75C17.1086 2.75 21.25 6.89137 21.25 12H22.75C22.75 6.06294 17.9371 1.25 12 1.25V2.75ZM13.103 21.554C12.8699 21.2389 12.9028 20.5909 13.3899 20.2306L12.498 19.0246C11.3811 19.8506 11.1449 21.429 11.897 22.446L13.103 21.554ZM15.2221 18.4092C14.9266 18.0097 14.9862 17.1845 15.7654 16.6083L14.8735 15.4022C13.6476 16.3088 13.0801 18.0355 14.0161 19.3011L15.2221 18.4092ZM15.7654 16.6083C16.5445 16.0321 17.351 16.2168 17.6465 16.6163L18.8525 15.7244C17.9165 14.4588 16.0993 14.4957 14.8735 15.4022L15.7654 16.6083ZM19.9246 15.398C20.4213 15.0306 20.9259 15.105 21.14 15.2876L22.1131 14.146C21.2462 13.4071 19.9508 13.5129 19.0327 14.1919L19.9246 15.398ZM21.25 12C21.25 12.8723 21.1295 13.7151 20.9046 14.5135L22.3484 14.9201C22.6102 13.9907 22.75 13.0111 22.75 12H21.25ZM12.4657 21.2508C12.332 21.2569 12.2017 21.25 12 21.25V22.75C12.1103 22.75 12.3595 22.7572 12.5343 22.7492L12.4657 21.2508ZM17.6465 16.6163L17.9809 17.0686L19.187 16.1767L18.8525 15.7244L17.6465 16.6163ZM19.4251 16.3974C19.3792 16.1229 19.5124 15.7028 19.9246 15.398L19.0327 14.1919C18.2419 14.7768 17.7921 15.7276 17.9457 16.645L19.4251 16.3974ZM19.1143 17.153L19.2157 17.0515L18.1551 15.9909L18.0536 16.0923L19.1143 17.153ZM13.3899 20.2306C13.747 19.9665 14.1352 19.9249 14.3938 20.0064L14.8444 18.5756C14.0774 18.3341 13.1961 18.5083 12.498 19.0246L13.3899 20.2306ZM14.0161 19.3011L14.2014 19.5517L15.4074 18.6598L15.2221 18.4092L14.0161 19.3011ZM15.1494 19.8213L15.3347 19.6361L14.274 18.5754L14.0888 18.7607L15.1494 19.8213Z"
                  fill="#ffffff"></path>
                <path
                  opacity="0.5"
                  d="M2 13C2 13 4.20085 15 6 15C7.21199 15 8.60628 14.0924 9.38725 13.5"
                  stroke="#ffffff"
                  stroke-width="1.44"></path>
                <path
                  opacity="0.5"
                  d="M16 15.5C15.5 15 14.4713 14.6389 14 14.2236"
                  stroke="#ffffff"
                  stroke-width="1.44"></path>
                <path
                  opacity="0.5"
                  d="M16.6497 8.9766L16.7161 10.3893"
                  stroke="#ffffff"
                  stroke-width="1.44"
                  stroke-linecap="round"></path>
                <path
                  d="M20.6777 10.085L18.9996 11.5629"
                  stroke="#ffffff"
                  stroke-width="1.44"
                  stroke-linecap="round"></path>
                <path
                  d="M5.66477 12.6412L6.5 11.5"
                  stroke="#ffffff"
                  stroke-width="1.44"
                  stroke-linecap="round"></path>
                <path
                  opacity="0.5"
                  d="M3.68293 10.3498L3.60427 8.93781"
                  stroke="#ffffff"
                  stroke-width="1.44"
                  stroke-linecap="round"></path>
              </svg>
            </div>
          </a>
          <div className="relative h-full">
            <video
              src="https://res.cloudinary.com/djdesignerlab/video/upload/v1608623314/22dec20/ecommerce_noupkz.mp4"
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-indigo-600/10"></div>
            <div className="absolute bottom-12 left-12 text-white">
              <h2 className="text-2xl md:text-4xl font-semibold">
                Tu Tienda de tecnología 💻
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
