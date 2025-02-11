"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

const categoriesToPreLoad = [
  { id: 1, name: "Smartphones" },
  { id: 2, name: "Laptops" },
  { id: 3, name: "Tablets" },
  { id: 4, name: "Headphones" },
  { id: 5, name: "Cameras" },
  { id: 6, name: "Printers" },
  { id: 7, name: "Monitors" },
  { id: 8, name: "Storage" },
  { id: 9, name: "Accessories" },
];

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    minPrice: null,
    maxPrice: null,
    inStock: false,
  });

  const { addToCart } = useCart();
  const { token } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/products`
        );
        setProducts(res.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = product => {
    if (!token) {
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
          window.location.href = "/SignIn"; // Redirigir a la página de inicio de sesión
        }
      });
      return;
    }

    Swal.fire({
      title: "¿Deseas agregar este producto al carrito?",
      text: "Puedes seguir explorando otros productos.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, agregar",
      cancelButtonText: "Cancelar",
    }).then(result => {
      if (result.isConfirmed) {
        addToCart(product);
      }
    });
  };

  const handleCategoryClick = categoryId => {
    if (selectedCategory === categoryId) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(categoryId);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory
      ? product.categoryId === selectedCategory
      : true;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPrice =
      (filters.minPrice ? product.price >= filters.minPrice : true) &&
      (filters.maxPrice ? product.price <= filters.maxPrice : true);
    const matchesStock = filters.inStock ? product.stock > 0 : true;

    return matchesCategory && matchesSearch && matchesPrice && matchesStock;
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 overflow-y-auto bg-black p-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-2 bg-000 rounded-md shadow-md p-4">
            <h2 className="text-lg font-bold mb-4 text-white">Categorías</h2>
            <ul>
              {categoriesToPreLoad.map(category => (
                <li key={category.id} className="mb-2">
                  <button
                    onClick={() => handleCategoryClick(category.id)}
                    className={`block w-full h-full text-left p-2 rounded-md font-semibold ${
                      selectedCategory === category.id
                        ? "bg-blue-600 text-white"
                        : "bg-indigo-600 hover:bg-blue-600 hover:text-white"
                    }`}>
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-9 bg-black rounded-md shadow-md p-4">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-4 bg-black rounded-md shadow-md p-4">
                <h3 className="text-xl font-semibold mb-3">Buscar Productos</h3>
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full p-2 mb-2 rounded-md text-black font-semibold"
                />
                <button className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
                  Buscar
                </button>
              </div>

              <div className="col-span-8 bg-black rounded-md shadow-md p-4">
                <h3 className="text-xl font-semibold mb-3">Filtros</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block">Precio Mínimo:</label>
                    <input
                      type="number"
                      value={filters.minPrice || ""}
                      onChange={e =>
                        setFilters({
                          ...filters,
                          minPrice: e.target.value
                            ? parseFloat(e.target.value)
                            : null,
                        })
                      }
                      className="w-full p-2 mb-2 border rounded-md text-black font-semibold"
                      placeholder="Ejemplo: 100"
                    />
                  </div>
                  <div>
                    <label className="block">Precio Máximo:</label>
                    <input
                      type="number"
                      value={filters.maxPrice || ""}
                      onChange={e =>
                        setFilters({
                          ...filters,
                          maxPrice: e.target.value
                            ? parseFloat(e.target.value)
                            : null,
                        })
                      }
                      className="w-full p-2 mb-2 border rounded-md text-black font-semibold"
                      placeholder="Ejemplo: 500"
                    />
                  </div>
                  <div className="col-span-2 flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.inStock}
                      onChange={() =>
                        setFilters({ ...filters, inStock: !filters.inStock })
                      }
                      className="mr-2"
                    />
                    <label>En Stock</label>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-3 mt-6 text-white">
              Productos
            </h3>
            <div className="grid grid-cols-[repeat(3,1fr)] gap-y-[10px] gap-x-[10px]">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="relative flex flex-col overflow-hidden rounded-lg border border-blue-950 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                  <Link href={`/Product/${product.id}`}>
                    <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                      <Image
                        src={product.image}
                        alt={product.name}
                        className="object-contain h-full w-full"
                        width={500}
                        height={300}
                      />
                      <span className="absolute top-0 left-0 m-2 rounded-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-800 px-2 text-center text-sm font-medium text-white">
                        39% OFF
                      </span>
                    </div>
                  </Link>
                  <div className="mt-4 px-5 pb-5 flex flex-col justify-between h-full">
                    <Link href={`/Product/${product.id}`}>
                      <h5 className="text-xl tracking-tight text-white">
                        {product.name}
                      </h5>
                    </Link>
                    <div className="mt-2 mb-5 flex items-center justify-between">
                      <p>
                        <span className="text-3xl font-bold text-white">
                          ${product.price}
                        </span>
                      </p>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="mt-auto flex items-center justify-center rounded-md bg-black px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300">
                        Añadir al carrito
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
